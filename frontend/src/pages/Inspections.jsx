import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaClipboardCheck, FaEye, FaFilter } from 'react-icons/fa'
import api from '../services/api'
import './Inspections.css'

const Inspections = () => {
  const [filterRating, setFilterRating] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const { data: inspections, isLoading, error } = useQuery({
    queryKey: ['inspections'],
    queryFn: api.getInspections
  })

  if (isLoading) {
    return <div className="loading">Lädt Inspektionen...</div>
  }

  if (error) {
    return <div className="error">Fehler beim Laden der Inspektionen: {error.message}</div>
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

  const getStatusClass = (status) => {
    switch (status) {
      case 'Abgeschlossen':
        return 'success'
      case 'In Bearbeitung':
        return 'warning'
      case 'Offen':
        return 'info'
      default:
        return 'info'
    }
  }

  let filteredInspections = inspections?.data || []
  
  if (filterRating) {
    filteredInspections = filteredInspections.filter(i => i.overallRating === filterRating)
  }
  
  if (filterStatus) {
    filteredInspections = filteredInspections.filter(i => i.status === filterStatus)
  }

  return (
    <div className="inspections-page">
      <div className="page-header">
        <h1>Inspektionen</h1>
        <button className="btn btn-primary">
          <FaClipboardCheck /> Neue Inspektion
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <FaFilter />
          <select 
            className="filter-select"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="">Alle Bewertungen</option>
            <option value="Akzeptabel">Akzeptabel</option>
            <option value="Reinigung erforderlich">Reinigung erforderlich</option>
            <option value="Inakzeptabel">Inakzeptabel</option>
          </select>
        </div>

        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Alle Status</option>
          <option value="Offen">Offen</option>
          <option value="In Bearbeitung">In Bearbeitung</option>
          <option value="Abgeschlossen">Abgeschlossen</option>
        </select>
      </div>

      <div className="inspections-list">
        {filteredInspections.map((inspection) => (
          <div key={inspection.id} className="inspection-card">
            <div className="inspection-main">
              <div className="inspection-info">
                <div className="inspection-title">
                  <h3>{inspection.licensePlate}</h3>
                  <span className={`badge badge-${getRatingClass(inspection.overallRating)}`}>
                    {inspection.overallRating}
                  </span>
                </div>
                
                <div className="inspection-meta">
                  <span>Inspektor: <strong>{inspection.inspector}</strong></span>
                  <span>Typ: <strong>{inspection.type}</strong></span>
                  <span>Datum: <strong>{new Date(inspection.date).toLocaleDateString('de-DE')}</strong></span>
                </div>

                {inspection.notes && (
                  <p className="inspection-notes">{inspection.notes}</p>
                )}
              </div>

              <div className="inspection-status">
                <span className={`badge badge-${getStatusClass(inspection.status)}`}>
                  {inspection.status}
                </span>
              </div>
            </div>

            <div className="inspection-details">
              <div className="detail-section">
                <h4>Innenraum</h4>
                <div className="detail-grid">
                  <DetailItem label="Fußraum" data={inspection.cleanliness.interior.floor} />
                  <DetailItem label="Sitze" data={inspection.cleanliness.interior.seats} />
                  <DetailItem label="Dashboard" data={inspection.cleanliness.interior.dashboard} />
                  <DetailItem label="Kofferraum" data={inspection.cleanliness.interior.trunk} />
                </div>
              </div>

              <div className="detail-section">
                <h4>Außenbereich</h4>
                <div className="detail-grid">
                  <DetailItem label="Karosserie" data={inspection.cleanliness.exterior.body} />
                  <DetailItem label="Räder" data={inspection.cleanliness.exterior.wheels} />
                  <DetailItem label="Fenster" data={inspection.cleanliness.exterior.windows} />
                </div>
              </div>

              {inspection.actionRequired && (
                <div className="action-required">
                  <h4>Erforderliche Maßnahmen</h4>
                  <div className="actions">
                    {inspection.actionRequired.cleaning && (
                      <span className="action-badge">Reinigung</span>
                    )}
                    {inspection.actionRequired.repair && (
                      <span className="action-badge">Reparatur</span>
                    )}
                    {inspection.actionRequired.detailing && (
                      <span className="action-badge">Aufbereitung</span>
                    )}
                  </div>
                  {inspection.estimatedCost && (
                    <p className="cost">Geschätzte Kosten: <strong>{inspection.estimatedCost}€</strong></p>
                  )}
                </div>
              )}
            </div>

            <div className="inspection-actions">
              <button className="btn btn-secondary">
                <FaEye /> Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInspections.length === 0 && (
        <div className="no-data">
          <FaClipboardCheck size={48} />
          <p>Keine Inspektionen gefunden</p>
        </div>
      )}
    </div>
  )
}

const DetailItem = ({ label, data }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Sauber':
        return 'clean'
      case 'Verschmutzt':
        return 'dirty'
      case 'Stark verschmutzt':
        return 'very-dirty'
      default:
        return ''
    }
  }

  return (
    <div className="detail-item">
      <span className="detail-label">{label}:</span>
      <span className={`detail-status ${getStatusClass(data.status)}`}>
        {data.status}
      </span>
      {data.notes && <small className="detail-notes">{data.notes}</small>}
    </div>
  )
}

export default Inspections
