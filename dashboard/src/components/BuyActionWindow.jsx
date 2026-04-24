import { useContext, useEffect, useMemo, useState } from "react";
import GeneralContext from "./GeneralContext";
import { formatCurrency } from "../lib/dashboardView";

export default function BuyActionWindow() {
  const {
    tradeModalState,
    closeTradeWindow,
    executeTrade,
    market,
    holdings,
    wallet,
  } = useContext(GeneralContext);
  const [mode, setMode] = useState("buy");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tradeModalState.open) {
      return;
    }

    const fallbackSellSymbol =
      holdings.find((holding) => holding.symbol === tradeModalState.symbol)?.symbol ||
      holdings[0]?.symbol ||
      "";

    setMode(tradeModalState.mode || "buy");
    setSymbol(
      tradeModalState.mode === "sell"
        ? fallbackSellSymbol
        : tradeModalState.symbol || market[0]?.symbol || ""
    );
    setQuantity(1);
    setError("");
  }, [tradeModalState, market, holdings]);

  const availableSellSymbols = holdings.map((holding) => holding.symbol);
  const selectedMarketStock = market.find((stock) => stock.symbol === symbol);
  const selectedHolding = holdings.find((holding) => holding.symbol === symbol);
  const estimatedTotal = (selectedMarketStock?.currentPrice || 0) * Number(quantity || 0);

  const selectableOptions = useMemo(() => {
    if (mode === "sell") {
      return holdings.map((holding) => ({
        symbol: holding.symbol,
        companyName: holding.companyName,
      }));
    }

    return market.map((stock) => ({
      symbol: stock.symbol,
      companyName: stock.companyName,
    }));
  }, [mode, market, holdings]);

  if (!tradeModalState.open) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await executeTrade({
        symbol,
        quantity: Number(quantity),
        mode,
      });
    } catch (submissionError) {
      setError(submissionError.response?.data?.message || submissionError.message || "Trade failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm"
      onClick={closeTradeWindow}
    >
      <div
        className="w-full max-w-3xl rounded-[32px] border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`rounded-t-[32px] px-6 py-5 text-white ${mode === "buy" ? "bg-blue-600" : "bg-emerald-600"}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                {mode === "buy" ? "Buy Order" : "Sell Order"}
              </p>
              <h3 className="mt-2 text-3xl font-semibold">
                {selectedMarketStock?.symbol || "Select stock"}
              </h3>
              <p className="mt-2 text-sm text-white/80">
                {selectedMarketStock?.companyName || "Choose a stock to place your simulated order."}
              </p>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
              onClick={closeTradeWindow}
            >
              Close
            </button>
          </div>

          <div className="mt-5 flex rounded-full bg-white/10 p-1">
            <button
              type="button"
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "buy" ? "bg-white text-blue-700" : "text-white/80"
              }`}
              onClick={() => {
                setMode("buy");
                setSymbol(symbol || market[0]?.symbol || "");
              }}
            >
              Buy
            </button>
            <button
              type="button"
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "sell" ? "bg-white text-emerald-700" : "text-white/80"
              }`}
              onClick={() => {
                setMode("sell");
                setSymbol(selectedHolding?.symbol || availableSellSymbols[0] || "");
              }}
            >
              Sell
            </button>
          </div>
        </div>

        <form className="space-y-6 px-6 py-6 md:px-8" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <label className="block text-sm font-medium text-slate-700">Stock</label>
              <select
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                value={symbol}
                onChange={(event) => setSymbol(event.target.value)}
              >
                {selectableOptions.map((option) => (
                  <option key={option.symbol} value={option.symbol}>
                    {option.symbol} - {option.companyName}
                  </option>
                ))}
              </select>

              {mode === "sell" && selectableOptions.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                  You do not have any holdings available to sell yet.
                </div>
              ) : null}

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Quantity</span>
                  <input
                    type="number"
                    min="1"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                </label>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-sm text-slate-500">Market price</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {formatCurrency(selectedMarketStock?.currentPrice || 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-700">Order preview</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Estimated value</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(estimatedTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Available cash</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(wallet.balance)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Your holding</span>
                  <span className="font-semibold text-slate-900">
                    {selectedHolding ? `${selectedHolding.qty} shares` : "0 shares"}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm text-slate-500">
                  <span>Average holding price</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(selectedHolding?.avg || 0)}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2">
                {[1, 5, 10, 25].map((value) => (
                  <button
                    type="button"
                    key={value}
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    onClick={() => setQuantity(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              onClick={closeTradeWindow}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !symbol || (mode === "sell" && selectableOptions.length === 0)}
              className={`rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60 ${
                mode === "buy"
                  ? "bg-blue-600 shadow-blue-100 hover:bg-blue-700"
                  : "bg-emerald-600 shadow-emerald-100 hover:bg-emerald-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : mode === "buy" ? "Confirm buy" : "Confirm sell"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
