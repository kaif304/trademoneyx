import { useContext, useEffect, useState } from "react";
import GeneralContext from "./GeneralContext";
import { formatCurrency } from "../lib/dashboardView";

const presets = [2500, 5000, 10000, 25000];
const methods = [
  { id: "UPI", label: "UPI", description: "Instant settlement to demo wallet" },
  { id: "CARD", label: "Card", description: "Mock debit and credit card checkout" },
  { id: "NETBANKING", label: "Net banking", description: "Simulated bank transfer window" },
];

export default function AddFundsModal() {
  const { fundsModalOpen, closeFundsModal, addFunds, wallet } = useContext(GeneralContext);
  const [amount, setAmount] = useState(5000);
  const [method, setMethod] = useState("UPI");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!fundsModalOpen) {
      return;
    }

    setError("");
  }, [fundsModalOpen]);

  if (!fundsModalOpen) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await addFunds({ amount: Number(amount), method });
      closeFundsModal();
    } catch (submissionError) {
      setError(submissionError.message || "Unable to add funds right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-slate-950/50 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
      onClick={closeFundsModal}
    >
      <div
        className="my-auto max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl sm:max-h-[calc(100vh-3rem)] sm:p-6 lg:max-w-2xl lg:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
              Demo Payment Gateway
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">Add money to wallet</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This is a simulated payment flow for tutorials. Money is credited instantly after confirmation.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            onClick={closeFundsModal}
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl bg-slate-950 p-4 text-white sm:p-5 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-300">Current wallet balance</p>
            <p className="mt-2 text-3xl font-semibold">{formatCurrency(wallet.balance)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-300">Secure demo checkout</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              You will see the amount credited immediately and the transaction stored in MongoDB.
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">Amount</label>
            <input
              type="number"
              min="1"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setAmount(preset)}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Choose payment method</label>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {methods.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`rounded-3xl border p-4 text-left transition ${
                    method === item.id
                      ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                  onClick={() => setMethod(item.id)}
                >
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Amount to be credited</span>
              <span className="font-semibold text-slate-900">{formatCurrency(amount)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
              <span>Gateway charges</span>
              <span className="font-semibold text-emerald-600">Free</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-3">
              <span className="text-sm text-slate-500">Updated wallet balance</span>
              <span className="text-lg font-semibold text-slate-900">
                {formatCurrency(Number(wallet.balance) + Number(amount || 0))}
              </span>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              onClick={closeFundsModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Pay and add money"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
