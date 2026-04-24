import React from 'react'
import TopBar from './TopBar'
import Dashboard from './Dashboard'

function Home({ currentUser }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_24%),linear-gradient(180deg,_#f8fbff,_#f3f6fb_42%,_#eef3f8)]">
        <TopBar currentUser={currentUser} />
        <Dashboard currentUser={currentUser} />
    </div>
  )
}

export default Home
