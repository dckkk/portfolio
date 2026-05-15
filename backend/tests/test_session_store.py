import pytest
import time
from app.services.session_store import SessionStore, Session, Message


@pytest.fixture
def session_store():
    """Create a fresh session store for each test."""
    return SessionStore(ttl_minutes=60, token_budget=1000)


def test_create_session(session_store):
    """Test creating a new session."""
    session = session_store.create_session("test-session-1")
    
    assert session.session_id == "test-session-1"
    assert session.tokens_used == 0
    assert len(session.messages) == 0


def test_get_or_create_session(session_store):
    """Test get_or_create returns new session if not exists."""
    session = session_store.get_or_create_session("test-session-2")
    
    assert session.session_id == "test-session-2"
    assert session.tokens_used == 0


def test_get_existing_session(session_store):
    """Test retrieving existing session."""
    session_store.create_session("test-session-3")
    retrieved = session_store.get_session("test-session-3")
    
    assert retrieved is not None
    assert retrieved.session_id == "test-session-3"


def test_session_not_found(session_store):
    """Test getting non-existent session returns None."""
    retrieved = session_store.get_session("non-existent")
    assert retrieved is None


def test_add_message_to_session(session_store):
    """Test adding messages to session."""
    session = session_store.create_session("test-session-4")
    session.add_message("user", "Hello", tokens=10)
    
    assert len(session.messages) == 1
    assert session.messages[0].role == "user"
    assert session.messages[0].content == "Hello"
    assert session.tokens_used == 10


def test_token_budget_tracking(session_store):
    """Test token budget is tracked correctly."""
    session = session_store.create_session("test-session-5")
    
    session.add_message("user", "Message 1", tokens=100)
    assert session.tokens_used == 100
    
    session.add_message("assistant", "Response", tokens=150)
    assert session.tokens_used == 250


def test_check_token_budget(session_store):
    """Test checking if session has token budget."""
    session = session_store.create_session("test-session-6")
    
    # Initially should have budget
    assert session_store.check_token_budget("test-session-6")
    
    # Add tokens up to budget
    session.tokens_used = 999
    assert session_store.check_token_budget("test-session-6")
    
    # Exceed budget
    session.tokens_used = 1001
    assert not session_store.check_token_budget("test-session-6")


def test_get_remaining_tokens(session_store):
    """Test calculating remaining tokens."""
    session = session_store.create_session("test-session-7")
    session.tokens_used = 400
    
    remaining = session_store.get_remaining_tokens("test-session-7")
    assert remaining == 600  # 1000 - 400


def test_session_expiration(session_store):
    """Test session expiration based on TTL."""
    store = SessionStore(ttl_minutes=1, token_budget=1000)
    session = store.create_session("test-expiring")
    
    # Session should not be expired immediately
    assert session.is_expired(ttl_minutes=1) is False
    
    # Manually set created_at to past
    session.created_at = time.time() - (61 * 60)  # 61 minutes ago
    
    # Now it should be expired
    assert session.is_expired(ttl_minutes=1) is True


def test_cleanup_expired_sessions(session_store):
    """Test cleanup of expired sessions."""
    store = SessionStore(ttl_minutes=1, token_budget=1000)
    
    # Create multiple sessions
    store.create_session("session-1")
    store.create_session("session-2")
    store.create_session("session-3")
    
    # Manually expire one session
    store.sessions["session-2"].created_at = time.time() - (61 * 60)
    
    # Cleanup
    store.cleanup_expired_sessions()
    
    # Check results
    assert "session-1" in store.sessions
    assert "session-2" not in store.sessions
    assert "session-3" in store.sessions
