import { useContext } from "react";
import { AutoGraph, Insights, NotificationsActive, PieChartOutline } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import { formatCompactNumber, formatCurrency } from "../lib/dashboardView";

const tools = [
  {
    title: "Risk Dashboard",
    description: "Track exposure concentration, capital deployment, and day P&L in one place.",
    icon: PieChartOutline,
  },
  {
    title: "Market Pulse",
    description: "Use the top movers and watchlist heat to find momentum quickly.",
    icon: AutoGraph,
  },
  {
    title: "Trade Journal",
    description: "Review each buy and sell with stored timestamps and order values.",
    icon: Insights,
  },
  {
    title: "Alerts",
    description: "Mock push alerts and triggers for a more realistic brokerage cockpit feel.",
    icon: NotificationsActive,
  },
];

export default function Apps() {
  const { selectedStock, stats, wallet, topMovers } = useContext(GeneralContext);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Platform tools</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">Broker-style utility layer</h3>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                    <Icon />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{tool.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{tool.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr_1fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Selected</p>
          <h4 className="mt-2 text-xl font-semibold text-slate-900">{selectedStock?.symbol}</h4>
          <p className="mt-2 text-sm text-slate-500">{selectedStock?.companyName}</p>
          <p className="mt-5 text-2xl font-semibold text-slate-900">{formatCurrency(selectedStock?.currentPrice)}</p>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Net Worth</p>
          <h4 className="mt-5 text-2xl font-semibold text-slate-900">{formatCurrency(stats.netWorth)}</h4>
          <p className="mt-2 text-sm text-slate-500">Wallet plus market value of your holdings</p>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Cash Ready</p>
          <h4 className="mt-5 text-2xl font-semibold text-slate-900">{formatCurrency(wallet.balance)}</h4>
          <p className="mt-2 text-sm text-slate-500">Immediately deployable into new demo positions</p>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Market pulse</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">Top movers snapshot</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topMovers.map((stock) => (
            <div
              key={stock.symbol}
              className="rounded-[28px] border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-semibold text-slate-900">{stock.symbol}</p>
              <p className="mt-1 text-xs text-slate-500">{stock.companyName}</p>
              <p className="mt-4 text-xl font-semibold text-slate-900">
                {formatCurrency(stock.currentPrice)}
              </p>
              <p className={`mt-2 text-sm font-semibold ${stock.isDown ? "text-rose-600" : "text-emerald-600"}`}>
                {stock.percent}
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Volume {formatCompactNumber(stock.volume)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
