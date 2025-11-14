import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>小孩學英文</h1>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="選單">
          {menuOpen ? '✕' : '☰'}
        </button>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/learn" className={({isActive}) => isActive ? 'active' : ''} onClick={closeMenu}>字卡學習</NavLink>
          <NavLink to="/quiz" className={({isActive}) => isActive ? 'active' : ''} onClick={closeMenu}>小測驗</NavLink>
          <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : ''} onClick={closeMenu}>管理</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">Made with ❤️ for kids by Lentice</footer>
    </div>
  )
}
