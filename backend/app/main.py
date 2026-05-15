from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

from .config import settings
from .services.vector_store import get_vector_store
from .services.session_store import get_session_store
from .services.rag_service import get_rag_service
from .routers import chat, profile, static_assets

# Initialize services
vector_store = get_vector_store(settings.chroma_dir, settings.cv_path)
session_store = get_session_store(settings.session_ttl_minutes, settings.session_token_budget)
rag_service = get_rag_service(vector_store, session_store, settings.anthropic_api_key)

# Ingest CV on startup
try:
    count = vector_store.ingest_cv()
    print(f"Ingested {count} CV chunks into vector store")
except Exception as e:
    print(f"Warning: Could not ingest CV: {e}")

app = FastAPI(
    title="Dicky's Portfolio Backend",
    description="AI-powered portfolio with RAG and MCP integrations",
    version="0.1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(profile.router)
app.include_router(chat.router)
app.include_router(static_assets.router)

# Pass services to routers via dependency injection
app.state.vector_store = vector_store
app.state.session_store = session_store
app.state.rag_service = rag_service
app.state.settings = settings


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "service": "dicky-portfolio-backend",
        "version": "0.1.0"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
