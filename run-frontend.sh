#!/bin/bash

export PATH="/opt/homebrew/opt/node@18/bin:$PATH"
cd "$(dirname "$0")/frontend"

echo "🚀 Starting Frontend (React + Vite)..."
echo "   URL: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev
