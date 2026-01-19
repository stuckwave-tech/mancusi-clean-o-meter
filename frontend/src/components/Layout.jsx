import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaCar, FaClipboardCheck, FaStar, FaBars, FaTimes, FaHome } from 'react-icons/fa'
import './Layout.css'

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', icon: <FaHome />, label: 'Dashboard' },
    { path: '/vehicles', icon: <FaCar />, label: 'Fahrzeuge' },
    { path: '/inspections', icon: <FaClipboardCheck />, label: 'Inspektionen' },
    { path: '/standards', icon: <FaStar />, label: 'Standards' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>Autohaus Vatterott</h1>
            <p>Qualitätsmanagement-System</p>
          </div>
          
          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Autohaus Vatterott. Alle Rechte vorbehalten.</p>
          <p>
            <a href="https://www.autohaus-vatterott.de" target="_blank" rel="noopener noreferrer">
              www.autohaus-vatterott.de
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
