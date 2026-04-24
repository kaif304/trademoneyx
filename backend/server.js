import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";

import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import { requireAuth } from "./middleware/auth.js";
import {
    createAuthToken,
    hashPassword,
    verifyPassword,
} from "./utils/auth.js";
import Stock from "./models/stockModel.js";
import Wallet from "./models/walletModel.js";
import WalletTransaction from "./models/walletTransactionModel.js";
import PortfolioHolding from "./models/portfolioHoldingModel.js";
import {
    createReference,
    ensureStockUniverse,
    ensureTradingProfile,
    getPortfolioSnapshot,
    serializeStock,
} from "./utils/trading.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sanitizeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
});

const buyStockForUser = async (userId, symbol, quantity) => {
    await ensureTradingProfile(userId);

    const [wallet, stock, existingHolding] = await Promise.all([
        Wallet.findOne({ userId }),
        Stock.findOne({ symbol }),
        PortfolioHolding.findOne({ userId, symbol }),
    ]);

    if (!stock) {
        throw new Error("Stock not found.");
    }

    const total = Number((stock.currentPrice * quantity).toFixed(2));

    if (wallet.balance < total) {
        throw new Error("Insufficient wallet balance for this order.");
    }

    wallet.balance = Number((wallet.balance - total).toFixed(2));
    await wallet.save();

    if (existingHolding) {
        const investedAmount =
            existingHolding.quantity * existingHolding.averagePrice + total;
        const updatedQuantity = existingHolding.quantity + quantity;
        existingHolding.quantity = updatedQuantity;
        existingHolding.averagePrice = Number(
            (investedAmount / updatedQuantity).toFixed(2)
        );
        await existingHolding.save();
    } else {
        await PortfolioHolding.create({
            userId,
            symbol: stock.symbol,
            companyName: stock.companyName,
            quantity,
            averagePrice: stock.currentPrice,
        });
    }

    await Order.create({
        userId,
        symbol: stock.symbol,
        companyName: stock.companyName,
        name: stock.symbol,
        qty: quantity,
        price: stock.currentPrice,
        total,
        mode: "BUY",
        status: "completed",
    });

    await WalletTransaction.create({
        userId,
        type: "BUY",
        amount: total,
        balanceAfter: wallet.balance,
        method: "SIMULATED",
        status: "completed",
        reference: createReference("BUY"),
        note: `Bought ${quantity} shares of ${stock.symbol}.`,
    });
};

const sellStockForUser = async (userId, symbol, quantity) => {
    await ensureTradingProfile(userId);

    const [wallet, stock, holding] = await Promise.all([
        Wallet.findOne({ userId }),
        Stock.findOne({ symbol }),
        PortfolioHolding.findOne({ userId, symbol }),
    ]);

    if (!stock || !holding) {
        throw new Error("You do not hold this stock.");
    }

    if (holding.quantity < quantity) {
        throw new Error("Not enough quantity to sell.");
    }

    const total = Number((stock.currentPrice * quantity).toFixed(2));
    wallet.balance = Number((wallet.balance + total).toFixed(2));
    await wallet.save();

    holding.quantity -= quantity;
    if (holding.quantity === 0) {
        await holding.deleteOne();
    } else {
        await holding.save();
    }

    await Order.create({
        userId,
        symbol: stock.symbol,
        companyName: stock.companyName,
        name: stock.symbol,
        qty: quantity,
        price: stock.currentPrice,
        total,
        mode: "SELL",
        status: "completed",
    });

    await WalletTransaction.create({
        userId,
        type: "SELL",
        amount: total,
        balanceAfter: wallet.balance,
        method: "SIMULATED",
        status: "completed",
        reference: createReference("SELL"),
        note: `Sold ${quantity} shares of ${stock.symbol}.`,
    });
};

app.get("/" , (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.post("/api/auth/signup", async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password?.trim();

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Name, email, and password are required." });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({ message: "Password must be at least 8 characters long." });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered." });
        }

        const user = await User.create({
            name,
            email,
            passwordHash: hashPassword(password),
        });

        await ensureTradingProfile(user._id);

        const token = createAuthToken(user._id.toString());

        return res.status(201).json({
            message: "Account created successfully.",
            token,
            user: sanitizeUser(user),
        });
    } catch (error) {
        return res.status(500).json({ message: "Could not create account." });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password?.trim();

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });

        if (!user || !verifyPassword(password, user.passwordHash)) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        await ensureTradingProfile(user._id);

        const token = createAuthToken(user._id.toString());

        return res.json({
            message: "Login successful.",
            token,
            user: sanitizeUser(user),
        });
    } catch (error) {
        return res.status(500).json({ message: "Could not log in." });
    }
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
    await ensureTradingProfile(req.user._id);
    return res.json({ user: sanitizeUser(req.user) });
});

app.get("/api/dashboard/overview", requireAuth, async (req, res) => {
    const overview = await getPortfolioSnapshot(req.user._id);
    res.json(overview);
});

app.get("/api/market/stocks", requireAuth, async (req, res) => {
    await ensureTradingProfile(req.user._id);
    const stocks = await Stock.find({}).sort({ symbol: 1 });
    res.json(stocks.map(serializeStock));
});

