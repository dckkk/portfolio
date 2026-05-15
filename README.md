# Dicky's AI-Powered Portfolio

A full-stack portfolio website that demonstrates **AI Agentic capabilities** through a RAG-powered chatbot, MCP integrations, and interactive profile experience.

**Live Demo**: [dicky-portfolio.vercel.app](https://dicky-portfolio.vercel.app) (example)

## Features

🤖 **AI Chatbot**
- RAG-powered responses using Claude Haiku
- Knowledge grounded in CV and LinkedIn data
- Intelligent scope enforcement (only answers about Dicky)
- Per-session token budget tracking (8000 tokens)

📊 **Dynamic Profile**
- Experience timeline extracted from CV
- Skills organized by category
- Project highlights
- Profile photo and contact links (LinkedIn, GitHub)

📅 **Google Calendar Integration**
- Show availability for discussions
- Free/busy slots in Asia/Jakarta timezone
- Privacy-respecting (no event details exposed)

🔗 **GitHub Integration**
- Fetch and display public repositories
- Project showcase with technology tags
- Cached for performance

## Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** for fast development
- **Tailwind CSS** for responsive design
- **Axios** for type-safe API calls
- Runs on **Vercel** (serverless)

### Backend
- **FastAPI** for async Python API
- **Langchain** for LLM orchestration
- **ChromaDB** + **MiniLM embeddings** for RAG
- **Claude Haiku 4.5** for generation
- Runs on **Railway** or **Fly.io** (containerized)

### LLM & Tools
- **Claude Haiku 4.5** (efficient, fast)
- **MCP Tools**: search_cv, get_calendar_availability, search_github
- **Session Management**: Token budget, TTL-based expiration
- **Rate Limiting**: 20 requests/min per IP

## Project Structure

```
portfolio/
├── frontend/                  # React SPA (Vercel)
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Chat/         # Chat widget, messages, input
│   │   │   ├── Hero.tsx      # Profile section
│   │   │   ├── Experience.tsx
│   │   │   └── Skills.tsx
│   │   ├── lib/              # API client, types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── backend/                   # FastAPI (Railway/Fly)
│   ├── app/
│   │   ├── main.py          # FastAPI app setup
│   │   ├── config.py        # Settings (Pydantic)
│   │   ├── services/        # Business logic
│   │   │   ├── cv_loader.py      # PDF extraction & chunking
│   │   │   ├── vector_store.py   # ChromaDB + embeddings
│   │   │   ├── rag_service.py    # Claude integration
│   │   │   ├── session_store.py  # Token tracking
│   │   │   ├── github_service.py # GitHub API
│   │   │   └── calendar_service.py # Calendar API
│   │   ├── routers/         # API endpoints
│   │   │   ├── profile.py   # /api/profile, /api/experience, etc
│   │   │   ├── chat.py      # /api/chat
│   │   │   └── availability.py # /api/availability
│   │   └── mcp/
│   │       └── tools.py     # MCP tool schemas
│   ├── tests/               # Pytest suite (34 tests)
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── docs/                     # Living documentation
│   ├── architecture.md       # System diagrams & data flow
│   ├── api.md               # REST API reference
│   ├── setup.md             # Local dev setup
│   └── deployment.md        # Vercel + Railway deployment
│
├── docker-compose.yml        # Local full-stack setup
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI/CD
└── README.md (this file)
```

## Getting Started

### Local Development

#### Prerequisites
- Python 3.10+, Node.js 18+, API key from Anthropic

#### Setup Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your ANTHROPIC_API_KEY
pytest tests/ -v  # Run 34 tests
python -m uvicorn app.main:app --reload
```

#### Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

**Frontend**: http://localhost:5173  
**Backend**: http://localhost:8000

### Docker Compose (Production-like)
```bash
docker-compose up --build
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

See [docs/setup.md](docs/setup.md) for detailed instructions.

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/profile` | User profile info |
| GET | `/api/experience` | Work history |
| GET | `/api/skills` | Technical skills |
| GET | `/api/projects` | Project highlights |
| POST | `/api/chat` | RAG chatbot |
| GET | `/api/availability` | Free time slots |
| GET | `/api/photo` | Profile photo |
| GET | `/health` | Health check |

See [docs/api.md](docs/api.md) for detailed specifications.

## How the Chatbot Works

```
1. User asks a question (e.g., "What's your Go experience?")
   ↓
2. Frontend sends to /api/chat endpoint
   ↓
3. Backend retrieves relevant CV chunks from ChromaDB
   ↓
4. RAG Service builds context-augmented prompt
   ↓
5. Claude Haiku generates grounded response
   ↓
6. Tokens are tracked and response is returned
   ↓
7. Frontend displays answer with citation sources
```

**Scope Enforcement**: Only answers questions about:
- Work experience & employment
- Technical skills
- Projects & achievements
- Availability & calendar
- GitHub & open source
- How this site was built

Other topics are politely declined.

## Architecture Highlights

### RAG Pipeline
- **Chunking**: Section-aware CV splitting (experience, projects, skills, education)
- **Embeddings**: Local MiniLM-L6-v2 (80MB, ~50ms latency)
- **Retrieval**: ChromaDB similarity search (k=4)
- **Generation**: Claude Haiku with context augmentation
- **Citations**: Source tracking for transparency

### Scope Enforcement
- Keyword-based + retrieval score heuristics
- System prompt emphasizes allowed topics
- Graceful decline for out-of-scope questions

### Token Management
- **Budget**: 8000 tokens per session
- **TTL**: 60 minutes of inactivity
- **UI Feedback**: Visual token meter with warnings
- **Rate Limit**: 20 requests/minute per IP

### MCP Tools
- `search_cv(query)`: Query the CV vector store
- `get_calendar_availability(days, duration)`: Free time slots
- `search_github(query)`: Public repository search

## Testing

```bash
# Backend (34 tests)
cd backend && pytest tests/ -v

# Frontend (component tests)
cd frontend && npm test

# Full stack CI/CD
git push  # Triggers GitHub Actions
```

## Deployment

### Quick Deploy

**Frontend** (Vercel):
```bash
cd frontend && vercel --prod
```

**Backend** (Railway):
```bash
cd backend && railway up
```

Or see [docs/deployment.md](docs/deployment.md) for detailed Railway/Fly instructions.

### Environment Variables

**Backend (.env)**
```
ANTHROPIC_API_KEY=sk-ant-xxx
GITHUB_USERNAME=dckkk
ALLOWED_ORIGINS=https://your-domain.com
SESSION_TOKEN_BUDGET=8000
```

**Frontend (.env.local)**
```
VITE_API_URL=https://your-api.railway.app/api
```

## Documentation

- **[Architecture](docs/architecture.md)** - System design, mermaid diagrams
- **[API Reference](docs/api.md)** - Endpoint specs, examples
- **[Setup Guide](docs/setup.md)** - Local development
- **[Deployment](docs/deployment.md)** - Vercel + Railway

## Performance

- **Frontend**: Vercel CDN (~50ms globally)
- **Backend**: Railway/Fly (~200ms to Anthropic API)
- **Embeddings**: MiniLM local (~50ms)
- **Chat**: 1-2 seconds end-to-end

## Cost Estimates

- **Vercel**: Free tier
- **Railway/Fly**: $5-8/month
- **Anthropic API**: $1-5/month (portfolio use)
- **Total**: ~$6-13/month

## Security

✅ **Rate Limiting** - 20 req/min per IP  
✅ **Scope Enforcement** - Restricted to CV/LinkedIn/Calendar  
✅ **Token Budget** - Prevents abuse ($$$)  
✅ **No Auth Required** - Read-only public portfolio  
✅ **Privacy** - Calendar freeBusy only, no event details  
✅ **Secrets** - Environment variables, never hardcoded  

## Contributing

This is a personal portfolio, but inspired by:
- Langchain RAG patterns
- FastAPI best practices
- React component architecture

## License

Personal project. Feel free to learn from it!

## Contact

- **Email**: dickypratamss@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/dicky-pratama-585840119/
- **GitHub**: https://github.com/dckkk

---

**Built with**: React + Langchain + Claude AI + ❤️
