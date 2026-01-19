# 🚀 Live-Entwicklung Setup Guide

## 🎯 Ziel: Änderungen sofort auf mancusi.visiodronix.de sehen

---

## ✅ **Option 1: Direct Edit + Auto-Sync** (EMPFOHLEN)

### Konzept:
Arbeite direkt im `/webapp/` Verzeichnis und synchronisiere automatisch zu `httpdocs/`

### Setup:

#### 1. Watch Script erstellen:

```bash
cd /home/hosting209865/webapp

cat > watch_and_sync.sh << 'EOF'
#!/bin/bash

SOURCE="/home/hosting209865/webapp"
TARGET="/home/hosting209865/../../mancusi.visiodronix.de/httpdocs"

echo "🔄 Auto-Sync aktiviert!"
echo "Überwache: $SOURCE"
echo "Ziel: $TARGET"
echo ""
echo "Drücke CTRL+C zum Beenden"
echo ""

# Initiale Sync
rsync -av --exclude='.git' --exclude='backend' --exclude='frontend' \
  --exclude='*.md' --exclude='create_repo.sh' --exclude='*.sh' \
  --exclude='.gitignore' --exclude='package.json' \
  "$SOURCE/" "$TARGET/"

echo "✅ Initiale Synchronisation abgeschlossen"
echo "👀 Überwache Änderungen..."
echo ""

# Überwache Änderungen
while true; do
  inotifywait -r -e modify,create,delete,move \
    --exclude '.git|backend|frontend|node_modules|.*.swp' \
    "$SOURCE" 2>/dev/null && \
  {
    echo "📝 Änderung erkannt! Synchronisiere..."
    rsync -av --exclude='.git' --exclude='backend' --exclude='frontend' \
      --exclude='*.md' --exclude='create_repo.sh' --exclude='*.sh' \
      --exclude='.gitignore' --exclude='package.json' \
      "$SOURCE/" "$TARGET/"
    echo "✅ Sync abgeschlossen um $(date '+%H:%M:%S')"
    echo ""
  }
done
EOF

chmod +x watch_and_sync.sh
```

#### 2. Watch Script starten:

```bash
cd /home/hosting209865/webapp
./watch_and_sync.sh
```

**Alternative ohne inotifywait (wenn nicht verfügbar):**

```bash
cat > simple_sync.sh << 'EOF'
#!/bin/bash
SOURCE="/home/hosting209865/webapp"
TARGET="/home/hosting209865/../../mancusi.visiodronix.de/httpdocs"

echo "🔄 Auto-Sync alle 5 Sekunden"
echo "Drücke CTRL+C zum Beenden"

while true; do
  rsync -a --exclude='.git' --exclude='backend' --exclude='frontend' \
    --exclude='*.md' --exclude='*.sh' \
    "$SOURCE/" "$TARGET/" > /dev/null 2>&1
  sleep 5
done
EOF

chmod +x simple_sync.sh
./simple_sync.sh &
```

---

## ✅ **Option 2: Symbolic Link** (Einfachste Methode)

### Konzept:
Verlinke direkt zum Entwicklungsverzeichnis

```bash
# Backup aktuelles httpdocs
cd /home/hosting209865/../../mancusi.visiodronix.de/
mv httpdocs httpdocs.backup

# Erstelle Symlink zu webapp
ln -s /home/hosting209865/webapp httpdocs

# ODER für selektive Links:
mkdir httpdocs
cd httpdocs
ln -s /home/hosting209865/webapp/index.html
ln -s /home/hosting209865/webapp/api
ln -s /home/hosting209865/webapp/js
ln -s /home/hosting209865/webapp/styles
ln -s /home/hosting209865/webapp/public
```

**Vorteil:** Änderungen sind sofort live!  
**Nachteil:** .git Ordner könnte sichtbar sein (durch .htaccess verhindern)

---

## ✅ **Option 3: Git-basierter Workflow** (Professionell)

### Setup:

#### 1. Git Hook erstellen:

```bash
cd /home/hosting209865/webapp/.git/hooks

cat > post-commit << 'EOF'
#!/bin/bash
TARGET="/home/hosting209865/../../mancusi.visiodronix.de/httpdocs"
SOURCE="/home/hosting209865/webapp"

echo "🚀 Deploying nach mancusi.visiodronix.de..."

rsync -av --delete --exclude='.git' --exclude='backend' --exclude='frontend' \
  --exclude='*.md' --exclude='*.sh' --exclude='node_modules' \
  "$SOURCE/" "$TARGET/"

echo "✅ Deployment abgeschlossen!"
EOF

chmod +x post-commit
```

#### 2. Workflow:

```bash
# Entwickle in /webapp/
vim index.html  # oder dein Editor

# Committe Änderungen
git add .
git commit -m "feat: Added feature X"
# → Automatisch deployed!

# Optional: Push zu GitHub
git push origin genspark_ai_developer
```

---

## ✅ **Option 4: VS Code Remote SSH** (Komfortabelste Lösung)

### Setup:

#### 1. VS Code installieren (falls nicht vorhanden)

#### 2. Remote SSH Extension installieren

#### 3. SSH Config:

```
Host mancusi-dev
    HostName ae8e5.webhosting.systems
    User hosting209865
    IdentityFile ~/.ssh/id_rsa
    LocalForward 8001 localhost:8000
```

#### 4. In VS Code:
- CMD+Shift+P → "Remote-SSH: Connect to Host"
- Wähle "mancusi-dev"
- Öffne Ordner: `/home/hosting209865/webapp`

