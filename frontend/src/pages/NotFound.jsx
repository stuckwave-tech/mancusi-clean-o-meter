import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Seite nicht gefunden</h2>
        <p>Die angeforderte Seite existiert nicht.</p>
        <Link to="/" className="btn btn-primary">
          <FaHome /> Zurück zum Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
