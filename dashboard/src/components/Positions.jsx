import { useContext } from "react";
import GeneralContext from "./GeneralContext";
import { formatCurrency } from "../lib/dashboardView";

export default function Positions() {
  const { positions, openTradeWindow } = useContext(GeneralContext);

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Open exposure</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Active positions ({positions.length})
          </h3>
        </div>
        <p className="text-sm text-slate-500">
          Positions are derived from your simulated holdings and move with the live watchlist feed.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {positions.map((position) => (
          <div
            key={position.symbol}
            className="rounded-[28px] border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {position.product}
                </p>
                <h4 className="mt-2 text-xl font-semibold text-slate-900">{position.symbol}</h4>
                <p className="mt-1 text-sm text-slate-500">{position.companyName}</p>
              </div>
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${position.isLoss ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>
                {position.day}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white px-4 py-3">
                <p className="text-slate-500">Quantity</p>
                <p className="mt-2 font-semibold text-slate-900">{position.qty}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                <p className="text-slate-500">Average</p>
                <p className="mt-2 font-semibold text-slate-900">{formatCurrency(position.avg)}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                <p className="text-slate-500">LTP</p>
                <p className="mt-2 font-semibold text-slate-900">{formatCurrency(position.price)}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                <p className="text-slate-500">P&L</p>
                <p className={`mt-2 font-semibold ${position.isLoss ? "text-rose-600" : "text-emerald-600"}`}>
                  {formatCurrency(position.pnl)}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              onClick={() => openTradeWindow(position.symbol, "sell")}
            >
              Reduce or exit position
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
