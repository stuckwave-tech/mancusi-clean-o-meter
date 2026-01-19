import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaCar, FaClipboardCheck, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import api from '../services/api'
import './Dashboard.css'

const Dashboard = () => {
  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: api.getVehicles
  })

  const { data: inspections } = useQuery({
    queryKey: ['inspections'],
    queryFn: api.getInspections
  })

  const { data: stats } = useQuery({
    queryKey: ['inspection-stats'],
    queryFn: api.getInspectionStats
  })

  const vehicleCount = vehicles?.data?.length || 0
  const inspectionCount = inspections?.data?.length || 0
  const problematicInspections = inspections?.data?.filter(
    i => i.overallRating === 'Inakzeptabel'
  ).length || 0

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="subtitle">Übersicht über das Qualitätsmanagement-System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon vehicles">
            <FaCar />
          </div>
          <div className="stat-content">
            <h3>{vehicleCount}</h3>
            <p>Fahrzeuge</p>
          </div>
          <Link to="/vehicles" className="stat-link">Details ansehen →</Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon inspections">
            <FaClipboardCheck />
          </div>
          <div className="stat-content">
            <h3>{inspectionCount}</h3>
            <p>Inspektionen</p>
          </div>
          <Link to="/inspections" className="stat-link">Details ansehen →</Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon problems">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <h3>{problematicInspections}</h3>
            <p>Problematisch</p>
          </div>
          <Link to="/inspections" className="stat-link">Details ansehen →</Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats?.data?.byRating?.akzeptabel || 0}</h3>
            <p>Akzeptabel</p>
          </div>
          <Link to="/inspections" className="stat-link">Details ansehen →</Link>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>Qualitätsanspruch</h2>
          <p>Unser Sauberkeits-Standard für Vorführwagen und Leihfahrzeuge.</p>
          <img 
            src="/assets/images/qualitaetsanspruch.jpg" 
            alt="Qualitätsanspruch: Rückgabe von Vorführwagen"
            className="quality-image"
          />
          <div className="card-actions">
            <Link to="/standards" className="btn btn-primary">Standards ansehen</Link>
          </div>
        </div>

        <div className="card">
          <h2>Neueste Inspektionen</h2>
          {inspections?.data?.slice(0, 5).map((inspection) => (
            <div key={inspection.id} className="inspection-item">
              <div className="inspection-header">
                <span className="license-plate">{inspection.licensePlate}</span>
                <span className={`badge badge-${getRatingClass(inspection.overallRating)}`}>
                  {inspection.overallRating}
                </span>
              </div>
              <div className="inspection-details">
                <small>Inspektor: {inspection.inspector}</small>
                <small>Typ: {inspection.type}</small>
              </div>
            </div>
          ))}
          {(!inspections || inspections.data.length === 0) && (
            <p className="no-data">Keine Inspektionen vorhanden</p>
          )}
          <div className="card-actions">
            <Link to="/inspections" className="btn btn-secondary">Alle Inspektionen</Link>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Wichtige Hinweise</h2>
        <div className="notice-grid">
          <div className="notice-item">
            <strong>Innenraum reinigen:</strong>
            <p>Vor der Rückgabe Müll entfernen und grobe Verschmutzungen beseitigen.</p>
          </div>
          <div className="notice-item">
            <strong>Äußeres prüfen:</strong>
            <p>Das Fahrzeug muss stets einen ordentlichen und vorzeigbaren Eindruck machen.</p>
          </div>
          <div className="notice-item">
            <strong>Für alle gültig:</strong>
            <p>Dies gilt für Kunden, Mitarbeiter und interne Fahrten.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const getRatingClass = (rating) => {
  switch (rating) {
    case 'Akzeptabel':
      return 'success'
    case 'Reinigung erforderlich':
      return 'warning'
    case 'Inakzeptabel':
      return 'danger'
    default:
      return 'info'
  }
}

export default Dashboard
