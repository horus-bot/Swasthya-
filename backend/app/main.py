from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import health, predict, recommend
from app.core.config import settings
from app.core.logging import logger

app = FastAPI(
    title="GovAnalytics Healthcare API",
    description="AI-powered healthcare analytics for Tamil Nadu government",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://gov-analytics.tn.gov.in"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api/v1", tags=["health"])
app.include_router(predict.router, prefix="/api/v1", tags=["predictions"])
app.include_router(recommend.router, prefix="/api/v1", tags=["recommendations"])

@app.on_event("startup")
async def startup_event():
    logger.info("GovAnalytics Healthcare API starting up")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("GovAnalytics Healthcare API shutting down")

@app.get("/")
async def root():
    return {"message": "GovAnalytics Healthcare API", "status": "running"}