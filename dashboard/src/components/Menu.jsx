import React from "react";
import { NavLink } from "react-router-dom";
import { clearAuthToken, redirectToFrontend } from "../lib/auth";

function Menu({ currentUser }) {
  const initials =
    currentUser?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "TM";

  const menus = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Orders", path: "orders" },
    { name: "Holdings", path: "holdings" },
    { name: "Positions", path: "positions" },
    { name: "Funds", path: "funds" },
    { name: "Apps", path: "apps" },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.05)] lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold text-white">
          T
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">TradeMoneyX Pro</p>
          <p className="text-xs text-slate-500">Simulated equity desk for learning and practice</p>
        </div>
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={`/${menu.path}`}
            className={({ isActive }) =>
              `rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 rounded-[26px] border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 font-semibold text-blue-700">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{currentUser?.name || "Trader"}</p>
            <p className="text-xs text-slate-500">{currentUser?.email || "active session"}</p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          onClick={() => {
            clearAuthToken();
            redirectToFrontend();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Menu;
