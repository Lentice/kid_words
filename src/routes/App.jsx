import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>小孩學英文</h1>
        <nav className="nav">
          <NavLink to="/learn" className={({isActive}) => isActive ? 'active' : ''}>字卡學習</NavLink>
          <NavLink to="/quiz" className={({isActive}) => isActive ? 'active' : ''}>小測驗</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">Made with ❤️ for kids</footer>
    </div>
  )
}
