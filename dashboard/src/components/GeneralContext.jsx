import React, { useEffect, useMemo, useState } from "react";
import api from "../lib/api";
import { getAuthToken } from "../lib/auth";
import { getMarketIndices, simulateOverviewTick } from "../lib/dashboardView";
import AddFundsModal from "./AddFundsModal";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  loading: true,
  overview: null,
  market: [],
  holdings: [],
  positions: [],
  orders: [],
  wallet: { balance: 0, totalDeposited: 0, totalWithdrawn: 0, availableMargin: 0, usedMargin: 0 },
  walletTransactions: [],
  stats: { investmentValue: 0, holdingsValue: 0, totalPnl: 0, totalPnlPercent: 0, dayPnl: 0, netWorth: 0 },
  selectedStock: null,
  topMovers: [],
  marketIndices: [],
  tradeModalState: { open: false, mode: "buy", symbol: "" },
  fundsModalOpen: false,
  refreshDashboard: async () => {},
  selectStock: () => {},
  openTradeWindow: () => {},
  closeTradeWindow: () => {},
  executeTrade: async () => {},
  openFundsModal: () => {},
  closeFundsModal: () => {},
  addFunds: async () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tradeModalState, setTradeModalState] = useState({
    open: false,
    mode: "buy",
    symbol: "",
  });
  const [fundsModalOpen, setFundsModalOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const refreshDashboard = async () => {
    if (!getAuthToken()) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.get("/api/dashboard/overview");
      setOverview(response.data);
      setSelectedSymbol((current) => current || response.data.market?.[0]?.symbol || "");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  useEffect(() => {
    if (!overview) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setOverview((current) => simulateOverviewTick(current));
    }, 2800);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [overview]);

  const selectStock = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const openTradeWindow = (symbol, mode = "buy") => {
    setTradeModalState({
      open: true,
      mode,
      symbol: symbol || selectedSymbol || overview?.market?.[0]?.symbol || "",
    });
  };

  const closeTradeWindow = () => {
    setTradeModalState((current) => ({ ...current, open: false }));
  };

  const executeTrade = async ({ symbol, quantity, mode }) => {
    const endpoint = mode === "sell" ? "/api/trades/sell" : "/api/trades/buy";
    const response = await api.post(endpoint, {
      symbol,
      quantity,
    });

    setOverview(response.data.overview);
    setSelectedSymbol(symbol);
    closeTradeWindow();
  };

  const openFundsModal = () => setFundsModalOpen(true);
  const closeFundsModal = () => setFundsModalOpen(false);

  const addFunds = async ({ amount, method }) => {
    await api.post("/api/wallet/add-funds", {
      amount,
      method,
    });
    await refreshDashboard();
  };

  const selectedStock = useMemo(() => {
    if (!overview?.market?.length) {
      return null;
    }

    return (
      overview.market.find((stock) => stock.symbol === selectedSymbol) ||
      overview.market[0]
    );
  }, [overview, selectedSymbol]);

  const marketIndices = useMemo(
    () => getMarketIndices(overview?.market || []),
    [overview]
  );

  const contextValue = {
    loading,
    overview,
    market: overview?.market || [],
    holdings: overview?.holdings || [],
    positions: overview?.positions || [],
    orders: overview?.orders || [],
    wallet: overview?.wallet || {
      balance: 0,
      totalDeposited: 0,
      totalWithdrawn: 0,
      availableMargin: 0,
      usedMargin: 0,
    },
    walletTransactions: overview?.walletTransactions || [],
    stats: overview?.stats || {
      investmentValue: 0,
      holdingsValue: 0,
      totalPnl: 0,
      totalPnlPercent: 0,
      dayPnl: 0,
      netWorth: 0,
    },
    selectedStock,
    topMovers: overview?.topMovers || [],
    marketIndices,
    tradeModalState,
    fundsModalOpen,
    refreshDashboard,
    selectStock,
    openTradeWindow,
    closeTradeWindow,
    executeTrade,
    openFundsModal,
    closeFundsModal,
    addFunds,
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
      <BuyActionWindow />
      <AddFundsModal />
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
