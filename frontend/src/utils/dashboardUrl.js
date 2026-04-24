const DEV_DASHBOARD_PORT = "5174";

const normalizeBaseUrl = (value) => value.replace(/\/$/, "");

const isLocalDevHost = (hostname) =>
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);

export const getDashboardBaseUrl = () => {
    const configuredUrl = import.meta.env.VITE_DASHBOARD_URL;

    if (configuredUrl && /^https?:\/\//i.test(configuredUrl)) {
        return normalizeBaseUrl(configuredUrl);
    }

    const { protocol, hostname } = window.location;

    if (configuredUrl && configuredUrl.startsWith("/")) {
        return normalizeBaseUrl(`${window.location.origin}${configuredUrl}`);
    }

    if (isLocalDevHost(hostname)) {
        return `${protocol}//${hostname}:${DEV_DASHBOARD_PORT}`;
    }

    return `${window.location.origin}`;
};

export const buildDashboardUrl = (path = "/dashboard", search = "") => {
    const dashboardUrl = new URL(path, `${getDashboardBaseUrl()}/`);

    if (search) {
        const incomingParams = new URLSearchParams(search);
        incomingParams.forEach((value, key) => {
            dashboardUrl.searchParams.set(key, value);
        });
    }

    return dashboardUrl.toString();
};