app.get("/api/market/stocks/:symbol", requireAuth, async (req, res) => {
    await ensureTradingProfile(req.user._id);
    const stock = await Stock.findOne({
        symbol: req.params.symbol?.toUpperCase(),
    });

    if (!stock) {
        return res.status(404).json({ message: "Stock not found." });
    }

    res.json(serializeStock(stock));
});

app.get("/api/wallet", requireAuth, async (req, res) => {
    const overview = await getPortfolioSnapshot(req.user._id);
    res.json({
        wallet: overview.wallet,
        walletTransactions: overview.walletTransactions,
        stats: overview.stats,
    });
});

app.post("/api/wallet/add-funds", requireAuth, async (req, res) => {
    await ensureTradingProfile(req.user._id);

    const amount = Number(req.body.amount);
    const method = req.body.method || "UPI";

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Enter a valid amount." });
    }

    const wallet = await Wallet.findOne({ userId: req.user._id });
    wallet.balance += amount;
    wallet.totalDeposited += amount;
    await wallet.save();

    await WalletTransaction.create({
        userId: req.user._id,
        type: "ADD_FUNDS",
        amount,
        balanceAfter: wallet.balance,
        method,
        status: "completed",
        reference: createReference("PAY"),
        note: "Simulated payment gateway top up.",
    });

    const overview = await getPortfolioSnapshot(req.user._id);
    res.status(201).json({
        message: "Funds added successfully.",
        wallet: overview.wallet,
        walletTransactions: overview.walletTransactions,
    });
});

app.post("/api/trades/buy", requireAuth, async (req, res) => {
    const symbol = req.body.symbol?.trim().toUpperCase();
    const quantity = Number(req.body.quantity);

    if (!symbol || !quantity || quantity <= 0) {
        return res
            .status(400)
            .json({ message: "Symbol and positive quantity are required." });
    }

    try {
        await buyStockForUser(req.user._id, symbol, quantity);
    } catch (error) {
        const statusCode =
            error.message === "Stock not found."
                ? 404
                : error.message === "Insufficient wallet balance for this order."
                  ? 400
                  : 500;
        return res.status(statusCode).json({ message: error.message });
    }

    const overview = await getPortfolioSnapshot(req.user._id);
    res.status(201).json({
        message: "Buy order executed successfully.",
        overview,
    });
});

app.post("/api/trades/sell", requireAuth, async (req, res) => {
    const symbol = req.body.symbol?.trim().toUpperCase();
    const quantity = Number(req.body.quantity);

    if (!symbol || !quantity || quantity <= 0) {
        return res
            .status(400)
            .json({ message: "Symbol and positive quantity are required." });
    }

    try {
        await sellStockForUser(req.user._id, symbol, quantity);
    } catch (error) {
        const statusCode =
            error.message === "You do not hold this stock."
                ? 404
                : error.message === "Not enough quantity to sell."
                  ? 400
                  : 500;
        return res.status(statusCode).json({ message: error.message });
    }

    const overview = await getPortfolioSnapshot(req.user._id);
    res.status(201).json({
        message: "Sell order executed successfully.",
        overview,
    });
});

app.get("/allHoldings", requireAuth, async (req, res) => {
    const overview = await getPortfolioSnapshot(req.user._id);
    res.json(overview.holdings);
});

app.get("/allPositions", requireAuth, async (req, res) => {
    const overview = await getPortfolioSnapshot(req.user._id);
    res.json(overview.positions);
});

app.post("/newOrder", requireAuth, async (req, res) => {
    const symbol = (req.body.name || req.body.symbol || "").trim().toUpperCase();
    const quantity = Number(req.body.qty || req.body.quantity);
    const mode = (req.body.mode || "BUY").toUpperCase();

    if (!symbol || !quantity || quantity <= 0) {
        return res
            .status(400)
            .json({ message: "Symbol and positive quantity are required." });
    }

    try {
        if (mode === "SELL") {
            await sellStockForUser(req.user._id, symbol, quantity);
        } else {
            await buyStockForUser(req.user._id, symbol, quantity);
        }
    } catch (error) {
        const knownMessages = [
            "Stock not found.",
            "Insufficient wallet balance for this order.",
            "You do not hold this stock.",
            "Not enough quantity to sell.",
        ];
        const statusCode = knownMessages.includes(error.message)
            ? error.message === "Stock not found." || error.message === "You do not hold this stock."
                ? 404
                : 400
            : 500;
        return res.status(statusCode).json({ message: error.message });
    }

    const overview = await getPortfolioSnapshot(req.user._id);
    res.status(201).json({
        message: `${mode} order executed successfully.`,
        overview,
    });
});

app.get("/myOrders", requireAuth, async (req, res) => {
    const overview = await getPortfolioSnapshot(req.user._id);
    res.json(overview.orders);
});

const port = process.env.PORT;

const startServer = async () => {
    await connectDB();
    await ensureStockUniverse();

    app.listen(port, () => {
        console.log("app started!");
    });
};

startServer();
