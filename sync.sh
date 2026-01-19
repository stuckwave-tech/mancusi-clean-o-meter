#!/bin/bash
SOURCE="/home/hosting209865/webapp"
TARGET="/home/hosting209865/../../mancusi.visiodronix.de/httpdocs"

echo "🔄 Auto-Sync gestartet!"
echo "📁 Quelle: $SOURCE"
echo "📁 Ziel: $TARGET"
echo "⏱️  Sync alle 3 Sekunden"
echo ""
echo "Drücke CTRL+C zum Beenden oder führe aus: killall sync.sh"
echo ""

while true; do
  rsync -a --delete \
    --exclude='.git' --exclude='.gitignore' \
    --exclude='backend' --exclude='frontend' \
    --exclude='*.md' --exclude='*.sh' \
    --exclude='package.json' --exclude='create_repo.sh' \
    --exclude='node_modules' --exclude='.DS_Store' \
    "$SOURCE/" "$TARGET/" 2>/dev/null && \
    echo "✅ Synced um $(date '+%H:%M:%S')"
  
  sleep 3
done
