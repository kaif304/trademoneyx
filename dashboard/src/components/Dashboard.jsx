import React from "react";
import { Route, Routes } from "react-router-dom";

import WatchList from "./WatchList";
import Summary from "./Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import Apps from "./Apps";

function Dashboard({ currentUser }) {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 pb-10 xl:flex-row">
      <WatchList />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Summary currentUser={currentUser} />} />
          <Route path="/dashboard" element={<Summary currentUser={currentUser} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
