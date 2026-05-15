from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter(prefix="/api", tags=["chat"])
limiter = Limiter(key_func=get_remote_address)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    question: str
    conversation_id: str
    token_limit: Optional[int] = None


class ChatResponse(BaseModel):
    answer: str
    tokens_used: int
    session_tokens_used: int
    is_in_scope: bool
    citations: List[str]
    error: Optional[str] = None


@router.post("/chat", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat(request: Request, body: ChatRequest) -> ChatResponse:
    """Chat with RAG bot about Dicky's experience."""
    
    # Get services from app state
    rag_service = request.app.state.rag_service
    session_store = request.app.state.session_store
    settings = request.app.state.settings
    
    # Validate conversation ID
    if not body.conversation_id or len(body.conversation_id) < 1:
        raise HTTPException(status_code=400, detail="Invalid conversation_id")
    
    # Check token budget
    if not session_store.check_token_budget(body.conversation_id):
        remaining = session_store.get_remaining_tokens(body.conversation_id)
        raise HTTPException(
            status_code=429,
            detail=f"Token budget exceeded. Remaining: {remaining} tokens"
        )
    
    # Get or create session
    session = session_store.get_or_create_session(body.conversation_id)
    
    # Build conversation history from session
    conversation_history = []
    for msg in session.messages:
        conversation_history.append({
            "role": msg.role,
            "content": msg.content
        })
    
    # Generate answer
    result = rag_service.answer(
        question=body.question,
        session_id=body.conversation_id,
        conversation_history=conversation_history if conversation_history else None
    )
    
    return ChatResponse(
        answer=result["answer"],
        tokens_used=result["tokens_used"],
        session_tokens_used=result.get("session_tokens_used", 0),
        is_in_scope=result["is_in_scope"],
        citations=result["citations"],
        error=result.get("error")
    )


@router.get("/chat/session/{session_id}")
async def get_session(request: Request, session_id: str) -> Dict[str, Any]:
    """Get session information."""
    session_store = request.app.state.session_store
    settings = request.app.state.settings
    
    session = session_store.get_session(session_id)
    
    if session is None:
        return {
            "session_id": session_id,
            "tokens_used": 0,
            "tokens_remaining": settings.session_token_budget,
            "message_count": 0
        }
    
    return {
        "session_id": session_id,
        "tokens_used": session.tokens_used,
        "tokens_remaining": settings.session_token_budget - session.tokens_used,
        "message_count": len(session.messages),
        "created_at": session.created_at,
        "last_access": session.last_access
    }
