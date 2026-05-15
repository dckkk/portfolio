# Local Development Setup

## Prerequisites

- Python 3.10+
- Node.js 18+
- git
- Anthropic API key (from https://console.anthropic.com)

## Backend Setup

### 1. Create Virtual Environment

```bash
cd portfolio/backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:
```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
GITHUB_USERNAME=dckkk
CHROMA_DIR=./chroma_db
CV_PATH=../../CV_Dicky_Pratama_Senior_Software_Engineer.pdf
PHOTO_PATH=../../1539957873424.jpeg
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
SESSION_TOKEN_BUDGET=8000
CALENDAR_TIMEZONE=Asia/Jakarta
```

### 4. Verify Setup

```bash
# Test that imports work
python -c "from app.main import app; print('✓ App loads successfully')"

# Run tests
pytest tests/ -v
```

### 5. Start Backend Server

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

Test the API:
```bash
curl http://localhost:8000/health
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd portfolio/frontend
npm install
```

### 2. Create Environment File

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Output will be in `frontend/dist/`

## Running the Full Stack

### Option 1: Separate Terminals

Terminal 1 (Backend):
```bash
cd portfolio/backend
source venv/bin/activate
python -m uvicorn app.main:app --reload
```

Terminal 2 (Frontend):
```bash
cd portfolio/frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Option 2: Docker Compose (Production-like)

```bash
cd portfolio
docker-compose up --build
```

Services will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

## Testing

### Backend Tests

```bash
cd backend
source venv/bin/activate
pytest tests/ -v
pytest tests/ -v --cov=app  # With coverage
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Troubleshooting

### Backend won't start

**Error**: `ModuleNotFoundError: No module named 'app'`
- Make sure you're in the `backend/` directory
- Virtual environment is activated: `source venv/bin/activate`

**Error**: `FileNotFoundError: CV PDF not found`
- Check CV_PATH in `.env` is correct relative to backend directory
- CV should be at: `../../CV_Dicky_Pratama_Senior_Software_Engineer.pdf`

**Error**: `ANTHROPIC_API_KEY` not set
- Set in `.env` file: `ANTHROPIC_API_KEY=sk-ant-...`

### Frontend won't connect to backend

**Error**: `Failed to fetch /api/profile`
- Make sure backend is running on port 8000
- Check CORS: backend should allow `http://localhost:5173`
- Check `.env.local` has correct `VITE_API_URL`

### ChromaDB errors

**Error**: `chroma_db` not found or corrupted
- Delete `backend/chroma_db/` directory
- Backend will reingest CV on startup: `python -c "from app.main import app"`

### Google Calendar integration

To enable Google Calendar availability:

1. Create OAuth2 credentials at https://console.cloud.google.com
2. Download `credentials.json` to backend directory
3. Set in `.env`:
   ```env
   GOOGLE_OAUTH_CLIENT_ID=your-client-id
   GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret
   ```
4. Run auth helper:
   ```bash
   python scripts/auth_google.py
   ```

## Development Workflow

1. **Backend Changes**
   - Modify files in `app/`
   - Backend auto-reloads with `--reload` flag
   - Tests run automatically or manually: `pytest tests/`

2. **Frontend Changes**
   - Modify files in `frontend/src/`
   - Frontend auto-reloads on save
   - Check browser console for errors

3. **Data/CV Changes**
   - Update PDF or export new CV
   - Delete `backend/chroma_db/` to force reingestion
   - Backend will rechunk and reingest automatically

## Environment Variables Reference

### Backend (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| ANTHROPIC_API_KEY | Required | Claude API key |
| GITHUB_USERNAME | dckkk | GitHub username |
| CHROMA_DIR | ./chroma_db | ChromaDB storage path |
| CV_PATH | ../../CV_*.pdf | CV file path |
| PHOTO_PATH | ../../1539957873424.jpeg | Profile photo path |
| ALLOWED_ORIGINS | localhost:3000,5173 | CORS allowed origins |
| SESSION_TOKEN_BUDGET | 8000 | Tokens per session |
| SESSION_TTL_MINUTES | 60 | Session timeout |
| RATE_LIMIT_PER_MINUTE | 20 | Rate limit |
| CALENDAR_TIMEZONE | Asia/Jakarta | Timezone for availability |
| ENVIRONMENT | development | dev or production |

### Frontend (.env.local)

| Variable | Default | Description |
|----------|---------|-------------|
| VITE_API_URL | http://localhost:8000/api | Backend API URL |

## Next Steps

1. Start the backend and frontend as shown above
2. Open `http://localhost:5173` in your browser
3. Try the chat widget: "Who is Dicky?" or "What languages do you use?"
4. Check backend logs for debug output
5. Check browser DevTools (F12) for frontend errors

## Production Deployment

See [DEPLOYMENT.md](./deployment.md) for Vercel + Railway setup.
