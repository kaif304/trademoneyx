import { useContext } from "react";
import { AccountBalanceWallet, Payments, Security } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import { formatCurrency, formatDateTime } from "../lib/dashboardView";

export default function Funds() {
  const { wallet, stats, walletTransactions, openFundsModal } = useContext(GeneralContext);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[30px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_36%),linear-gradient(135deg,_#0f172a,_#162338_55%,_#1d4ed8_160%)] p-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/65">
                  Tutorial Wallet
                </p>
                <h3 className="mt-3 text-4xl font-semibold">{formatCurrency(wallet.balance)}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
                  Add static demo money, place buy and sell trades, and learn the entire order lifecycle without any real payment.
                </p>
              </div>
              <AccountBalanceWallet className="!text-white/70" />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-white/70">Deposited</p>
                <p className="mt-2 text-xl font-semibold">{formatCurrency(wallet.totalDeposited)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-white/70">Used margin</p>
                <p className="mt-2 text-xl font-semibold">{formatCurrency(wallet.usedMargin)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-white/70">Net worth</p>
                <p className="mt-2 text-xl font-semibold">{formatCurrency(stats.netWorth)}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <Payments className="!text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Instant top-ups</p>
                  <p className="text-xs text-slate-500">UPI, card, and bank transfer gateway simulation</p>
                </div>
              </div>
              <button
                type="button"
                className="mt-5 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                onClick={openFundsModal}
              >
                Add money
              </button>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <Security className="!text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Safe sandbox</p>
                  <p className="text-xs text-slate-500">No real gateway or bank debit is used</p>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Available cash</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(wallet.balance)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Current holdings value</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(stats.holdingsValue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total invested</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(stats.investmentValue)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Wallet ledger</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">Recent transactions</h3>
          </div>
          <p className="text-sm text-slate-500">Gateway top-ups and trade-related balance changes are listed here.</p>
        </div>

        <div className="mt-6 grid gap-4">
          {walletTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="grid gap-3 rounded-[26px] border border-slate-200 bg-slate-50 px-5 py-4 md:grid-cols-[1fr_0.9fr_0.7fr_0.9fr]"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{transaction.type.replaceAll("_", " ")}</p>
                <p className="mt-1 text-xs text-slate-500">{transaction.note}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Reference</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{transaction.reference}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Amount</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{formatCurrency(transaction.amount)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Balance after</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{formatCurrency(transaction.balanceAfter)}</p>
                <p className="mt-1 text-xs text-slate-500">{formatDateTime(transaction.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
