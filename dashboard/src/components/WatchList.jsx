import { useContext, useMemo, useState } from "react";
import { CandlestickChart, Search, ShowChart } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import PriceSparkline from "./PriceSparkline";
import { formatCurrency } from "../lib/dashboardView";

export default function WatchList() {
  const { market, holdings, selectedStock, selectStock, openTradeWindow } =
    useContext(GeneralContext);
  const [query, setQuery] = useState("");

  const holdingSymbols = useMemo(
    () => new Set(holdings.map((holding) => holding.symbol)),
    [holdings]
  );

  const filteredMarket = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return market;
    }

    return market.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(normalizedQuery) ||
        stock.companyName.toLowerCase().includes(normalizedQuery) ||
        stock.sector.toLowerCase().includes(normalizedQuery)
    );
  }, [market, query]);

  return (
    <aside className="w-full rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)] xl:w-[360px]">
      <div className="border-b border-slate-100 px-5 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
              Market Watch
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">Live watchlist</h3>
          </div>
          <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
            {filteredMarket.length} stocks
          </div>
        </div>

        <label className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search className="!text-slate-400" fontSize="small" />
          <input
            type="text"
            placeholder="Search stocks or sectors"
            className="w-full bg-transparent text-sm text-slate-700 outline-none"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="max-h-[calc(100vh-220px)] overflow-y-auto px-2 py-2">
        {filteredMarket.map((stock) => {
          const isSelected = selectedStock?.symbol === stock.symbol;
          const isHeld = holdingSymbols.has(stock.symbol);

          return (
            <button
              type="button"
              key={stock.symbol}
              className={`group mb-2 w-full rounded-[26px] border px-4 py-4 text-left transition ${
                isSelected
                  ? "border-blue-200 bg-blue-50 shadow-sm"
                  : "border-transparent hover:border-slate-200 hover:bg-slate-50"
              }`}
              onClick={() => selectStock(stock.symbol)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{stock.symbol}</p>
                    {isHeld ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                        Held
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{stock.companyName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(stock.currentPrice)}
                  </p>
                  <p
                    className={`mt-1 text-xs font-semibold ${
                      stock.isDown ? "text-rose-600" : "text-emerald-600"
                    }`}
                  >
                    {stock.percent}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-12 flex-1 rounded-2xl bg-white px-2 py-1 shadow-inner shadow-slate-100">
                  <PriceSparkline
                    values={stock.history}
                    width={160}
                    height={40}
                    color={stock.isDown ? "#e11d48" : "#0f9f6e"}
                    fill={stock.isDown ? "rgba(225,29,72,0.1)" : "rgba(15,159,110,0.12)"}
                  />
                </div>

                <div className="flex items-center gap-2 opacity-100 transition xl:opacity-0 xl:group-hover:opacity-100">
                  <button
                    type="button"
                    className="rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700"
                    onClick={(event) => {
                      event.stopPropagation();
                      openTradeWindow(stock.symbol, "buy");
                    }}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                    onClick={(event) => {
                      event.stopPropagation();
                      openTradeWindow(stock.symbol, "sell");
                    }}
                  >
                    Sell
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CandlestickChart fontSize="inherit" />
                  <span>{stock.sector}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShowChart fontSize="inherit" />
                  <span>{stock.change.toFixed(2)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
