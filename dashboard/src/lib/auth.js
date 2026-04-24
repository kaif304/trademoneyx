const AUTH_TOKEN_KEY = "tradeMoneyX.dashboard.token";
const DEV_FRONTEND_PORT = "5173";

const normalizeBaseUrl = (value) => value.replace(/\/$/, "");

const isLocalDevHost = (hostname) =>
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);

const getFrontendBaseUrl = () => {
    const configuredUrl = import.meta.env.VITE_FRONTEND_URL;

    if (configuredUrl && /^https?:\/\//i.test(configuredUrl)) {
        return normalizeBaseUrl(configuredUrl);
    }

    const { protocol, hostname } = window.location;

    if (configuredUrl && configuredUrl.startsWith("/")) {
        return normalizeBaseUrl(`${window.location.origin}${configuredUrl}`);
    }

    if (isLocalDevHost(hostname)) {
        return `${protocol}//${hostname}:${DEV_FRONTEND_PORT}`;
    }

    return window.location.origin;
};

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const saveAuthToken = (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const captureTokenFromUrl = () => {
    const currentUrl = new URL(window.location.href);
    const token = currentUrl.searchParams.get("token");

    if (!token) {
        return null;
    }

    saveAuthToken(token);
    currentUrl.searchParams.delete("token");

    const nextPath = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
    window.history.replaceState({}, "", nextPath);

    return token;
};

export const redirectToFrontend = () => {
    window.location.replace(getFrontendBaseUrl());
};
