from typing import List, Dict, Any
from datetime import datetime
from app.data.supabase_client import supabase_client
from app.data.feature_builder import FeatureBuilder
from app.utils.scoring import ScoringUtils
from app.schemas.predict import OverloadPredictionRequest, OverloadPredictionResponse, OverloadRisk

class OverloadService:
    async def predict_overload_risks(self, request: OverloadPredictionRequest) -> OverloadPredictionResponse:
        """Predict overload risks for facilities"""
        predictions = []

        for facility_id in request.facility_ids:
            # Fetch facility data
            facility_data = await supabase_client.get_facility_data([facility_id])
            if not facility_data:
                continue

            facility = facility_data[0]

            # Build features
            features = FeatureBuilder.build_overload_features(facility, request.time_window_days)

            # Score risk
            risk_result = ScoringUtils.score_overload_risk(features)

            # Create prediction
            prediction = OverloadRisk(
                facility_id=facility_id,
                risk_level=risk_result["risk_level"],
                predicted_overload_days=risk_result["predicted_overload_days"],
                reasons=risk_result["reasons"] if request.include_reasons else []
            )
            predictions.append(prediction)

        return OverloadPredictionResponse(
            predictions=predictions,
            timestamp=datetime.utcnow()
        )

    async def get_kpi_snapshot(self) -> Dict[str, Any]:
        """Get current KPI snapshot"""
        kpi_data = await supabase_client.get_kpi_data()
        kpi_data["timestamp"] = datetime.utcnow()
        return kpi_data