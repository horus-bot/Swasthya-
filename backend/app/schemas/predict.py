from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Overload Prediction
class OverloadPredictionRequest(BaseModel):
    facility_ids: List[str]
    time_window_days: int = 7
    include_reasons: bool = True

class OverloadRisk(BaseModel):
    facility_id: str
    risk_level: str  # "Safe", "Watch", "Critical"
    predicted_overload_days: int
    reasons: List[str]

class OverloadPredictionResponse(BaseModel):
    predictions: List[OverloadRisk]
    timestamp: datetime

# Outbreak Severity
class OutbreakSeverityRequest(BaseModel):
    area: str
    disease: str
    recent_reports: int
    lab_confirmations: int = 0
    population_density: float = 0.0

class OutbreakSeverityResponse(BaseModel):
    severity: str  # "Low", "Medium", "High"
    confidence: str  # "Low", "Medium", "High"
    reasons: List[str]
    timestamp: datetime

# KPI Snapshot
class KPISnapshot(BaseModel):
    facilities_at_risk: int
    avg_bed_occupancy: float
    icu_occupancy: float
    opd_today: int
    avg_travel_time: float
    active_outbreaks: int
    mobile_units_active: int
    timestamp: datetime