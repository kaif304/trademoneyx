const roundToTwo = (value) => Number((value || 0).toFixed(2));

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value || 0);

export const formatCompactCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value || 0);

export const formatCompactNumber = (value) =>
  new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value || 0);

export const formatPercent = (value) => {
  const numeric = Number(value || 0);
  const sign = numeric >= 0 ? "+" : "";
  return `${sign}${numeric.toFixed(2)}%`;
};

export const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(Number(value || 0));

export const formatDateTime = (value) =>
  new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export const getMarketIndices = (market = []) => {
  if (!market.length) {
    return [];
  }

  const niftySlice = market.slice(0, 6);
  const bankSlice = market.filter((stock) =>
    ["HDFCBANK", "ICICIBANK", "SBIN"].includes(stock.symbol)
  );

  const buildIndex = (label, slice, baseValue) => {
    const avgChangePercent =
      slice.reduce((sum, stock) => sum + stock.changePercent, 0) /
      Math.max(slice.length, 1);
    const value = baseValue + avgChangePercent * 24;

    return {
      label,
      value: value.toFixed(2),
      changePercent: avgChangePercent,
      isDown: avgChangePercent < 0,
    };
  };

  return [
    buildIndex("NIFTY 50", niftySlice, 22465),
    buildIndex("BANK NIFTY", bankSlice, 48210),
  ];
};

export const simulateOverviewTick = (overview) => {
  if (!overview) {
    return overview;
  }

  const market = overview.market.map((stock) => {
    const volatility = stock.currentPrice * 0.0024;
    const drift = (Math.random() - 0.5) * volatility;
    const nextPrice = roundToTwo(Math.max(stock.dayLow * 0.98, stock.currentPrice + drift));
    const nextHistory = [...stock.history.slice(-17), nextPrice];
    const change = roundToTwo(nextPrice - stock.previousClose);
    const changePercent = roundToTwo((change / stock.previousClose) * 100);

    return {
      ...stock,
      currentPrice: nextPrice,
      price: nextPrice,
      dayHigh: roundToTwo(Math.max(stock.dayHigh, nextPrice)),
      dayLow: roundToTwo(Math.min(stock.dayLow, nextPrice)),
      history: nextHistory,
      change,
      changePercent,
      percent: formatPercent(changePercent),
      isDown: change < 0,
    };
  });

  const stockMap = new Map(market.map((stock) => [stock.symbol, stock]));

  const holdings = overview.holdings.map((holding) => {
    const stock = stockMap.get(holding.symbol);

    if (!stock) {
      return holding;
    }

    const currentValue = roundToTwo(stock.currentPrice * holding.qty);
    const investmentValue = roundToTwo(holding.avg * holding.qty);
    const pnl = roundToTwo(currentValue - investmentValue);
    const pnlPercent = investmentValue
      ? roundToTwo((pnl / investmentValue) * 100)
      : 0;

    return {
      ...holding,
      price: stock.currentPrice,
      currentValue,
      investmentValue,
      pnl,
      pnlPercent,
      net: formatPercent(pnlPercent),
      day: formatPercent(stock.changePercent),
      isLoss: pnl < 0,
      history: stock.history,
    };
  });

  const positions = holdings.map((holding) => ({
    product: "SIM",
    symbol: holding.symbol,
    name: holding.name,
    companyName: holding.companyName,
    qty: holding.qty,
    avg: holding.avg,
    price: holding.price,
    pnl: holding.pnl,
    day: holding.day,
    isLoss: holding.isLoss,
  }));

  const investmentValue = roundToTwo(
    holdings.reduce((sum, holding) => sum + holding.investmentValue, 0)
  );
  const holdingsValue = roundToTwo(
    holdings.reduce((sum, holding) => sum + holding.currentValue, 0)
  );
  const totalPnl = roundToTwo(holdingsValue - investmentValue);
  const totalPnlPercent = investmentValue
    ? roundToTwo((totalPnl / investmentValue) * 100)
    : 0;
  const dayPnl = roundToTwo(
    holdings.reduce((sum, holding) => {
      const stock = stockMap.get(holding.symbol);
      return sum + holding.qty * (stock.currentPrice - stock.previousClose);
    }, 0)
  );

  const topMovers = [...market]
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 4);

  return {
    ...overview,
    market,
    holdings,
    positions,
    topMovers,
    stats: {
      ...overview.stats,
      investmentValue,
      holdingsValue,
      totalPnl,
      totalPnlPercent,
      dayPnl,
      netWorth: roundToTwo(overview.wallet.balance + holdingsValue),
    },
  };
};
