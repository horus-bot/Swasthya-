import os
from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Settings
    app_name: str = "GovAnalytics Healthcare API"
    debug: bool = True
    version: str = "1.0.0"

    # Supabase Settings
    supabase_url: Optional[str] = os.getenv("SUPABASE_URL")
    supabase_key: Optional[str] = os.getenv("SUPABASE_ANON_KEY")

    # ML Model Settings
    model_path: str = "./models/healthcare_predictor.pkl"

    # CORS Settings
    allowed_origins: list = ["http://localhost:3000", "https://gov-analytics.tn.gov.in"]

    class Config:
        env_file = ".env"

settings = Settings()