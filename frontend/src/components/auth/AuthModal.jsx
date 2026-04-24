import { useEffect, useMemo, useState } from "react";
import { buildDashboardUrl } from "../../utils/dashboardUrl";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialSignupState = {
    name: "",
    email: "",
    password: "",
};

const initialLoginState = {
    email: "",
    password: "",
};

export default function AuthModal({ isOpen, mode, onClose, onModeChange }) {
    const [signupForm, setSignupForm] = useState(initialSignupState);
    const [loginForm, setLoginForm] = useState(initialLoginState);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const activeCopy = useMemo(() => {
        if (mode === "login") {
            return {
                title: "Welcome back",
                subtitle: "Log in to continue to your trading dashboard.",
                buttonLabel: "Log in",
                endpoint: "/api/auth/login",
            };
        }

        return {
            title: "Create your account",
            subtitle: "Sign up once and continue straight into your dashboard.",
            buttonLabel: "Create account",
            endpoint: "/api/auth/signup",
        };
    }, [mode]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        setErrorMessage("");
    }, [mode, isOpen]);

    if (!isOpen) {
        return null;
    }

    const updateForm = (setForm) => (event) => {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const redirectToDashboard = (token) => {
        const dashboardTarget = new URL(buildDashboardUrl("/dashboard"));
        dashboardTarget.searchParams.set("token", token);
        window.location.assign(dashboardTarget.toString());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        const payload = mode === "signup" ? signupForm : loginForm;

        try {
            const response = await fetch(`${API_BASE_URL}${activeCopy.endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Authentication failed.");
            }

            redirectToDashboard(data.token);
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 py-8 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="auth-modal-panel relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    aria-label="Close auth dialog"
                    className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                    onClick={onClose}
                >
                    x
                </button>

                <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                    <div className="auth-modal-aside relative overflow-hidden bg-slate-950 px-6 py-10 text-white md:px-10 md:py-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.42),_transparent_42%),linear-gradient(135deg,_rgba(15,23,42,1),_rgba(30,41,59,0.94)_55%,_rgba(37,99,235,0.72))]" />
                        <div className="relative">
                            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">
                                TradeMoneyX
                            </p>
                            <h2 className="max-w-sm text-3xl font-semibold leading-tight md:text-4xl">
                                {mode === "signup"
                                    ? "Start trading with a clean, fast onboarding flow."
                                    : "Pick up exactly where you left off."}
                            </h2>
                            <p className="mt-4 max-w-md text-sm leading-7 text-slate-200 md:text-base">
                                Your credentials are stored in MongoDB and your dashboard session is created the
                                moment authentication succeeds.
                            </p>

                            <div className="mt-10 grid gap-4 text-sm text-slate-100/90">
                                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                    Unified access to holdings, positions, orders, and future dashboard actions.
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                    Built to match the same blue, white, and slate styling across the landing site.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white px-6 py-8 md:px-10 md:py-12">
                        <div className="mb-8 flex w-full rounded-full bg-slate-100 p-1">
                            <button
                                type="button"
                                className={`auth-toggle-button ${mode === "signup" ? "auth-toggle-active" : ""}`}
                                onClick={() => onModeChange("signup")}
                            >
                                Sign up
                            </button>
                            <button
                                type="button"
                                className={`auth-toggle-button ${mode === "login" ? "auth-toggle-active" : ""}`}
                                onClick={() => onModeChange("login")}
                            >
                                Log in
                            </button>
                        </div>

                        <div>
                            <h3 className="text-3xl font-semibold text-slate-900">{activeCopy.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{activeCopy.subtitle}</p>
                        </div>

                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            {mode === "signup" ? (
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
                                    <input
                                        className="auth-input"
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={signupForm.name}
                                        onChange={updateForm(setSignupForm)}
                                        required
                                    />
                                </label>
                            ) : null}

                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
                                <input
                                    className="auth-input"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={mode === "signup" ? signupForm.email : loginForm.email}
                                    onChange={
                                        mode === "signup"
                                            ? updateForm(setSignupForm)
                                            : updateForm(setLoginForm)
                                    }
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                                <input
                                    className="auth-input"
                                    type="password"
                                    name="password"
                                    placeholder={mode === "signup" ? "Minimum 8 characters" : "Enter your password"}
                                    value={mode === "signup" ? signupForm.password : loginForm.password}
                                    onChange={
                                        mode === "signup"
                                            ? updateForm(setSignupForm)
                                            : updateForm(setLoginForm)
                                    }
                                    minLength={mode === "signup" ? 8 : 1}
                                    required
                                />
                            </label>

                            {errorMessage ? (
                                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                    {errorMessage}
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                className="mt-3 w-full rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Please wait..." : activeCopy.buttonLabel}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            {mode === "signup" ? "Already have an account?" : "Need a new account?"}{" "}
                            <button
                                type="button"
                                className="font-semibold text-blue-600 transition hover:text-blue-700"
                                onClick={() => onModeChange(mode === "signup" ? "login" : "signup")}
                            >
                                {mode === "signup" ? "Log in" : "Sign up"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
