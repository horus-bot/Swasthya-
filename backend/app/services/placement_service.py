from typing import List, Dict, Any
from datetime import datetime
from app.data.feature_builder import FeatureBuilder
from app.utils.scoring import ScoringUtils
from app.schemas.recommend import FacilityPlacementRequest, FacilityPlacementResponse, PlacementRecommendation

class PlacementService:
    async def recommend_facility_placement(self, request: FacilityPlacementRequest) -> FacilityPlacementResponse:
        """Recommend optimal facility placement locations"""

        # Build features for each gap zone
        zone_features = FeatureBuilder.build_placement_features(
            request.access_gap_zones,
            request.facility_type
        )

        # Score and rank locations
        scored_zones = []
        for features in zone_features:
            score = ScoringUtils.score_facility_placement(features)
            features["priority_score"] = score
            scored_zones.append(features)

        # Sort by priority score
        scored_zones.sort(key=lambda x: x["priority_score"], reverse=True)

        # Create recommendations (limit to top 5 or budget)
        recommendations = []
        total_cost = 0
        total_coverage = 0

        cost_per_facility = {
            "PHC": 2000000,
            "clinic": 1000000,
            "mini_hospital": 5000000
        }.get(request.facility_type, 1000000)

        for zone in scored_zones[:5]:  # Top 5 recommendations
            if request.budget_limit and total_cost + cost_per_facility > request.budget_limit:
                break

            recommendation = PlacementRecommendation(
                lat=zone["lat"],
                lng=zone["lng"],
                facility_type=request.facility_type,
                expected_coverage=int(zone["population"] * 0.8),  # Estimate 80% coverage
                cost_estimate=cost_per_facility,
                priority_score=round(zone["priority_score"], 2)
            )
            recommendations.append(recommendation)
            total_cost += cost_per_facility
            total_coverage += recommendation.expected_coverage

        return FacilityPlacementResponse(
            recommendations=recommendations,
            total_cost=total_cost,
            total_coverage_gain=total_coverage,
            timestamp=datetime.utcnow()
        )