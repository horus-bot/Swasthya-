from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Mobile Unit Recommendation
class MobileUnitRequest(BaseModel):
    hotspots: List[dict]  # [{"lat": float, "lng": float, "urgency": str}]
    available_units: int
    max_stops_per_unit: int = 5

class UnitStop(BaseModel):
    lat: float
    lng: float
    estimated_patients: int
    priority: str

class MobileUnitRecommendation(BaseModel):
    unit_id: str
    stops: List[UnitStop]
    total_coverage: int
    estimated_patients_served: int

class MobileUnitResponse(BaseModel):
    recommendations: List[MobileUnitRecommendation]
    total_units_needed: int
    timestamp: datetime

# Facility Placement
class FacilityPlacementRequest(BaseModel):
    access_gap_zones: List[dict]  # [{"lat": float, "lng": float, "population": int, "current_coverage": float}]
    facility_type: str  # "PHC", "clinic", "mini_hospital"
    budget_limit: Optional[float] = None

class PlacementRecommendation(BaseModel):
    lat: float
    lng: float
    facility_type: str
    expected_coverage: int
    cost_estimate: float
    priority_score: float

class FacilityPlacementResponse(BaseModel):
    recommendations: List[PlacementRecommendation]
    total_cost: float
    total_coverage_gain: int
    timestamp: datetime

# Intervention Simulation
class InterventionRequest(BaseModel):
    intervention_type: str  # "add_clinic", "add_beds", "deploy_mobile"
    location: Optional[dict] = None  # {"lat": float, "lng": float}
    facility_id: Optional[str] = None
    zone: Optional[str] = None
    scale: int = 1  # number of clinics/beds/units

class InterventionImpact(BaseModel):
    avg_travel_time_reduction: float  # minutes
    overload_risk_reduction: float  # percentage
    population_covered_increase: int
    cost_estimate: float

class InterventionSimulationResponse(BaseModel):
    intervention: InterventionRequest
    impact: InterventionImpact
    confidence: str
    timestamp: datetime