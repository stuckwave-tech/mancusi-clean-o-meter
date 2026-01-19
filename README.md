# Autohaus Vatterott - Qualitätsmanagement-System

Ein Full-Stack Web-Anwendung für das Qualitätsmanagement und die Verwaltung von Vorführwagen, Leihfahrzeugen und internen Fahrten bei Autohaus Vatterott.

## 🚗 Überblick

Dieses System hilft bei der Verwaltung und Einhaltung von Sauberkeitsstandards für Fahrzeuge. Es ermöglicht:

- **Fahrzeugverwaltung**: Übersicht über alle Demo-, Vorführ- und Leihwagen
- **Inspektionen**: Dokumentation von Fahrzeugzuständen bei Abholung und Rückgabe
- **Qualitätsstandards**: Klare Definition der Sauberkeitsanforderungen
- **Reporting**: Statistiken und Auswertungen über Fahrzeugzustände

## 🏗️ Projekt-Struktur

```
webapp/
├── backend/          # Node.js/Express API
│   ├── models/       # Datenmodelle
│   ├── routes/       # API-Routen
│   ├── controllers/  # Business Logic
│   └── server.js     # Express Server
├── frontend/         # React Frontend
│   ├── src/
│   │   ├── components/  # React-Komponenten
│   │   ├── pages/       # Seiten
│   │   ├── services/    # API-Services
│   │   └── styles/      # CSS-Dateien
│   └── index.html
└── public/
    └── assets/       # Bilder und PDFs
```

## 🚀 Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Bearbeite .env und füge deine Konfiguration hinzu
npm run dev
```

Das Backend läuft auf Port 5000.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Das Frontend läuft auf Port 3000.

## 🔧 Technologien

### Backend
- **Node.js** - Runtime Environment
- **Express** - Web Framework
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Helmet** - Security
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React 18** - UI Framework
- **React Router** - Routing
- **TanStack Query** - Data Fetching
- **Axios** - HTTP Client
- **React Icons** - Icons
- **Vite** - Build Tool

## 📋 Features

### Fahrzeugverwaltung
- Übersicht aller Fahrzeuge
- Filterung nach Status, Marke und Typ
- Detailansicht mit allen Informationen
- Bearbeiten und Löschen von Fahrzeugen

### Inspektionssystem
- Dokumentation bei Abholung und Rückgabe
- Bewertung von Innen- und Außenbereich
- Fotodokumentation
- Schadenserfassung
- Kostenabschätzung für Reinigung/Reparatur

### Qualitätsstandards
- Definition von Sauberkeitsanforderungen
- Kategorisierung (Innenraum, Außenbereich, Allgemein)
- Visualisierung mit Bildern
- Download von PDF-Dokumentationen

## 🎨 Design

Das Design orientiert sich am Corporate Design von Autohaus Vatterott:

- **Primärfarbe**: #001e50 (Dunkelblau)
- **Sekundärfarbe**: #0066cc (Blau)
- **Akzentfarbe**: #ff6b00 (Orange)

## 📱 Responsive Design

Die Anwendung ist vollständig responsive und funktioniert auf:
- Desktop (1200px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

## 🔐 Sicherheit

- Helmet für HTTP-Header-Sicherheit
- CORS-Konfiguration
- JWT für Authentication
- Passwort-Hashing mit bcrypt
- Input-Validierung

## 📊 API-Endpunkte

### Fahrzeuge
- `GET /api/vehicles` - Alle Fahrzeuge
- `GET /api/vehicles/:id` - Einzelnes Fahrzeug
- `POST /api/vehicles` - Neues Fahrzeug
- `PUT /api/vehicles/:id` - Fahrzeug aktualisieren
- `DELETE /api/vehicles/:id` - Fahrzeug löschen

### Inspektionen
- `GET /api/inspections` - Alle Inspektionen
- `GET /api/inspections/:id` - Einzelne Inspektion
- `POST /api/inspections` - Neue Inspektion
- `PUT /api/inspections/:id` - Inspektion aktualisieren
- `GET /api/inspections/stats/summary` - Statistiken

### Standards
- `GET /api/standards` - Alle Standards
- `GET /api/standards/:id` - Einzelner Standard

### Users
- `GET /api/users` - Alle Benutzer
- `GET /api/users/:id` - Einzelner Benutzer
- `POST /api/users` - Neuer Benutzer

## 🤝 Qualitätsanspruch

**Das Problem**: Vorführwagen werden stark verschmutzt zurückgegeben. Der aktuelle Zustand ist nicht repräsentativ und inakzeptabel.

**Die Lösung**: Jedes Fahrzeug muss sauber zurückgegeben werden. Dies gilt für alle:
- ✅ Kunden
- ✅ Mitarbeiter  
- ✅ Interne Fahrten

### Sauberkeitsstandards

**Innenraum reinigen**:
- Müll entfernen
- Fußräume und Matten reinigen
- Grobe Verschmutzungen beseitigen

**Äußeres prüfen**:
- Ordentlicher und vorzeigbarer Eindruck
- Bei Bedarf: Professionelle Reinigung

## 📄 Lizenz

© 2024 Autohaus Vatterott. Alle Rechte vorbehalten.

## 🌐 Kontakt

**Autohaus Vatterott**
- Website: [www.autohaus-vatterott.de](https://www.autohaus-vatterott.de)
