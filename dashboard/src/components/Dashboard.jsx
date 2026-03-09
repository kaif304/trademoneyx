import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import WatchList from './WatchList'
import Summary from './Summary'
import Orders from './Orders'
import Holdings from './Holdings'
import Positions from './Positions'
import Funds from './Funds'
import Apps from './Apps'

function Dashboard() {
  return (
    <div className='dashboard-container'>
      <WatchList />
      <div className='content'>
        <Routes>
          <Route exact path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard