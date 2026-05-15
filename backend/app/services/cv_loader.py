import re
from pathlib import Path
from pypdf import PdfReader
from typing import List, Dict, Any
from dataclasses import dataclass


@dataclass
class CVChunk:
    text: str
    section: str
    company: str = ""
    role: str = ""
    period: str = ""
    source: str = "cv"


class CVLoader:
    def __init__(self, cv_path: str):
        self.cv_path = Path(cv_path)
        self.sections = {
            "EXPERIENCE": r"(?:PROFESSIONAL\s+)?EXPERIENCE|WORK\s+EXPERIENCE",
            "PROJECTS": r"(?:KEY\s+)?PROJECTS|PROJECT\s+HIGHLIGHTS",
            "SKILLS": r"TECHNICAL\s+SKILLS|SKILLS",
            "EDUCATION": r"EDUCATION",
        }
    
    def load_pdf_text(self) -> str:
        """Extract text from PDF file."""
        if not self.cv_path.exists():
            raise FileNotFoundError(f"CV not found at {self.cv_path}")
        
        reader = PdfReader(self.cv_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    
    def chunk_by_sections(self) -> List[CVChunk]:
        """Parse CV text and chunk by sections with metadata."""
        text = self.load_pdf_text()
        chunks = []
        
        section_positions = {}
        for section_name, section_regex in self.sections.items():
            match = re.search(section_regex, text, re.IGNORECASE | re.MULTILINE)
            if match:
                section_positions[section_name] = match.start()
        
        sorted_sections = sorted(section_positions.items(), key=lambda x: x[1])
        
        for i, (section_name, start_pos) in enumerate(sorted_sections):
            if i + 1 < len(sorted_sections):
                end_pos = sorted_sections[i + 1][1]
            else:
                end_pos = len(text)
            
            section_text = text[start_pos:end_pos].strip()
            
            if section_name == "EXPERIENCE":
                chunks.extend(self._chunk_experience(section_text))
            elif section_name == "PROJECTS":
                chunks.extend(self._chunk_projects(section_text))
            elif section_name == "SKILLS":
                chunks.extend(self._chunk_skills(section_text))
            elif section_name == "EDUCATION":
                chunks.extend(self._chunk_education(section_text))
        
        return chunks
    
    def _chunk_experience(self, section_text: str) -> List[CVChunk]:
        """Chunk experience section by job entries."""
        chunks = []
        
        # Split by job titles (usually followed by company and dates)
        lines = section_text.split("\n")
        current_job = []
        
        for line in lines:
            # Look for date patterns (e.g., "May 2021 – Present")
            if re.search(r"\d{4}\s*–|Present|\d{4}\s*-\s*\d{4}", line):
                if current_job:
                    job_text = "\n".join(current_job).strip()
                    if job_text:
                        chunk = self._parse_job_entry(job_text)
                        if chunk:
                            chunks.append(chunk)
                    current_job = [line]
                else:
                    current_job = [line]
            elif current_job:
                current_job.append(line)
        
        if current_job:
            job_text = "\n".join(current_job).strip()
            if job_text:
                chunk = self._parse_job_entry(job_text)
                if chunk:
                    chunks.append(chunk)
        
        return chunks if chunks else [CVChunk(text=section_text, section="EXPERIENCE")]
    
    def _parse_job_entry(self, text: str) -> CVChunk:
        """Parse a single job entry to extract role, company, period."""
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        
        role = lines[0] if lines else ""
        company = lines[1] if len(lines) > 1 else ""
        period = lines[2] if len(lines) > 2 else ""
        
        # Try to find date range
        date_match = re.search(r"(\w+\s+\d{4})\s*(?:–|-)\s*(\w+\s+\d{4}|Present)", text)
        if date_match:
            period = f"{date_match.group(1)} – {date_match.group(2)}"
        
        return CVChunk(
            text=text,
            section="EXPERIENCE",
            company=company,
            role=role,
            period=period,
            source="cv"
        )
    
    def _chunk_projects(self, section_text: str) -> List[CVChunk]:
        """Chunk projects section."""
        chunks = []
        # Split by project titles (usually bullet points or numbered)
        projects = re.split(r"•|–|-|\n(?=[A-Z])", section_text)
        
        for project in projects:
            project = project.strip()
            if project and len(project) > 20:
                chunks.append(CVChunk(
                    text=project,
                    section="PROJECTS",
                    source="cv"
                ))
        
        return chunks if chunks else [CVChunk(text=section_text, section="PROJECTS")]
    
    def _chunk_skills(self, section_text: str) -> List[CVChunk]:
        """Chunk skills section by category."""
        chunks = []
        
        # Split by skill categories
        categories = re.split(r"\n(?=[A-Z][a-z]+\s*:)", section_text)
        
        for category in categories:
            category = category.strip()
            if category and len(category) > 10:
                chunks.append(CVChunk(
                    text=category,
                    section="SKILLS",
                    source="cv"
                ))
        
        return chunks if chunks else [CVChunk(text=section_text, section="SKILLS")]
    
    def _chunk_education(self, section_text: str) -> List[CVChunk]:
        """Chunk education section."""
        return [CVChunk(text=section_text, section="EDUCATION", source="cv")]
    
    def get_metadata(self, chunks: List[CVChunk]) -> List[Dict[str, Any]]:
        """Convert chunks to metadata dict for storage."""
        return [
            {
                "section": chunk.section,
                "company": chunk.company,
                "role": chunk.role,
                "period": chunk.period,
                "source": chunk.source,
            }
            for chunk in chunks
        ]
