# Git Push Anleitung

## Branch ist bereit zum Pushen

Der Branch `genspark_ai_developer` ist lokal erstellt und committed.

### Um den Branch zu GitHub zu pushen, führe folgende Befehle aus:

```bash
cd /home/hosting209865/webapp

# GitHub Credentials eingeben (wenn nötig)
git config credential.helper store

# Branch pushen
git push -u origin genspark_ai_developer
```

### Oder direkt mit Personal Access Token:

```bash
cd /home/hosting209865/webapp

# Token ersetzen mit deinem GitHub Personal Access Token
git push https://DEIN_TOKEN@github.com/stuckwave/mancusi-clean-o-meter.git genspark_ai_developer
```

### Pull Request erstellen:

Nach dem Push:
1. Gehe zu: https://github.com/stuckwave/mancusi-clean-o-meter
2. Klicke auf "Compare & pull request"
3. Ziel-Branch: `main` (oder `master`)
4. Source-Branch: `genspark_ai_developer`
5. Titel: "feat: Autohaus Vatterott Qualitätsmanagement-System"
6. Beschreibung siehe PULL_REQUEST_TEMPLATE.md
7. Erstelle den Pull Request

## Aktueller Status

✅ Alle Dateien sind committed
✅ Branch `genspark_ai_developer` ist erstellt
✅ Commit Message ist vollständig
⏳ Warte auf GitHub Push (benötigt Authentifizierung)
