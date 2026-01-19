import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaCar, FaEdit, FaTrash } from 'react-icons/fa'
import api from '../services/api'
import './Vehicles.css'

const Vehicles = () => {
  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: api.getVehicles
  })

  if (isLoading) {
    return <div className="loading">Lädt Fahrzeuge...</div>
  }

  if (error) {
    return <div className="error">Fehler beim Laden der Fahrzeuge: {error.message}</div>
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Verfügbar':
        return 'success'
      case 'Verliehen':
        return 'warning'
      case 'In Inspektion':
      case 'In Reinigung':
        return 'info'
      case 'Nicht Verfügbar':
        return 'danger'
      default:
        return 'info'
    }
  }

  return (
    <div className="vehicles-page">
      <div className="page-header">
        <h1>Fahrzeugverwaltung</h1>
        <button className="btn btn-primary">
          <FaCar /> Neues Fahrzeug
        </button>
      </div>

      <div className="filters">
        <select className="filter-select">
          <option value="">Alle Status</option>
          <option value="Verfügbar">Verfügbar</option>
          <option value="Verliehen">Verliehen</option>
          <option value="In Inspektion">In Inspektion</option>
        </select>

        <select className="filter-select">
          <option value="">Alle Marken</option>
          <option value="VW">VW</option>
          <option value="Audi">Audi</option>
          <option value="Skoda">Skoda</option>
        </select>

        <select className="filter-select">
          <option value="">Alle Typen</option>
          <option value="Demo">Demo</option>
          <option value="Vorführwagen">Vorführwagen</option>
          <option value="Leihwagen">Leihwagen</option>
        </select>
      </div>

      <div className="vehicles-grid">
        {vehicles?.data?.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-card">
            {vehicle.images && vehicle.images.length > 0 && (
              <div className="vehicle-image">
                <img src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} />
              </div>
            )}
            
            <div className="vehicle-content">
              <div className="vehicle-header">
                <h3>{vehicle.brand} {vehicle.model}</h3>
                <span className={`badge badge-${getStatusClass(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="vehicle-info">
                <div className="info-row">
                  <span className="label">Kennzeichen:</span>
                  <span className="value license">{vehicle.licensePlate}</span>
                </div>
                <div className="info-row">
                  <span className="label">Typ:</span>
                  <span className="value">{vehicle.type}</span>
                </div>
                <div className="info-row">
                  <span className="label">Baujahr:</span>
                  <span className="value">{vehicle.year}</span>
                </div>
                <div className="info-row">
                  <span className="label">Kilometerstand:</span>
                  <span className="value">{vehicle.mileage?.toLocaleString('de-DE')} km</span>
                </div>
                {vehicle.color && (
                  <div className="info-row">
                    <span className="label">Farbe:</span>
                    <span className="value">{vehicle.color}</span>
                  </div>
                )}
              </div>

              <div className="vehicle-actions">
                <button className="btn-icon" title="Bearbeiten">
                  <FaEdit />
                </button>
                <button className="btn-icon danger" title="Löschen">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!vehicles || vehicles.data.length === 0) && (
        <div className="no-data">
          <FaCar size={48} />
          <p>Keine Fahrzeuge gefunden</p>
        </div>
      )}
    </div>
  )
}

export default Vehicles
