from fastapi import APIRouter, HTTPException
from app.services.routing_service import RoutingService
from app.services.placement_service import PlacementService
from app.schemas.recommend import (
    MobileUnitRequest,
    MobileUnitResponse,
    FacilityPlacementRequest,
    FacilityPlacementResponse,
    InterventionRequest,
    InterventionSimulationResponse
)

router = APIRouter()
routing_service = RoutingService()
placement_service = PlacementService()

@router.post("/recommend/mobile-units", response_model=MobileUnitResponse)
async def recommend_mobile_units(request: MobileUnitRequest):
    """Recommend mobile unit routes"""
    try:
        return await routing_service.recommend_mobile_units(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Mobile unit recommendation failed: {str(e)}")

@router.post("/recommend/facility-placement", response_model=FacilityPlacementResponse)
async def recommend_facility_placement(request: FacilityPlacementRequest):
    """Recommend facility placement locations"""
    try:
        return await placement_service.recommend_facility_placement(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Facility placement recommendation failed: {str(e)}")

@router.post("/simulate/intervention", response_model=InterventionSimulationResponse)
async def simulate_intervention(request: InterventionRequest):
    """Simulate intervention impact"""
    try:
        return await routing_service.simulate_intervention(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Intervention simulation failed: {str(e)}")