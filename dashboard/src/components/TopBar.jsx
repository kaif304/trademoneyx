import React, { useContext } from "react";
import Menu from "./Menu";
import GeneralContext from "./GeneralContext";
import { formatCurrency, formatPercent } from "../lib/dashboardView";

function TopBar({ currentUser }) {
  const { marketIndices, selectedStock, openTradeWindow, openFundsModal } =
    useContext(GeneralContext);

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {marketIndices.map((index) => (
            <div
              key={index.label}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {index.label}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">{index.value}</span>
                <span className={`text-xs font-semibold ${index.isDown ? "text-rose-600" : "text-emerald-600"}`}>
                  {formatPercent(index.changePercent)}
                </span>
              </div>
            </div>
          ))}

          {selectedStock ? (
            <div className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-500">
                Focus
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">
                  {selectedStock.symbol} {formatCurrency(selectedStock.currentPrice)}
                </span>
                <span className={`text-xs font-semibold ${selectedStock.isDown ? "text-rose-600" : "text-emerald-600"}`}>
                  {selectedStock.percent}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            onClick={openFundsModal}
          >
            Add money
          </button>
          <button
            type="button"
            className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
            onClick={() => openTradeWindow(selectedStock?.symbol, "buy")}
          >
            Quick buy
          </button>
        </div>
      </div>

      <Menu currentUser={currentUser} />
    </div>
  );
}

export default TopBar;
