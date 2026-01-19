#!/bin/bash
# GitHub API script to create repository

REPO_NAME="mancusi-clean-o-meter"
DESCRIPTION="Autohaus Vatterott Quality Management System - Full-Stack Web Application"

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "Creating repository with GitHub CLI..."
    gh repo create stuckwave-tech/$REPO_NAME --public --description "$DESCRIPTION" --homepage "http://202.61.232.229:8000"
else
    echo "GitHub CLI not available. Manual repository creation needed."
    echo ""
    echo "Please create repository manually at:"
    echo "https://github.com/new"
    echo ""
    echo "Repository name: $REPO_NAME"
    echo "Description: $DESCRIPTION"
    echo "Public repository"
fi
