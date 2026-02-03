from fastapi import APIRouter, HTTPException
from app.services.overload_service import OverloadService
from app.services.outbreak_service import OutbreakService
from app.schemas.predict import (
    OverloadPredictionRequest,
    OverloadPredictionResponse,
    OutbreakSeverityRequest,
    OutbreakSeverityResponse,
    KPISnapshot
)

router = APIRouter()
overload_service = OverloadService()
outbreak_service = OutbreakService()

@router.post("/predict/overload", response_model=OverloadPredictionResponse)
async def predict_overload(request: OverloadPredictionRequest):
    """Predict facility overload risks"""
    try:
        return await overload_service.predict_overload_risks(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.post("/predict/outbreak-severity", response_model=OutbreakSeverityResponse)
async def predict_outbreak_severity(request: OutbreakSeverityRequest):
    """Predict outbreak severity"""
    try:
        return await outbreak_service.predict_outbreak_severity(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Severity prediction failed: {str(e)}")

@router.get("/predict/kpis", response_model=KPISnapshot)
async def get_kpi_snapshot():
    """Get current KPI snapshot for dashboard"""
    try:
        kpi_data = await overload_service.get_kpi_snapshot()
        return KPISnapshot(**kpi_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"KPI fetch failed: {str(e)}")