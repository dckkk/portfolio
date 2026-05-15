import pytest
from unittest.mock import Mock, patch, MagicMock
from app.services.rag_service import RAGService
from app.services.vector_store import VectorStore
from app.services.session_store import SessionStore


@pytest.fixture
def mock_vector_store():
    """Create a mock vector store."""
    store = Mock(spec=VectorStore)
    return store


@pytest.fixture
def mock_session_store():
    """Create a mock session store."""
    store = Mock(spec=SessionStore)
    # Setup default returns
    session = Mock()
    session.tokens_used = 0
    session.messages = []
    store.get_or_create_session.return_value = session
    store.get_session.return_value = session
    store.token_budget = 8000
    return store


@pytest.fixture
def rag_service(mock_vector_store, mock_session_store):
    """Create RAG service with mocked dependencies."""
    with patch('app.services.rag_service.Anthropic'):
        service = RAGService(mock_vector_store, mock_session_store, "test-api-key")
        service.client = Mock()
    return service


def test_rag_service_initialization(rag_service):
    """Test RAG service initializes correctly."""
    assert rag_service.vector_store is not None
    assert rag_service.session_store is not None
    assert "Dicky" in rag_service.system_prompt


def test_scope_check_in_scope_keywords(rag_service):
    """Test scope detection with in-scope keywords."""
    query = "What is Dicky's experience in Go?"
    retrieved = [("Go experience text", 0.5, {})]
    
    assert rag_service.is_in_scope(query, retrieved) is True


def test_scope_check_out_of_scope(rag_service):
    """Test scope detection with out-of-scope question."""
    query = "What's the weather today?"
    retrieved = []
    
    assert rag_service.is_in_scope(query, retrieved) is False


def test_scope_check_high_relevance_score(rag_service):
    """Test scope with high relevance score."""
    query = "Tell me about something random"
    retrieved = [("CV content", 0.8, {})]
    
    # High score should mark as in-scope even without keywords
    assert rag_service.is_in_scope(query, retrieved) is True


def test_retrieve_chunks(rag_service):
    """Test chunk retrieval from vector store."""
    chunks = [
        ("chunk 1", 0.9, {"section": "EXPERIENCE"}),
        ("chunk 2", 0.8, {"section": "SKILLS"}),
    ]
    rag_service.vector_store.retrieve.return_value = chunks
    
    result = rag_service.retrieve("Go skills")
    
    assert len(result) == 2
    rag_service.vector_store.retrieve.assert_called_once()


def test_answer_with_retrieval(rag_service, mock_session_store):
    """Test generating answer with retrieved context."""
    # Setup mocks
    mock_chunks = [("Dicky has Go experience", 0.9, {"company": "Grab"})]
    rag_service.vector_store.retrieve.return_value = mock_chunks
    
    mock_response = Mock()
    mock_response.content = [Mock(text="Dicky is an expert in Go programming.")]
    mock_response.usage.input_tokens = 50
    mock_response.usage.output_tokens = 20
    rag_service.client.messages.create.return_value = mock_response
    
    # Call answer
    result = rag_service.answer("What's your Go experience?", "session-1")
    
    # Verify result
    assert "Go" in result["answer"]
    assert result["is_in_scope"] is True
    assert result["tokens_used"] == 70
    assert len(result["citations"]) > 0


def test_answer_out_of_scope(rag_service):
    """Test handling out-of-scope questions."""
    rag_service.vector_store.retrieve.return_value = []
    
    result = rag_service.answer("What's the meaning of life?", "session-2")
    
    assert result["is_in_scope"] is False
    assert "only discuss" in result["answer"].lower()


def test_answer_token_budget_exceeded(rag_service):
    """Test rejection when token budget exceeded."""
    # Mock session with exceeded budget
    session = Mock()
    session.tokens_used = 8001  # Over budget
    rag_service.session_store.get_or_create_session.return_value = session
    rag_service.session_store.token_budget = 8000
    
    result = rag_service.answer("Another question", "session-3")
    
    assert "budget" in result["answer"].lower()
    assert result["error"] == "budget_exceeded"


def test_answer_adds_to_session(rag_service):
    """Test that messages are added to session."""
    mock_session = Mock()
    mock_session.tokens_used = 0
    mock_session.messages = []
    rag_service.session_store.get_or_create_session.return_value = mock_session
    
    rag_service.vector_store.retrieve.return_value = [("content", 0.8, {})]
    
    mock_response = Mock()
    mock_response.content = [Mock(text="Answer")]
    mock_response.usage.input_tokens = 50
    mock_response.usage.output_tokens = 20
    rag_service.client.messages.create.return_value = mock_response
    
    rag_service.answer("Test question", "session-4")
    
    # Verify add_message was called
    assert mock_session.add_message.call_count == 2  # User and assistant
