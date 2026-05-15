import pytest
from pathlib import Path
from app.services.cv_loader import CVLoader, CVChunk


@pytest.fixture
def sample_cv_path():
    """Get path to actual CV file."""
    candidates = [
        Path(__file__).parent.parent.parent.parent / "CV_Dicky_Pratama_Senior_Software_Engineer.pdf",
        Path("/Users/dickypratama/Workspace/CV_Dicky_Pratama_Senior_Software_Engineer.pdf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    return candidates[0]


def test_cv_loader_init(sample_cv_path):
    """Test CVLoader initialization."""
    loader = CVLoader(str(sample_cv_path))
    assert loader.cv_path == sample_cv_path


def test_cv_loader_pdf_exists(sample_cv_path):
    """Test that CV file exists."""
    assert sample_cv_path.exists(), f"CV file not found at {sample_cv_path}"


def test_load_pdf_text(sample_cv_path):
    """Test PDF text extraction."""
    loader = CVLoader(str(sample_cv_path))
    text = loader.load_pdf_text()
    
    assert len(text) > 0, "PDF text is empty"
    assert isinstance(text, str), "Text should be string"


def test_chunk_by_sections(sample_cv_path):
    """Test CV chunking by sections."""
    loader = CVLoader(str(sample_cv_path))
    chunks = loader.chunk_by_sections()
    
    assert len(chunks) > 0, "Should have at least 1 chunk"
    assert all(isinstance(chunk, CVChunk) for chunk in chunks)


def test_chunks_have_metadata(sample_cv_path):
    """Test that chunks have required metadata."""
    loader = CVLoader(str(sample_cv_path))
    chunks = loader.chunk_by_sections()
    
    for chunk in chunks:
        assert chunk.section in ["EXPERIENCE", "PROJECTS", "SKILLS", "EDUCATION"]
        assert chunk.source == "cv"
        assert len(chunk.text) > 0


def test_experience_chunks_present(sample_cv_path):
    """Test that experience section is chunked."""
    loader = CVLoader(str(sample_cv_path))
    chunks = loader.chunk_by_sections()
    
    experience_chunks = [c for c in chunks if c.section == "EXPERIENCE"]
    assert len(experience_chunks) > 0, "Should have experience chunks"


def test_chunks_text_not_empty(sample_cv_path):
    """Test all chunks have non-empty text."""
    loader = CVLoader(str(sample_cv_path))
    chunks = loader.chunk_by_sections()
    
    for chunk in chunks:
        assert len(chunk.text.strip()) > 0, f"Empty chunk found in {chunk.section}"
