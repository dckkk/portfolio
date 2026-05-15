from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import ConfigDict, Field, field_validator
from typing import List
import os
from dotenv import load_dotenv

# Load .env manually
load_dotenv()


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=None, case_sensitive=False)

    anthropic_api_key: str = Field(default="sk-ant-test")
    github_username: str = "dckkk"

    chroma_dir: str = "./chroma_dir"
    cv_path: str = "../../CV_Dicky_Pratama_Senior_Software_Engineer.pdf"
    photo_path: str = "../../1539957873424.jpeg"

    allowed_origins: str = "http://localhost:3000,http://localhost:5173,https://dicky-portfolio.vercel.app"

    session_token_budget: int = 8000
    session_ttl_minutes: int = 60
    rate_limit_per_minute: int = 20

    calendar_timezone: str = "Asia/Jakarta"

    google_oauth_client_id: str = ""
    google_oauth_client_secret: str = ""
    google_token_cache_path: str = "./.gcal_token.json"

    environment: str = "development"

    def get_allowed_origins(self) -> List[str]:
        if isinstance(self.allowed_origins, list):
            return self.allowed_origins
        return [origin.strip() for origin in self.allowed_origins.split(",")]


settings = Settings()
