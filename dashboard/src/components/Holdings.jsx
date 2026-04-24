import { useContext } from "react";
import { ArrowOutward, Sell } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import { formatCurrency } from "../lib/dashboardView";

export default function Holdings() {
  const { holdings, openTradeWindow, selectStock } = useContext(GeneralContext);

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Portfolio Holdings</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Held stocks ({holdings.length})
          </h3>
        </div>
        <p className="text-sm text-slate-500">
          Click any row to inspect it on the main chart, or sell directly from here.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
        <div className="grid grid-cols-[1.4fr_0.7fr_0.8fr_0.8fr_0.7fr_0.7fr] gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          <span>Stock</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Avg</span>
          <span className="text-right">LTP</span>
          <span className="text-right">P&L</span>
          <span className="text-right">Action</span>
        </div>

        {holdings.map((holding) => (
          <button
            type="button"
            key={holding.symbol}
            className="grid w-full grid-cols-[1.4fr_0.7fr_0.8fr_0.8fr_0.7fr_0.7fr] items-center gap-3 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 last:border-b-0"
            onClick={() => selectStock(holding.symbol)}
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">{holding.symbol}</p>
                <ArrowOutward className="!text-slate-300" fontSize="inherit" />
              </div>
              <p className="mt-1 text-xs text-slate-500">{holding.companyName}</p>
            </div>
            <span className="text-right text-sm font-medium text-slate-900">{holding.qty}</span>
            <span className="text-right text-sm font-medium text-slate-900">{formatCurrency(holding.avg)}</span>
            <span className="text-right text-sm font-medium text-slate-900">{formatCurrency(holding.price)}</span>
            <span className={`text-right text-sm font-semibold ${holding.isLoss ? "text-rose-600" : "text-emerald-600"}`}>
              {formatCurrency(holding.pnl)}
            </span>
            <span className="text-right">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                onClick={(event) => {
                  event.stopPropagation();
                  openTradeWindow(holding.symbol, "sell");
                }}
              >
                <Sell fontSize="inherit" />
                Sell
              </button>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
