#!/bin/bash
# Quick Deploy Script - Kopiert Änderungen zur Live-Website

SOURCE="/home/hosting209865/webapp"
TARGET="/home/hosting209865/../../mancusi.visiodronix.de/httpdocs"

echo "🚀 Deploying zu mancusi.visiodronix.de..."
echo ""

# Kopiere Hauptdateien
echo "📄 Kopiere index.html..."
cp "$SOURCE/index.html" "$TARGET/"

# Kopiere API
echo "🔌 Kopiere API..."
cp -r "$SOURCE/api"/* "$TARGET/api/" 2>/dev/null || (mkdir -p "$TARGET/api" && cp -r "$SOURCE/api"/* "$TARGET/api/")

# Kopiere JavaScript
echo "📜 Kopiere JavaScript..."
cp -r "$SOURCE/js"/* "$TARGET/js/" 2>/dev/null || (mkdir -p "$TARGET/js" && cp -r "$SOURCE/js"/* "$TARGET/js/")

# Kopiere Styles
echo "🎨 Kopiere Styles..."
cp -r "$SOURCE/styles"/* "$TARGET/styles/" 2>/dev/null || (mkdir -p "$TARGET/styles" && cp -r "$SOURCE/styles"/* "$TARGET/styles/")

# Kopiere Public Assets
echo "🖼️  Kopiere Assets..."
cp -r "$SOURCE/public"/* "$TARGET/public/" 2>/dev/null || (mkdir -p "$TARGET/public" && cp -r "$SOURCE/public"/* "$TARGET/public/")

echo ""
echo "✅ Deployment abgeschlossen!"
echo "🌐 Live: https://mancusi.visiodronix.de"
echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
echo ""
