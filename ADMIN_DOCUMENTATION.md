# Admin Backend - Dokumentation

## 🎉 Admin-Bereich erfolgreich erstellt!

Der vollständige Admin-Bereich für das Autohaus Vatterott Qualitätsmanagement-System ist jetzt live!

## 🌐 Zugriff

**Live Admin URL:** https://mancusi.visiodronix.de/admin/login.php

### Standard Login-Daten
- **E-Mail:** admin@vatterott.de
- **Passwort:** admin123

⚠️ **WICHTIG:** Bitte ändere das Passwort nach dem ersten Login!

---

## ✨ Features

### 🔐 Sicherheit
- ✅ Session-basierte Authentifizierung
- ✅ Passwort-Hashing mit bcrypt
- ✅ CSRF-Token-Unterstützung vorbereitet
- ✅ Login-Schutz für alle Admin-Seiten
- ✅ Sichere Logout-Funktionalität

### 📊 Dashboard
- ✅ Echtzeit-Statistiken (Fahrzeuge, Inspektionen, Benutzer)
- ✅ Neueste Inspektionen Übersicht
- ✅ Verfügbare Fahrzeuge Liste
- ✅ Schnellaktionen für häufige Aufgaben
- ✅ Responsive Design

### 🚗 Fahrzeugverwaltung
- ✅ Vollständiges CRUD (Create, Read, Update, Delete)
- ✅ Modal-basierte Bearbeitung
- ✅ Suchfunktion (Kennzeichen, Marke, Modell)
- ✅ Status-Filter
- ✅ Detaillierte Fahrzeuginformationen
- ✅ Kilometerstand-Tracking

### 📋 Inspektionsverwaltung
- ✅ Übersicht aller Inspektionen
- ✅ Filterfunktionen
- ✅ Bewertungsanzeige
- ✅ Prüfer-Informationen
- ✅ Datums-Formatierung

### 👥 Benutzerverwaltung
- ✅ Admin-Benutzer verwalten
- ✅ Rollen-System vorbereitet
- ✅ E-Mail-Verwaltung
- ✅ Erstellungsdatum anzeigen

### ⚙️ Einstellungen
- ✅ Profil-Informationen
- ✅ System-Informationen (PHP Version, Server)
- ✅ Versions-Anzeige

---

## 📁 Projektstruktur

```
admin/
├── assets/
│   ├── css/
│   │   └── admin.css        # Admin UI Styling
│   └── js/
│       └── admin.js         # Admin JavaScript Utilities
├── includes/
│   └── config.php           # Konfiguration & Auth-Funktionen
├── pages/
│   ├── vehicles.php         # Fahrzeugverwaltung
│   ├── inspections.php      # Inspektionsverwaltung
│   ├── users.php            # Benutzerverwaltung
│   └── settings.php         # Einstellungen
├── index.php                # Dashboard
├── login.php                # Login-Seite
└── logout.php               # Logout-Handler
```

---

## 🔧 Technische Details

### Backend
- **Sprache:** PHP 8.3+
- **Session-Management:** Native PHP Sessions
- **Passwort-Hashing:** bcrypt (PASSWORD_BCRYPT)
- **Daten-Speicherung:** JSON-Dateien (data/admin_users.json)

### Frontend
- **Framework:** Vanilla JavaScript
- **CSS:** Custom Admin Stylesheet
- **Icons:** Font Awesome 6.4
- **API Integration:** Fetch API

### Sicherheit
- Session-basierte Authentifizierung
- Password-Hashing mit bcrypt
- XSS-Schutz durch htmlspecialchars()
- CSRF-Token-Generierung vorbereitet
- requireLogin() Middleware für geschützte Seiten

---

## 🚀 Deployment

Das Admin-System ist bereits deployed:

```bash
cd /home/hosting209865/webapp
./deploy.sh
```

Das Deploy-Script kopiert automatisch:
- ✅ Admin-Ordner komplett
- ✅ Alle PHP-Dateien
- ✅ Assets (CSS, JavaScript)
- ✅ Erstellt data-Verzeichnis für Benutzerdaten

---

## 📖 API-Integration

