import { useContext, useMemo } from "react";
import { AccountBalanceWallet, Bolt, NorthEast, TrendingUp } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import PriceSparkline from "./PriceSparkline";
import {
  formatCompactNumber,
  formatCurrency,
  formatPercent,
} from "../lib/dashboardView";

function MetricCard({ label, value, helper, positive }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
      <p className={`mt-2 text-sm font-medium ${positive ? "text-emerald-600" : "text-slate-500"}`}>
        {helper}
      </p>
    </div>
  );
}

export default function Summary({ currentUser }) {
  const {
    selectedStock,
    stats,
    wallet,
    holdings,
    topMovers,
    openTradeWindow,
    openFundsModal,
    selectStock,
  } = useContext(GeneralContext);

  const strongestHolding = useMemo(
    () =>
      [...holdings].sort((a, b) => b.currentValue - a.currentValue).slice(0, 3),
    [holdings]
  );

  if (!selectedStock) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
            Trading Desk
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Welcome back, {currentUser?.name || "Trader"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Track your simulated market, manage your wallet, and trade from one realistic brokerage workspace.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            onClick={openFundsModal}
          >
            Add money
          </button>
          <button
            type="button"
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
            onClick={() => openTradeWindow(selectedStock.symbol, "buy")}
          >
            Buy {selectedStock.symbol}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
          <div className="border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_36%),linear-gradient(135deg,_#0f172a,_#162338_55%,_#1d4ed8_160%)] px-6 py-6 text-white">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                  Selected stock
                </p>
                <h3 className="mt-2 text-4xl font-semibold">{selectedStock.symbol}</h3>
                <p className="mt-2 text-sm text-white/75">{selectedStock.companyName}</p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">LTP</p>
                <p className="mt-2 text-3xl font-semibold">{formatCurrency(selectedStock.currentPrice)}</p>
                <p className={`mt-2 text-sm font-semibold ${selectedStock.isDown ? "text-rose-200" : "text-emerald-200"}`}>
                  {selectedStock.percent}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-6 md:grid-cols-[1fr_0.38fr]">
            <div>
              <div className="h-64 rounded-[28px] border border-slate-100 bg-slate-50 p-4">
                <PriceSparkline
                  values={selectedStock.history}
                  width={560}
                  height={220}
                  color={selectedStock.isDown ? "#e11d48" : "#2563eb"}
                  fill={selectedStock.isDown ? "rgba(225,29,72,0.1)" : "rgba(37,99,235,0.12)"}
                  strokeWidth={3}
                  showGrid
                />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-4">
                <MetricCard
                  label="Open"
                  value={formatCurrency(selectedStock.openPrice)}
                  helper="Opening price"
                />
                <MetricCard
                  label="Day High"
                  value={formatCurrency(selectedStock.dayHigh)}
                  helper="Session high"
                />
                <MetricCard
                  label="Day Low"
                  value={formatCurrency(selectedStock.dayLow)}
                  helper="Session low"
                />
                <MetricCard
                  label="Volume"
                  value={formatCompactNumber(selectedStock.volume)}
                  helper={selectedStock.sector}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <TrendingUp className="!text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Quick trade</p>
                    <p className="text-xs text-slate-500">Execute from the live detail card</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3">
                  <button
                    type="button"
                    className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    onClick={() => openTradeWindow(selectedStock.symbol, "buy")}
                  >
                    Buy now
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                    onClick={() => openTradeWindow(selectedStock.symbol, "sell")}
                  >
                    Sell holdings
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <AccountBalanceWallet className="!text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Wallet</p>
                    <p className="text-xs text-slate-500">Ready to deploy into the market</p>
                  </div>
                </div>
                <p className="mt-4 text-3xl font-semibold text-slate-900">
                  {formatCurrency(wallet.balance)}
                </p>
                <div className="mt-4 space-y-2 text-sm text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>Used margin</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(wallet.usedMargin)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total deposited</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(wallet.totalDeposited)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                  onClick={openFundsModal}
                >
                  Add money to wallet
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4">
          <MetricCard
            label="Net Worth"
            value={formatCurrency(stats.netWorth)}
            helper="Cash plus current holdings value"
            positive
          />
          <MetricCard
            label="Total P&L"
            value={formatCurrency(stats.totalPnl)}
            helper={formatPercent(stats.totalPnlPercent)}
            positive={stats.totalPnl >= 0}
          />
          <MetricCard
            label="Day P&L"
            value={formatCurrency(stats.dayPnl)}
            helper="Intraday move on held positions"
            positive={stats.dayPnl >= 0}
          />
          <MetricCard
            label="Invested"
            value={formatCurrency(stats.investmentValue)}
            helper="Average cost deployed into holdings"
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Movers
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Market radar</h3>
            </div>
            <Bolt className="!text-amber-500" />
          </div>

          <div className="mt-5 grid gap-3">
            {topMovers.map((stock) => (
              <button
                type="button"
                key={stock.symbol}
                className="flex items-center justify-between rounded-[24px] border border-slate-200 px-4 py-4 text-left transition hover:border-slate-300 hover:bg-slate-50"
                onClick={() => selectStock(stock.symbol)}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{stock.symbol}</p>
                  <p className="mt-1 text-xs text-slate-500">{stock.companyName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{formatCurrency(stock.currentPrice)}</p>
                  <p className={`mt-1 text-xs font-semibold ${stock.isDown ? "text-rose-600" : "text-emerald-600"}`}>
                    {stock.percent}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Portfolio
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Your strongest holdings</h3>
            </div>
            <NorthEast className="!text-blue-600" />
          </div>

          <div className="mt-5 overflow-hidden rounded-[28px] border border-slate-200">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.6fr] gap-3 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              <span>Stock</span>
              <span className="text-right">Current</span>
              <span className="text-right">P&L</span>
              <span className="text-right">Action</span>
            </div>
            {strongestHolding.map((holding) => (
              <div
                key={holding.symbol}
                className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.6fr] items-center gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{holding.symbol}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {holding.qty} shares at {formatCurrency(holding.avg)}
                  </p>
                </div>
                <div className="text-right text-sm font-semibold text-slate-900">
                  {formatCurrency(holding.currentValue)}
                </div>
                <div className={`text-right text-sm font-semibold ${holding.isLoss ? "text-rose-600" : "text-emerald-600"}`}>
                  {formatCurrency(holding.pnl)}
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                    onClick={() => openTradeWindow(holding.symbol, "sell")}
                  >
                    Sell
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