#### 5. Live Preview Extension installieren

#### 6. Kombiniere mit Watch Script:
```bash
# Im VS Code Terminal:
cd /home/hosting209865/webapp
./watch_and_sync.sh
```

**Jetzt:**
- ✅ Editiere Dateien in VS Code
- ✅ Änderungen werden automatisch synced
- ✅ Aktualisiere Browser: https://mancusi.visiodronix.de
- ✅ Siehe Änderungen sofort!

---

## ✅ **Option 5: Development Branch mit Subdomain**

### Setup zweite Subdomain für Entwicklung:

#### 1. Erstelle neue Subdomain:
`dev.mancusi.visiodronix.de` oder `staging.mancusi.visiodronix.de`

#### 2. Verlinke direkt zu webapp:
```bash
# In Plesk/Control Panel
# Setze httpdocs für dev.mancusi.visiodronix.de auf:
/home/hosting209865/webapp
```

#### 3. Workflow:
- **Entwicklung:** http://dev.mancusi.visiodronix.de
- **Production:** https://mancusi.visiodronix.de

```bash
# Wenn zufrieden, sync nach Production:
rsync -av /home/hosting209865/webapp/ \
  /home/hosting209865/../../mancusi.visiodronix.de/httpdocs/
```

---

## 🛠️ **Mein Empfohlener Setup:**

### Für dich optimal: **Option 1 + 4 Kombination**

**Setup:**

1. **Watch Script im Hintergrund:**
```bash
cd /home/hosting209865/webapp
nohup ./simple_sync.sh > sync.log 2>&1 &
```

2. **VS Code Remote SSH:**
- Verbinde zu Server
- Editiere Dateien
- Browser-Tab mit https://mancusi.visiodronix.de offen

3. **Git für Backups:**
```bash
# Nach größeren Änderungen:
git add .
git commit -m "feat: Description"
git push origin genspark_ai_developer
```

**Workflow:**
```
1. Editiere in VS Code
   ↓
2. Speichere (CTRL+S)
   ↓
3. Watch Script synced automatisch (5 Sek)
   ↓
4. Aktualisiere Browser (F5)
   ↓
5. Siehe Änderungen live!
```

---

## 🔧 **Zusätzliche Tools:**

### Browser Live Reload (Optional):

#### 1. LiveReload Chrome Extension
- Installiere: https://chrome.google.com/webstore (LiveReload)

#### 2. Browser-Sync (falls Node verfügbar):
```bash
npm install -g browser-sync
browser-sync start --proxy "mancusi.visiodronix.de" --files "**/*"
```

### Hot Reload für API:

```bash
# PHP Development Server mit Auto-Reload
cd /home/hosting209865/webapp
php -S localhost:8080 -t . &

# Browser-Sync Proxy
browser-sync start --proxy "localhost:8080" --files "**/*.php,**/*.js,**/*.css"
```

---

## 📝 **Quick Commands Cheat Sheet:**

```bash
# Watch Script starten
cd /home/hosting209865/webapp && ./simple_sync.sh &

# Watch Script stoppen
killall simple_sync.sh

# Manueller Sync
rsync -av /home/hosting209865/webapp/ \
  /home/hosting209865/../../mancusi.visiodronix.de/httpdocs/ \
  --exclude='.git' --exclude='*.md'

# Log anschauen
tail -f /home/hosting209865/webapp/sync.log

# Git Workflow
git add .
git commit -m "Update: ..."
git push origin genspark_ai_developer
```

---

## 🎯 **Best Practice Workflow:**

### Tägliche Entwicklung:

```bash
# Morgens:
cd /home/hosting209865/webapp
./simple_sync.sh &  # Starte Auto-Sync

# Entwickle den ganzen Tag...
# Änderungen sind automatisch live

# Abends:
git add .
git commit -m "Daily progress: Features X, Y, Z"
git push origin genspark_ai_developer
killall simple_sync.sh  # Stoppe Auto-Sync
```

### Feature-Entwicklung:

```bash
# Neues Feature starten:
git checkout -b feature/neue-funktion

# Entwickle...
# Teste auf https://mancusi.visiodronix.de

# Wenn fertig:
git add .
git commit -m "feat: Neue Funktion implementiert"
git checkout genspark_ai_developer
git merge feature/neue-funktion
git push origin genspark_ai_developer

# Erstelle PR für master
```

---

## 🚀 **SCHNELLSTART:**

Führe JETZT aus:

```bash
cd /home/hosting209865/webapp

# Erstelle Simple Sync Script
cat > sync.sh << 'EOF'
#!/bin/bash
while true; do
  rsync -a --exclude='.git' --exclude='backend' --exclude='frontend' \
    /home/hosting209865/webapp/ \
    /home/hosting209865/../../mancusi.visiodronix.de/httpdocs/ > /dev/null 2>&1
  sleep 5
done
EOF

chmod +x sync.sh

# Starte im Hintergrund
nohup ./sync.sh > sync.log 2>&1 &

echo "✅ Auto-Sync aktiv!"
echo "📝 Editiere Dateien in /home/hosting209865/webapp/"
echo "🌐 Änderungen erscheinen auf https://mancusi.visiodronix.de"
echo "📊 Log: tail -f /home/hosting209865/webapp/sync.log"
echo "🛑 Stoppen: killall sync.sh"
```

Danach kannst du sofort entwickeln! 🎨

---

**Welche Option möchtest du verwenden? Ich richte sie für dich ein!**
