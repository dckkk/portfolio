from fastapi import APIRouter, Depends
from typing import Dict, Any, List

router = APIRouter(prefix="/api", tags=["profile"])


@router.get("/profile")
async def get_profile() -> Dict[str, Any]:
    """Get user profile information."""
    return {
        "name": "Dicky Pratama",
        "title": "Senior Software Engineer",
        "location": "Jakarta, Indonesia",
        "email": "dickypratamss@gmail.com",
        "phone": "+6282258583938",
        "summary": "5+ years as Senior Software Engineer at Grab, specializing in FinTech & Payment Systems. Expert in building high-scale Market Intelligence platforms, LLM-driven automation systems, and real-time data pipelines. Skilled in Go, Python, and cloud infrastructure.",
        "photo_url": "/api/photo",
        "links": {
            "linkedin": "https://www.linkedin.com/in/dicky-pratama-585840119/",
            "github": "https://github.com/dckkk"
        }
    }


@router.get("/experience")
async def get_experience() -> List[Dict[str, Any]]:
    """Get work experience."""
    return [
        {
            "company": "Grab",
            "position": "Senior Software Engineer",
            "period": "May 2021 – Present",
            "location": "Jakarta, Indonesia",
            "description": "Market Intelligence team lead. Built LLM-driven automation systems generating ~12K hourly competitor insights using Claude agents. Led development of high-frequency data pipelines processing market data at scale.",
            "technologies": ["Go", "Python", "Kafka", "Pinecone", "Claude", "Kubernetes"]
        },
        {
            "company": "OttoDigital",
            "position": "Staff Engineer",
            "period": "2019 – May 2021",
            "location": "Jakarta, Indonesia",
            "description": "Led fintech platform development for payment systems. Architected and built high-scale systems handling millions of transactions daily.",
            "technologies": ["Go", "Python", "PostgreSQL", "Temporal", "gRPC"]
        },
        {
            "company": "Bank Sinarmas",
            "position": "Consulting Engineer",
            "period": "2018 – 2019",
            "location": "Jakarta, Indonesia",
            "description": "Optimization and modernization consulting for banking infrastructure. Achieved significant cost reduction through system improvements.",
            "technologies": ["Java", "SQL", "AWS"]
        }
    ]


@router.get("/skills")
async def get_skills() -> Dict[str, List[str]]:
    """Get technical skills."""
    return {
        "languages": ["Go", "Python", "Java", "PHP", "SQL", "JavaScript", "Terraform"],
        "databases": ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
        "cloud": ["AWS", "GCP", "Kubernetes", "Docker"],
        "technologies": ["Kafka", "Temporal", "gRPC", "Langchain", "n8n"],
        "specializations": ["LLM Orchestration", "RAG Systems", "Vector Databases", "Prompt Engineering", "Agentic Workflows", "Reverse Engineering"]
    }


@router.get("/projects")
async def get_projects() -> List[Dict[str, Any]]:
    """Get project highlights."""
    return [
        {
            "title": "Market Intelligence Platform",
            "description": "Built LLM-driven system generating 12K+ competitor insights hourly using Claude agents",
            "technologies": ["Python", "Langchain", "Claude", "Pinecone"],
            "impact": "Enable real-time market analysis for strategic decision-making"
        },
        {
            "title": "High-Frequency Data Pipeline",
            "description": "Architected scalable data pipeline processing millions of market data points daily",
            "technologies": ["Go", "Kafka", "Kubernetes", "PostgreSQL"],
            "impact": "Sub-second latency, 99.99% uptime"
        },
        {
            "title": "Payment Processing System",
            "description": "Designed and implemented fintech payment system at OttoDigital",
            "technologies": ["Go", "PostgreSQL", "gRPC", "Temporal"],
            "impact": "Handle 1M+ transactions daily with < 100ms latency"
        }
    ]


@router.get("/status")
async def get_status() -> Dict[str, Any]:
    """Get service status."""
    return {
        "service": "dicky-portfolio-backend",
        "status": "operational",
        "version": "0.1.0"
    }
