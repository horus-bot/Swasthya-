from typing import Dict, Any
from datetime import datetime
from app.data.supabase_client import supabase_client
from app.data.feature_builder import FeatureBuilder
from app.utils.scoring import ScoringUtils
from app.schemas.predict import OutbreakSeverityRequest, OutbreakSeverityResponse

class OutbreakService:
    async def predict_outbreak_severity(self, request: OutbreakSeverityRequest) -> OutbreakSeverityResponse:
        """Predict outbreak severity for given area and disease"""

        # Fetch outbreak reports
        reports = await supabase_client.get_outbreak_reports(request.area, request.disease)

        # Add current request data to reports
        current_report = {
            "date": datetime.now().date().isoformat(),
            "cases": request.recent_reports,
            "area": request.area,
            "disease": request.disease
        }
        reports.append(current_report)

        # Build features
        features = FeatureBuilder.build_outbreak_features(
            request.area,
            request.disease,
            reports
        )

        # Add lab confirmations factor
        features["lab_confirmations"] = request.lab_confirmations
        features["population_density"] = request.population_density

        # Score severity
        severity_result = ScoringUtils.score_outbreak_severity(features)

        return OutbreakSeverityResponse(
            severity=severity_result["severity"],
            confidence=severity_result["confidence"],
            reasons=severity_result["reasons"],
            timestamp=datetime.utcnow()
        )