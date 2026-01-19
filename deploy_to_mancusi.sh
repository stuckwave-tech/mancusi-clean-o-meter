#!/bin/bash
# Deployment Script für mancusi.visiodronix.de

echo "🚀 Autohaus Vatterott Deployment Script"
echo "========================================"
echo ""

# Quell-Verzeichnis
SOURCE="/home/hosting209865/webapp"

# Ziel-Verzeichnis - Bitte anpassen!
# Typische Plesk-Struktur:
TARGET="/var/www/vhosts/visiodronix.de/mancusi.visiodronix.de/httpdocs"

# Alternative Pfade zum Testen:
# TARGET="/home/hosting209865/vhosts/visiodronix.de/mancusi/httpdocs"
# TARGET="/usr/local/psa/home/vhosts/visiodronix.de/mancusi.visiodronix.de/httpdocs"

echo "📁 Quell-Verzeichnis: $SOURCE"
echo "📁 Ziel-Verzeichnis: $TARGET"
echo ""

# Prüfe ob Ziel existiert
if [ ! -d "$TARGET" ]; then
    echo "❌ ERROR: Ziel-Verzeichnis nicht gefunden!"
    echo ""
    echo "🔍 Suche nach mancusi httpdocs..."
    find /var/www -name "*mancusi*" -type d 2>/dev/null
    find /home -name "*mancusi*" -type d 2>/dev/null
    find /usr -path "*mancusi*/httpdocs" 2>/dev/null
    echo ""
    echo "Bitte passe den TARGET Pfad im Script an!"
    exit 1
fi

echo "✅ Ziel-Verzeichnis gefunden!"
echo ""

# Backup erstellen
BACKUP_DIR="$TARGET/../backup_$(date +%Y%m%d_%H%M%S)"
echo "💾 Erstelle Backup: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
cp -r "$TARGET"/* "$BACKUP_DIR/" 2>/dev/null
echo "✅ Backup erstellt"
echo ""

# Dateien kopieren
echo "📦 Kopiere Dateien..."
echo ""

# Hauptdateien
echo "  → index.html"
cp "$SOURCE/index.html" "$TARGET/"

# API Ordner
echo "  → api/"
mkdir -p "$TARGET/api"
cp -r "$SOURCE/api/"* "$TARGET/api/"

# JavaScript
echo "  → js/"
mkdir -p "$TARGET/js"
cp -r "$SOURCE/js/"* "$TARGET/js/"

# Styles
echo "  → styles/"
mkdir -p "$TARGET/styles"
cp -r "$SOURCE/styles/"* "$TARGET/styles/"

# Public Assets
echo "  → public/"
mkdir -p "$TARGET/public"
cp -r "$SOURCE/public/"* "$TARGET/public/"

# README (optional)
echo "  → README.md"
cp "$SOURCE/README.md" "$TARGET/" 2>/dev/null

echo ""
echo "✅ Alle Dateien kopiert!"
echo ""

# Berechtigungen setzen
echo "🔐 Setze Berechtigungen..."
chmod 755 "$TARGET"
chmod 644 "$TARGET/index.html"
chmod 755 "$TARGET/api"
chmod 644 "$TARGET/api/"*.php
chmod 755 "$TARGET/js"
chmod 644 "$TARGET/js/"*.js
chmod 755 "$TARGET/styles"
chmod 644 "$TARGET/styles/"*.css
chmod -R 755 "$TARGET/public"
echo "✅ Berechtigungen gesetzt"
echo ""

# Zusammenfassung
echo "🎉 DEPLOYMENT ERFOLGREICH!"
echo ""
echo "📊 Kopierte Dateien:"
ls -lh "$TARGET" | grep -v "^total" | wc -l | xargs echo "  Dateien im Root:"
ls -lh "$TARGET/api" | grep -v "^total" | wc -l | xargs echo "  PHP APIs:"
echo ""
echo "🌐 Website erreichbar unter:"
echo "   → http://mancusi.visiodronix.de"
echo "   → https://mancusi.visiodronix.de"
echo ""
echo "🧪 Teste die APIs:"
echo "   → http://mancusi.visiodronix.de/api/vehicles.php"
echo "   → http://mancusi.visiodronix.de/api/inspections.php"
echo "   → http://mancusi.visiodronix.de/api/standards.php"
echo ""
echo "📝 Backup erstellt in: $BACKUP_DIR"
echo ""
