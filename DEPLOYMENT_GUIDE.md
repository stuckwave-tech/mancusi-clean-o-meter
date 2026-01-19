# 🌐 Webhosting Deployment Anleitung

## ⚠️ Problem

Port 8000 ist von extern blockiert. Der Hosting-Provider erlaubt nur Zugriff über Port 80 (HTTP) oder 443 (HTTPS).

## ✅ Lösung: Dateien über File Manager deployen

### Schritt 1: Finde dein Web-Root Verzeichnis

In deinem Hosting Control Panel (Plesk/cPanel):

1. Öffne **File Manager**: `ae8e5.webhosting.systems/amb/file-manager`
2. Suche nach einem dieser Verzeichnisse:
   - `httpdocs` (Plesk)
   - `public_html` (cPanel)
   - `www`
   - `html`

### Schritt 2: Kopiere die Dateien

**Option A: Über File Manager (GUI)**

1. Gehe im File Manager zu: `/home/hosting209865/webapp/`
2. Wähle ALLE Dateien und Ordner aus:
   - ✅ `index.html`
   - ✅ `api/` (Ordner)
   - ✅ `js/` (Ordner)
   - ✅ `styles/` (Ordner)
   - ✅ `public/` (Ordner)
   - ✅ `README.md`
   - ❌ NICHT: `.git`, `backend`, `frontend`, `create_repo.sh`

3. **Kopieren** (nicht verschieben!)
4. Navigiere zu deinem Web-Root (z.B. `httpdocs`)
5. **Einfügen**

**Option B: Über SSH/Terminal**

```bash
# Finde Web-Root
cd /home/hosting209865
find . -name "httpdocs" -o -name "public_html" -o -name "www"

# Angenommen Web-Root ist gefunden, z.B. httpdocs:
# Kopiere Dateien
cp -r /home/hosting209865/webapp/index.html /pfad/zu/httpdocs/
cp -r /home/hosting209865/webapp/api /pfad/zu/httpdocs/
cp -r /home/hosting209865/webapp/js /pfad/zu/httpdocs/
cp -r /home/hosting209865/webapp/styles /pfad/zu/httpdocs/
cp -r /home/hosting209865/webapp/public /pfad/zu/httpdocs/
cp /home/hosting209865/webapp/README.md /pfad/zu/httpdocs/
```

### Schritt 3: Teste die Website

Nach dem Kopieren, öffne im Browser:

```
http://hosting209865.ae8e5.netcup.net
```

Oder deine eigene Domain, falls konfiguriert.

---

## 🔧 Alternative: Symbolic Link erstellen

Wenn du SSH-Zugriff hast:

```bash
# Finde Web-Root
cd /home/hosting209865
ls -la

# Erstelle Symlink (Beispiel für httpdocs)
ln -s /home/hosting209865/webapp /home/hosting209865/httpdocs

# ODER wenn httpdocs schon existiert:
cd httpdocs
ln -s /home/hosting209865/webapp/* .
```

---

## 📋 Welche Dateien kopieren?

### ✅ MUSS kopiert werden:

```
webapp/
├── index.html          # Haupt-HTML
├── api/                # PHP Backend
│   ├── vehicles.php
│   ├── inspections.php
│   └── standards.php
├── js/                 # JavaScript
│   ├── app.js
│   └── api.js
├── styles/             # CSS
│   └── main.css
└── public/             # Assets
    └── assets/
        ├── images/
        └── pdfs/
```

### ❌ NICHT kopieren:

```
- .git/                 # Git Repository
- backend/              # Node.js Backup
- frontend/             # React Backup  
- *.md                  # Dokumentation (optional)
- create_repo.sh        # Script
- package.json          # NPM Config
```

---

## 🌐 Domain/URL herausfinden

### Methode 1: Control Panel

1. Gehe zu deinem Hosting Control Panel
2. Suche nach "Domains" oder "Websites"
3. Notiere die URL (z.B. `hosting209865.ae8e5.netcup.net`)

### Methode 2: SSH

```bash
# Zeige Apache/Nginx Config
cat /etc/apache2/sites-enabled/* 2>/dev/null | grep ServerName
cat /etc/nginx/sites-enabled/* 2>/dev/null | grep server_name

# Oder suche in Plesk
cat /var/www/vhosts/*/conf/httpd.conf 2>/dev/null | grep ServerName
```

---

## ✅ Nach dem Deployment

1. **Teste die Website:**
   - Öffne: `http://DEINE-DOMAIN/`
   - Dashboard sollte laden
   - API teste: `http://DEINE-DOMAIN/api/vehicles.php`

2. **Prüfe Berechtigungen:**
   ```bash
   # PHP Dateien müssen ausführbar sein
   chmod 644 *.php
   chmod 755 api/
   ```

3. **Fehlersuche:**
   - Prüfe Apache/PHP Error Log
   - Stelle sicher `.htaccess` korrekt ist (falls benötigt)

---

## 🔐 .htaccess (Optional)

Erstelle `.htaccess` im Web-Root für bessere URLs:

```apache
# /home/hosting209865/httpdocs/.htaccess

RewriteEngine On

# API Umleitung
RewriteRule ^api/(.*)$ api/$1 [L]

# Alle anderen Requests zu index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]

# PHP Settings
php_value upload_max_filesize 10M
php_value post_max_size 10M
php_value memory_limit 256M

# Sicherheit
Options -Indexes
```

---

## 📞 Support

Wenn du Probleme hast:

1. **Kontaktiere deinen Hosting-Provider** (Netcup)
2. Frage nach:
   - Web-Root Verzeichnis Pfad
   - Domain/Subdomain für diesen Account
   - PHP Version (sollte 8.0+ sein)

---

## 🎯 Zusammenfassung

1. ✅ Dateien liegen in: `/home/hosting209865/webapp/`
2. ⚠️ Port 8000 ist extern blockiert
3. 🎯 Kopiere Dateien ins Web-Root (`httpdocs` oder `public_html`)
4. 🌐 Greife über HTTP/HTTPS zu
5. ✅ GitHub Code ist verfügbar: https://github.com/stuckwave-tech/mancusi-clean-o-meter

---

**NÄCHSTER SCHRITT:** Finde dein Web-Root Verzeichnis im File Manager und kopiere die Dateien!
