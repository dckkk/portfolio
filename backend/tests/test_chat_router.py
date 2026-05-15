import pytest
import json
from unittest.mock import Mock, patch, AsyncMock
from fastapi.testclient import TestClient


@pytest.fixture
def test_client():
    """Create a test client for the FastAPI app."""
    from app.main import app
    return TestClient(app)


def test_chat_endpoint_exists(test_client):
    """Test that chat endpoint is available."""
    # Test that the endpoint is registered
    response = test_client.post(
        "/api/chat",
        json={
            "question": "Who is Dicky?",
            "conversation_id": "test-session-1"
        }
    )
    # Should get a response (might be 500 if Anthropic API fails, but endpoint exists)
    assert response.status_code in [200, 400, 401, 422, 500]


def test_health_endpoint(test_client):
    """Test health check endpoint."""
    response = test_client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "service" in data


def test_profile_endpoint(test_client):
    """Test profile endpoint."""
    response = test_client.get("/api/profile")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert data["name"] == "Dicky Pratama"


def test_experience_endpoint(test_client):
    """Test experience endpoint."""
    response = test_client.get("/api/experience")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0


def test_skills_endpoint(test_client):
    """Test skills endpoint."""
    response = test_client.get("/api/skills")
    assert response.status_code == 200
    data = response.json()
    assert "languages" in data


def test_projects_endpoint(test_client):
    """Test projects endpoint."""
    response = test_client.get("/api/projects")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


def test_status_endpoint(test_client):
    """Test status endpoint."""
    response = test_client.get("/api/status")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"


def test_session_endpoint(test_client):
    """Test session info endpoint."""
    response = test_client.get("/api/chat/session/test-session-123")
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert data["session_id"] == "test-session-123"
