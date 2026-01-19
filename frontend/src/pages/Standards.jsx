import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import api from '../services/api'
import './Standards.css'

const Standards = () => {
  const { data: standards, isLoading, error } = useQuery({
    queryKey: ['standards'],
    queryFn: api.getStandards
  })

  if (isLoading) {
    return <div className="loading">Lädt Standards...</div>
  }

  if (error) {
    return <div className="error">Fehler beim Laden der Standards: {error.message}</div>
  }

  const getLevelClass = (level) => {
    switch (level) {
      case 'Muss':
        return 'must'
      case 'Sollte':
        return 'should'
      case 'Optional':
        return 'optional'
      default:
        return ''
    }
  }

  return (
    <div className="standards-page">
      <div className="page-header">
        <h1>Qualitätsstandards</h1>
        <p className="subtitle">
          Unser Qualitätsanspruch: Rückgabe von Vorführwagen
        </p>
      </div>

      <div className="hero-section">
        <div className="hero-content">
          <h2>Das Problem: Inakzeptabler Zustand</h2>
          <p>
            Vorführwagen werden stark verschmutzt zurückgegeben. 
            Der aktuelle Zustand der Fahrzeuge ist nicht repräsentativ und inakzeptabel.
          </p>
        </div>
        <div className="hero-content">
          <h2>Die Lösung: Unser Sauberkeits-Standard</h2>
          <p>
            Jedes Fahrzeug muss sauber zurückgegeben werden. 
            Dies gilt für alle: Kunden, Mitarbeiter und interne Fahrten.
          </p>
        </div>
      </div>

      <div className="quality-image-section">
        <img 
          src="/assets/images/qualitaetsanspruch.jpg" 
          alt="Qualitätsanspruch Visualisierung"
          className="quality-comparison"
        />
      </div>

      <div className="standards-grid">
        {standards?.data?.map((standard) => (
          <div key={standard.id} className={`standard-card category-${standard.category.toLowerCase()}`}>
            <div className="standard-header">
              <div className="standard-icon">
                <FaStar />
              </div>
              <div>
                <span className="category-badge">{standard.category}</span>
                <h3>{standard.title}</h3>
              </div>
            </div>

            <p className="standard-description">{standard.description}</p>

            <div className="requirements-list">
              <h4>Anforderungen:</h4>
              {standard.requirements.map((req, index) => (
                <div key={index} className={`requirement-item ${getLevelClass(req.level)}`}>
                  <FaCheckCircle className="check-icon" />
                  <div className="requirement-content">
                    <span className="requirement-text">{req.item}</span>
                    <span className={`level-badge ${getLevelClass(req.level)}`}>
                      {req.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {standard.images && standard.images.length > 0 && (
              <div className="standard-images">
                {standard.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`${standard.title} Beispiel ${idx + 1}`}
                    className="standard-image"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card important-notice">
        <h2>Wichtige Hinweise für alle Fahrzeugnutzer</h2>
        <div className="notice-grid">
          <div className="notice-card">
            <h3>Vor der Rückgabe</h3>
            <ul>
              <li>Fahrzeug auf Verschmutzungen prüfen</li>
              <li>Innenraum aufräumen und reinigen</li>
              <li>Groben Schmutz entfernen</li>
              <li>Bei starker Verschmutzung: Waschanlage nutzen</li>
            </ul>
          </div>

          <div className="notice-card">
            <h3>Gilt für</h3>
            <ul>
              <li>✓ Alle Kunden</li>
              <li>✓ Alle Mitarbeiter</li>
              <li>✓ Interne Fahrten</li>
              <li>✓ Vorführfahrten</li>
            </ul>
          </div>

          <div className="notice-card">
            <h3>Bei Problemen</h3>
            <ul>
              <li>Qualitätssicherung kontaktieren</li>
              <li>Fotos dokumentieren</li>
              <li>Inspektion durchführen</li>
              <li>Professionelle Reinigung veranlassen</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card download-section">
        <h2>Dokumentation</h2>
        <p>Laden Sie unsere vollständigen Qualitätsstandards und Strategien herunter:</p>
        <div className="download-buttons">
          <a href="/assets/pdfs/praesentation.pdf" className="btn btn-primary" download>
            Präsentation herunterladen
          </a>
          <a href="/assets/pdfs/strategien.pdf" className="btn btn-secondary" download>
            Strategien herunterladen
          </a>
        </div>
      </div>
    </div>
  )
}

export default Standards
