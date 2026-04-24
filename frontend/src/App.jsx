import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import HomePage from "./landing_page/home/HomePage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import NotFound from "./landing_page/NotFound";
import AuthModal from "./components/auth/AuthModal";
import { buildDashboardUrl } from "./utils/dashboardUrl";

function DashboardForwarder() {
    const location = useLocation();

    useEffect(() => {
        window.location.replace(
            buildDashboardUrl(location.pathname, location.search)
        );
    }, [location.pathname, location.search]);

    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-slate-500">
            Redirecting to dashboard...
        </div>
    );
}

function AppShell() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState("signup");

    useEffect(() => {
        if (location.pathname === "/signup") {
            setAuthMode("signup");
            setIsAuthOpen(true);
        }

        if (location.pathname === "/login") {
            setAuthMode("login");
            setIsAuthOpen(true);
        }
    }, [location.pathname]);

    const openAuth = (mode = "signup") => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    const closeAuth = () => {
        setIsAuthOpen(false);

        if (location.pathname === "/signup" || location.pathname === "/login") {
            navigate("/", { replace: true });
        }
    };

    return (
        <>
            <Navbar onOpenAuth={openAuth} />
            <Routes>
                <Route path="/" element={<HomePage onOpenAuth={openAuth} />} />
                <Route path="/signup" element={<HomePage onOpenAuth={openAuth} />} />
                <Route path="/login" element={<HomePage onOpenAuth={openAuth} />} />
                <Route path="/dashboard" element={<DashboardForwarder />} />
                <Route path="/dashboard/*" element={<DashboardForwarder />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
            <AuthModal
                isOpen={isAuthOpen}
                mode={authMode}
                onClose={closeAuth}
                onModeChange={setAuthMode}
            />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppShell />
        </BrowserRouter>
    );
}
