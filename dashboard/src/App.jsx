import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import api from "./lib/api";
import { captureTokenFromUrl, clearAuthToken, getAuthToken, redirectToFrontend } from "./lib/auth";

function FullScreenMessage({ title, description }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
                <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-blue-100 text-2xl font-semibold leading-[56px] text-blue-600">
                    T
                </div>
                <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
            </div>
        </div>
    );
}

export default function App() {
    const [status, setStatus] = useState("loading");
    const [user, setUser] = useState(null);

    useEffect(() => {
        captureTokenFromUrl();
        const token = getAuthToken();

        if (!token) {
            redirectToFrontend();
            return;
        }

        let isMounted = true;

        const bootstrap = async () => {
            try {
                const response = await api.get("/api/auth/me");

                if (!isMounted) {
                    return;
                }

                setUser(response.data.user);
                setStatus("ready");
            } catch (error) {
                clearAuthToken();

                if (!isMounted) {
                    return;
                }

                setStatus("error");
                window.setTimeout(() => {
                    redirectToFrontend();
                }, 1200);
            }
        };

        bootstrap();

        return () => {
            isMounted = false;
        };
    }, []);

    if (status === "loading") {
        return (
            <FullScreenMessage
                title="Loading dashboard"
                description="Verifying your session and preparing your workspace."
            />
        );
    }

    if (status === "error") {
        return (
            <FullScreenMessage
                title="Session expired"
                description="Your login could not be verified, so we are sending you back to the landing page."
            />
        );
    }

    return (
        <Routes>
            <Route path="/*" element={<Home currentUser={user} />} />
        </Routes>
    );
}
