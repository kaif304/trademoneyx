import { useContext } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import { formatCurrency, formatDateTime } from "../lib/dashboardView";

export default function Orders() {
  const { orders } = useContext(GeneralContext);

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Trade Ledger</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Recent orders ({orders.length})
          </h3>
        </div>
        <p className="text-sm text-slate-500">Every buy and sell is stored in MongoDB and reflected below.</p>
      </div>

      <div className="mt-6 grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  order.mode === "BUY"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {order.mode === "BUY" ? <ArrowUpward /> : <ArrowDownward />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{order.symbol}</p>
                <p className="mt-1 text-xs text-slate-500">{order.companyName}</p>
              </div>
            </div>

            <div className="grid min-w-[340px] flex-1 grid-cols-4 gap-3 text-right">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Side</p>
                <p className={`mt-2 text-sm font-semibold ${order.mode === "BUY" ? "text-blue-700" : "text-emerald-700"}`}>
                  {order.mode}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Quantity</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{order.qty}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Executed at</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{formatCurrency(order.price)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Total</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{formatCurrency(order.total)}</p>
              </div>
            </div>

            <div className="min-w-[120px] text-right">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Time</p>
              <p className="mt-2 text-sm font-medium text-slate-700">{formatDateTime(order.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
