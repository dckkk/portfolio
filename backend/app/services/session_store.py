import time
from typing import Dict, List, Optional
from dataclasses import dataclass, field
from datetime import datetime, timedelta


@dataclass
class Message:
    role: str  # "user" or "assistant"
    content: str
    tokens: int = 0


@dataclass
class Session:
    session_id: str
    created_at: float = field(default_factory=time.time)
    last_access: float = field(default_factory=time.time)
    tokens_used: int = 0
    messages: List[Message] = field(default_factory=list)
    
    def is_expired(self, ttl_minutes: int = 60) -> bool:
        """Check if session has expired."""
        age_minutes = (time.time() - self.created_at) / 60
        return age_minutes > ttl_minutes
    
    def add_message(self, role: str, content: str, tokens: int = 0):
        """Add message to session."""
        self.messages.append(Message(role=role, content=content, tokens=tokens))
        self.tokens_used += tokens
        self.last_access = time.time()


class SessionStore:
    def __init__(self, ttl_minutes: int = 60, token_budget: int = 8000):
        self.sessions: Dict[str, Session] = {}
        self.ttl_minutes = ttl_minutes
        self.token_budget = token_budget
    
    def get_session(self, session_id: str) -> Optional[Session]:
        """Get session, return None if expired or not found."""
        if session_id not in self.sessions:
            return None
        
        session = self.sessions[session_id]
        
        if session.is_expired(self.ttl_minutes):
            del self.sessions[session_id]
            return None
        
        return session
    
    def create_session(self, session_id: str) -> Session:
        """Create new session."""
        session = Session(session_id=session_id)
        self.sessions[session_id] = session
        return session
    
    def get_or_create_session(self, session_id: str) -> Session:
        """Get existing session or create new one."""
        session = self.get_session(session_id)
        if session is None:
            session = self.create_session(session_id)
        return session
    
    def check_token_budget(self, session_id: str) -> bool:
        """Check if session has remaining token budget."""
        session = self.get_session(session_id)
        if session is None:
            return True  # New session has budget
        return session.tokens_used < self.token_budget
    
    def get_remaining_tokens(self, session_id: str) -> int:
        """Get remaining tokens for session."""
        session = self.get_session(session_id)
        if session is None:
            return self.token_budget
        return max(0, self.token_budget - session.tokens_used)
    
    def cleanup_expired_sessions(self):
        """Remove expired sessions."""
        expired_ids = [
            sid for sid, session in self.sessions.items()
            if session.is_expired(self.ttl_minutes)
        ]
        for sid in expired_ids:
            del self.sessions[sid]


# Global instance
_session_store = None


def get_session_store(ttl_minutes: int = 60, token_budget: int = 8000) -> SessionStore:
    """Get or create global session store."""
    global _session_store
    if _session_store is None:
        _session_store = SessionStore(ttl_minutes, token_budget)
    return _session_store
