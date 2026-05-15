#!/bin/bash

cd "$(dirname "$0")/backend"
source venv/bin/activate
echo "🚀 Starting Backend (FastAPI)..."
echo "   URL: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
