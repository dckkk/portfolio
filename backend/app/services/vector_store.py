import hashlib
from pathlib import Path
from typing import List, Dict, Any, Tuple
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from .cv_loader import CVLoader, CVChunk


class VectorStore:
    def __init__(self, chroma_dir: str, cv_path: str):
        self.chroma_dir = Path(chroma_dir)
        self.cv_path = Path(cv_path)
        self.collection_name = "dicky_profile"
        
        # Initialize embeddings (local, free, ~80MB model)
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        
        # Initialize ChromaDB client
        self.db = None
        self._init_db()
    
    def _init_db(self):
        """Initialize ChromaDB with persistent storage."""
        self.chroma_dir.mkdir(parents=True, exist_ok=True)
        
        self.db = Chroma(
            collection_name=self.collection_name,
            embedding_function=self.embeddings,
            persist_directory=str(self.chroma_dir),
        )
    
    def _get_cv_hash(self) -> str:
        """Get SHA256 hash of CV file for change detection."""
        if not self.cv_path.exists():
            return ""
        
        sha256_hash = hashlib.sha256()
        with open(self.cv_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()
    
    def ingest_cv(self, force_reload: bool = False) -> int:
        """Load and ingest CV chunks into vector store (idempotent)."""
        # Check if we need to reload
        cv_hash = self._get_cv_hash()
        stored_hash = self._get_stored_hash()
        
        if not force_reload and cv_hash == stored_hash:
            # Already ingested, return count
            try:
                count = self.db.get()["ids"]
                return len(count) if count else 0
            except:
                pass
        
        # Load and chunk CV
        loader = CVLoader(str(self.cv_path))
        chunks = loader.chunk_by_sections()
        
        if not chunks:
            return 0
        
        # Prepare documents and metadata
        documents = [chunk.text for chunk in chunks]
        metadatas = loader.get_metadata(chunks)
        ids = [f"cv_{i}" for i in range(len(chunks))]
        
        # Clear existing collection if reloading
        if stored_hash and cv_hash != stored_hash:
            try:
                self.db.delete_collection()
                self._init_db()
            except:
                pass
        
        # Add documents to vector store
        self.db.add_documents(
            documents=[
                type('obj', (object,), {'page_content': doc, 'metadata': meta})()
                for doc, meta in zip(documents, metadatas)
            ],
            ids=ids
        )
        
        # Store hash
        self._store_hash(cv_hash)
        
        return len(chunks)
    
    def retrieve(self, query: str, k: int = 4) -> List[Tuple[str, float, Dict[str, Any]]]:
        """Retrieve top-k similar chunks for a query."""
        if not self.db:
            return []
        
        try:
            results = self.db.similarity_search_with_score(query, k=k)
            
            retrieved = []
            for doc, score in results:
                retrieved.append((
                    doc.page_content,
                    1 - score,  # Convert distance to similarity
                    doc.metadata if hasattr(doc, 'metadata') else {}
                ))
            
            return retrieved
        except Exception as e:
            print(f"Retrieval error: {e}")
            return []
    
    def _get_stored_hash(self) -> str:
        """Get stored CV hash from metadata file."""
        hash_file = self.chroma_dir / "cv_hash.txt"
        if hash_file.exists():
            return hash_file.read_text().strip()
        return ""
    
    def _store_hash(self, hash_value: str):
        """Store CV hash for change detection."""
        hash_file = self.chroma_dir / "cv_hash.txt"
        hash_file.write_text(hash_value)


def get_vector_store(chroma_dir: str, cv_path: str) -> VectorStore:
    """Factory function to get vector store instance."""
    return VectorStore(chroma_dir, cv_path)
