import Order from "../models/orderModel.js";
import PortfolioHolding from "../models/portfolioHoldingModel.js";
import Stock from "../models/stockModel.js";
import Wallet from "../models/walletModel.js";
import WalletTransaction from "../models/walletTransactionModel.js";
import { marketSeed, starterPortfolioSeed } from "../init/marketSeed.js";

const DEMO_NET_WORTH = 100000;

const roundToTwo = (value) => Number(value.toFixed(2));

export const formatPercent = (value) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
};

export const createReference = (prefix = "TMX") =>
    `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

export const serializeStock = (stock) => {
    const change = roundToTwo(stock.currentPrice - stock.previousClose);
    const changePercent = roundToTwo((change / stock.previousClose) * 100);

    return {
        symbol: stock.symbol,
        companyName: stock.companyName,
        sector: stock.sector,
        exchange: stock.exchange,
        currentPrice: roundToTwo(stock.currentPrice),
        previousClose: roundToTwo(stock.previousClose),
        openPrice: roundToTwo(stock.openPrice),
        dayHigh: roundToTwo(stock.dayHigh),
        dayLow: roundToTwo(stock.dayLow),
        volume: stock.volume,
        marketCap: stock.marketCap,
        peRatio: stock.peRatio,
        description: stock.description,
        history: stock.history,
        change,
        changePercent,
        percent: formatPercent(changePercent),
        isDown: change < 0,
    };
};

export const ensureStockUniverse = async () => {
    const count = await Stock.countDocuments();

    if (count > 0) {
        return;
    }

    await Stock.insertMany(marketSeed);
};

export const ensureTradingProfile = async (userId) => {
    const existingWallet = await Wallet.findOne({ userId });

    if (existingWallet) {
        return existingWallet;
    }

    const stocks = await Stock.find({
        symbol: { $in: starterPortfolioSeed.map((item) => item.symbol) },
    });
    const stockMap = new Map(stocks.map((stock) => [stock.symbol, stock]));

    let investedValue = 0;
    const holdingDocuments = starterPortfolioSeed
        .map((item) => {
            const stock = stockMap.get(item.symbol);

            if (!stock) {
                return null;
            }

            const averagePrice = roundToTwo(
                stock.currentPrice * item.averagePriceMultiplier
            );
            investedValue += averagePrice * item.quantity;

            return {
                userId,
                symbol: stock.symbol,
                companyName: stock.companyName,
                quantity: item.quantity,
                averagePrice,
            };
        })
        .filter(Boolean);

    const balance = roundToTwo(DEMO_NET_WORTH - investedValue);

    const wallet = await Wallet.create({
        userId,
        balance,
        totalDeposited: DEMO_NET_WORTH,
        totalWithdrawn: 0,
    });

    if (holdingDocuments.length > 0) {
        await PortfolioHolding.insertMany(holdingDocuments);
    }

    await WalletTransaction.create({
        userId,
        type: "DEMO_CREDIT",
        amount: DEMO_NET_WORTH,
        balanceAfter: balance,
        method: "SIMULATED",
        status: "completed",
        reference: createReference("DEMO"),
        note: "Starter tutorial balance with seeded portfolio.",
    });

    const starterTrades = holdingDocuments.map((holding) => ({
        userId,
        symbol: holding.symbol,
        companyName: holding.companyName,
        name: holding.symbol,
        qty: holding.quantity,
        price: holding.averagePrice,
        total: roundToTwo(holding.averagePrice * holding.quantity),
        mode: "BUY",
        status: "completed",
    }));

    if (starterTrades.length > 0) {
        await Order.insertMany(starterTrades);
    }

    return wallet;
};

export const getPortfolioSnapshot = async (userId) => {
    await ensureTradingProfile(userId);

    const [wallet, holdings, orders, transactions, stocks] = await Promise.all([
        Wallet.findOne({ userId }),
        PortfolioHolding.find({ userId }).sort({ updatedAt: -1 }),
        Order.find({ userId }).sort({ createdAt: -1 }).limit(20),
        WalletTransaction.find({ userId }).sort({ createdAt: -1 }).limit(20),
        Stock.find({}).sort({ symbol: 1 }),
    ]);

    const stockMap = new Map(stocks.map((stock) => [stock.symbol, stock]));

    const formattedHoldings = holdings
        .map((holding) => {
            const stock = stockMap.get(holding.symbol);

            if (!stock) {
                return null;
            }

            const currentValue = roundToTwo(holding.quantity * stock.currentPrice);
            const investmentValue = roundToTwo(
                holding.quantity * holding.averagePrice
            );
            const pnl = roundToTwo(currentValue - investmentValue);
            const pnlPercent = investmentValue
                ? roundToTwo((pnl / investmentValue) * 100)
                : 0;
            const dayPercent = roundToTwo(
                ((stock.currentPrice - stock.previousClose) / stock.previousClose) * 100
            );

            return {
                id: holding._id,
                symbol: holding.symbol,
                name: holding.symbol,
                companyName: holding.companyName,
                qty: holding.quantity,
                avg: roundToTwo(holding.averagePrice),
                price: roundToTwo(stock.currentPrice),
                currentValue,
                investmentValue,
                pnl,
                pnlPercent,
                net: formatPercent(pnlPercent),
                day: formatPercent(dayPercent),
                isLoss: pnl < 0,
                history: stock.history,
                sector: stock.sector,
            };
        })
        .filter(Boolean);

    const formattedPositions = formattedHoldings.map((holding) => ({
        product: "SIM",
        symbol: holding.symbol,
        name: holding.symbol,
        companyName: holding.companyName,
        qty: holding.qty,
        avg: holding.avg,
        price: holding.price,
        pnl: holding.pnl,
        day: holding.day,
        isLoss: holding.isLoss,
    }));

    const investmentValue = roundToTwo(
        formattedHoldings.reduce((sum, item) => sum + item.investmentValue, 0)
    );
    const holdingsValue = roundToTwo(
        formattedHoldings.reduce((sum, item) => sum + item.currentValue, 0)
    );
    const totalPnl = roundToTwo(holdingsValue - investmentValue);
    const totalPnlPercent = investmentValue
        ? roundToTwo((totalPnl / investmentValue) * 100)
        : 0;
    const dayPnl = roundToTwo(
        formattedHoldings.reduce(
            (sum, item) => sum + item.qty * (item.price - stockMap.get(item.symbol).previousClose),
            0
        )
    );

    const market = stocks.map(serializeStock);
    const topMovers = [...market]
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 4);

    return {
        wallet: {
            balance: roundToTwo(wallet?.balance || 0),
            totalDeposited: roundToTwo(wallet?.totalDeposited || 0),
            totalWithdrawn: roundToTwo(wallet?.totalWithdrawn || 0),
            currency: wallet?.currency || "INR",
            availableMargin: roundToTwo(wallet?.balance || 0),
            usedMargin: roundToTwo(holdingsValue),
        },
        holdings: formattedHoldings,
        positions: formattedPositions,
        orders: orders.map((order) => ({
            id: order._id,
            symbol: order.symbol || order.name,
            companyName: order.companyName || order.name,
            qty: order.qty,
            price: roundToTwo(order.price),
            total: roundToTwo(order.total || order.qty * order.price),
            mode: order.mode,
            status: order.status || "completed",
            createdAt: order.createdAt,
        })),
        walletTransactions: transactions.map((item) => ({
            id: item._id,
            type: item.type,
            amount: roundToTwo(item.amount),
            balanceAfter: roundToTwo(item.balanceAfter),
            method: item.method,
            status: item.status,
            reference: item.reference,
            note: item.note,
            createdAt: item.createdAt,
        })),
        market,
        topMovers,
        stats: {
            investmentValue,
            holdingsValue,
            totalPnl,
            totalPnlPercent,
            dayPnl,
            netWorth: roundToTwo((wallet?.balance || 0) + holdingsValue),
        },
    };
};