Der Admin-Bereich nutzt die bestehenden APIs:
- `/api/vehicles.php` - Fahrzeugdaten
- `/api/inspections.php` - Inspektionsdaten
- `/api/standards.php` - Qualitätsstandards

### JavaScript API Helper

```javascript
// Verfügbar als AdminAPI
await AdminAPI.get('/vehicles.php');
await AdminAPI.post('/vehicles.php', data);
await AdminAPI.put('/vehicles.php', data);
await AdminAPI.delete('/vehicles.php');
```

---

## 🎨 UI-Komponenten

### Modal-System
```javascript
const modal = new Modal('modalId');
modal.open();
modal.close();
```

### Alert-System
```javascript
showAlert('Nachricht', 'success'); // success, danger, warning, info
```

### Validierung
```javascript
validateForm(formElement); // Returns true/false
```

### Status-Badges
```javascript
getStatusBadge('Verfügbar'); // Returns HTML badge
```

---

## 👤 Benutzerverwaltung

### Standard-Admin erstellen
Der erste Admin-Benutzer wird automatisch erstellt:
- E-Mail: admin@vatterott.de
- Passwort: admin123 (gehashed)
- Rolle: admin

### Neue Benutzer hinzufügen
Nutze die Benutzerverwaltung im Admin oder:
```php
createAdminUser($email, $password, $firstName, $lastName, $role);
```

---

## 🔒 Passwort ändern

Im Code (admin/includes/config.php):
```php
updateAdminUser($userId, [
    'password' => 'neuesPasswort123'
]);
```

Das Passwort wird automatisch mit bcrypt gehashed.

---

## 📊 Datenbank-Alternative

Aktuell nutzt das System JSON-Dateien für Benutzerdaten. 
Für Production empfohlen:

### Migration zu MySQL/MariaDB
1. Erstelle Datenbank-Tabellen
2. Ersetze JSON-Funktionen in config.php
3. Nutze PDO für sichere Queries

---

## 🧪 Testing

### Admin Login testen
```bash
curl -k https://mancusi.visiodronix.de/admin/login.php
```

### Dashboard API testen
```bash
curl -k https://mancusi.visiodronix.de/api/vehicles.php
```

---

## 📱 Responsive Design

Der Admin-Bereich ist vollständig responsive:
- ✅ Desktop (Sidebar + Content)
- ✅ Tablet (Anpassbare Layouts)
- ✅ Mobile (Hamburger Menu)

---

## 🎯 Nächste Schritte

### Empfohlene Erweiterungen:
1. **Datenbank-Migration** (MySQL/PostgreSQL)
2. **File-Upload-System** für Fahrzeugbilder
3. **E-Mail-Benachrichtigungen**
4. **Erweiterte Berechtigungen** (Rollen & Permissions)
5. **Audit-Log** (Änderungsverfolgung)
6. **Export-Funktionen** (PDF, Excel)
7. **Backup-System**
8. **Two-Factor Authentication (2FA)**

---

## 📞 Support & Wartung

### Häufige Probleme

**Problem:** Login funktioniert nicht
**Lösung:** Prüfe ob data-Verzeichnis existiert und beschreibbar ist

**Problem:** Session-Fehler
**Lösung:** Prüfe PHP session.save_path und Berechtigungen

**Problem:** API liefert keine Daten
**Lösung:** Prüfe CORS-Header und API-Endpunkte

---

## 📝 Changelog

### Version 1.0.0 (2026-01-19)
- ✅ Initial Release
- ✅ Login-System mit bcrypt
- ✅ Dashboard mit Statistiken
- ✅ Fahrzeugverwaltung (CRUD)
- ✅ Inspektionsverwaltung
- ✅ Benutzerverwaltung
- ✅ Settings-Seite
- ✅ Responsive Admin UI
- ✅ API-Integration
- ✅ Deployment auf Live-Server

---

## 🏆 Credits

Entwickelt für: **Autohaus Vatterott**
System: **Qualitätsmanagement-System**
Version: **1.0.0**
Datum: **19. Januar 2026**

---

## 📄 Lizenz

Proprietär - Alle Rechte vorbehalten
© 2026 Autohaus Vatterott

