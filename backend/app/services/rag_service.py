import re
from typing import Optional, Dict, Any, List
from anthropic import Anthropic
from .vector_store import VectorStore
from .session_store import SessionStore


class RAGService:
    def __init__(self, vector_store: VectorStore, session_store: SessionStore, api_key: str):
        self.vector_store = vector_store
        self.session_store = session_store
        self.client = Anthropic(api_key=api_key)
        
        self.system_prompt = """You are Dicky Pratama's portfolio assistant. You have access to information about Dicky's professional experience, skills, projects, and availability.

Your role is to answer questions about:
- Dicky's work experience and employment history
- His technical skills and expertise
- His projects and achievements
- His availability for discussions (from calendar)
- How this website was built

You MUST answer ONLY using the provided context. If a question is unrelated to these topics, politely decline and redirect the conversation back to Dicky's professional background.

When answering:
1. Be concise and professional
2. Cite the source when possible (e.g., "From Dicky's experience at Grab...")
3. Use the provided context to ground your answer
4. Never make up information not in the context

Important: You should refuse to discuss topics outside of Dicky's CV, LinkedIn, GitHub, and calendar availability."""
    
    def is_in_scope(self, query: str, retrieved_chunks: List[tuple]) -> bool:
        """Determine if query is within scope using retrieval score and keyword matching."""
        # Check keyword match
        scope_keywords = ["experience", "skill", "project", "dicky", "calendar", "available", "free", "busy", "github", "language", "tool", "technology", "company", "role", "education", "achievement", "built", "website"]
        query_lower = query.lower()
        
        has_keyword = any(keyword in query_lower for keyword in scope_keywords)
        
        # Check retrieval quality
        if retrieved_chunks:
            top_score = retrieved_chunks[0][1]  # Similarity score
            
            # If we have a high-quality retrieval, it's in scope
            if top_score > 0.4:
                return True
        
        # If has relevant keyword, lean towards in-scope
        if has_keyword:
            return True
        
        return False
    
    def retrieve(self, query: str, k: int = 4) -> List[tuple]:
        """Retrieve relevant chunks from vector store."""
        return self.vector_store.retrieve(query, k=k)
    
    def answer(
        self,
        question: str,
        session_id: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
    ) -> Dict[str, Any]:
        """Answer a question using RAG with Claude Haiku."""
        
        # Get session
        session = self.session_store.get_or_create_session(session_id)
        
        # Check token budget
        if session.tokens_used >= self.session_store.token_budget:
            return {
                "answer": "Your token budget for this session has been exhausted. Please refresh to start a new session.",
                "tokens_used": 0,
                "is_in_scope": True,
                "citations": [],
                "error": "budget_exceeded"
            }
        
        # Retrieve relevant chunks
        retrieved_chunks = self.retrieve(question)
        
        # Check if query is in scope
        is_in_scope = self.is_in_scope(question, retrieved_chunks)
        
        if not is_in_scope and not retrieved_chunks:
            return {
                "answer": "I can only discuss Dicky's professional experience, skills, projects, and availability. Could you ask something about those topics?",
                "tokens_used": 0,
                "is_in_scope": False,
                "citations": [],
            }
        
        # Build context from retrieved chunks
        context = ""
        citations = []
        
        if retrieved_chunks:
            context = "\n\nContext from Dicky's CV:\n"
            for i, (chunk_text, score, metadata) in enumerate(retrieved_chunks, 1):
                context += f"\n[{i}] {chunk_text}\n(Relevance: {score:.1%})"
                if metadata.get("company"):
                    citations.append(f"{metadata['company']}: {metadata.get('role', '')}")
        
        # Build messages for Claude
        messages = []
        
        # Add conversation history if provided
        if conversation_history:
            messages.extend(conversation_history)
        
        # Add current question
        messages.append({
            "role": "user",
            "content": f"{question}\n{context}"
        })
        
        # Call Claude Haiku
        try:
            response = self.client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=500,
                system=self.system_prompt,
                messages=messages,
            )
            
            answer_text = response.content[0].text
            tokens_used = response.usage.output_tokens + response.usage.input_tokens
            
            # Store in session
            session.add_message("user", question, tokens=response.usage.input_tokens)
            session.add_message("assistant", answer_text, tokens=response.usage.output_tokens)
            
            return {
                "answer": answer_text,
                "tokens_used": tokens_used,
                "session_tokens_used": session.tokens_used,
                "is_in_scope": is_in_scope,
                "citations": citations,
            }
        
        except Exception as e:
            return {
                "answer": f"Error generating response: {str(e)}",
                "tokens_used": 0,
                "is_in_scope": is_in_scope,
                "citations": [],
                "error": str(e)
            }


def get_rag_service(vector_store: VectorStore, session_store: SessionStore, api_key: str) -> RAGService:
    """Factory function to get RAG service instance."""
    return RAGService(vector_store, session_store, api_key)
