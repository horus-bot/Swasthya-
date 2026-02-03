from typing import List, Dict, Any
from datetime import datetime
from app.data.supabase_client import supabase_client
from app.data.feature_builder import FeatureBuilder
from app.utils.scoring import ScoringUtils
from app.schemas.recommend import (
    MobileUnitRequest,
    MobileUnitResponse,
    MobileUnitRecommendation,
    UnitStop,
    InterventionRequest,
    InterventionSimulationResponse,
    InterventionImpact
)

class RoutingService:
    async def recommend_mobile_units(self, request: MobileUnitRequest) -> MobileUnitResponse:
        """Recommend mobile unit routes and stops"""

        # Get hotspots
        hotspots = await supabase_client.get_hotspots()

        # Sort hotspots by priority
        hotspots.sort(key=lambda h: ScoringUtils.score_mobile_unit_priority(h), reverse=True)

        # Simple assignment: assign top hotspots to units
        recommendations = []
        total_coverage = 0
        total_patients = 0

        for i in range(min(request.available_units, len(hotspots))):
            unit_id = f"unit_{i+1}"
            stops = []

            # Assign stops to this unit (simple round-robin for demo)
            for j in range(min(request.max_stops_per_unit, len(hotspots) - i)):
                hotspot = hotspots[i + j * request.available_units]
                if hotspot:
                    stop = UnitStop(
                        lat=hotspot["lat"],
                        lng=hotspot["lng"],
                        estimated_patients=int(hotspot["population"] * 0.1),  # Estimate 10% seek care
                        priority=hotspot["urgency"]
                    )
                    stops.append(stop)
                    total_patients += stop.estimated_patients

            if stops:
                recommendation = MobileUnitRecommendation(
                    unit_id=unit_id,
                    stops=stops,
                    total_coverage=len(stops),
                    estimated_patients_served=total_patients
                )
                recommendations.append(recommendation)
                total_coverage += len(stops)

        return MobileUnitResponse(
            recommendations=recommendations,
            total_units_needed=min(request.available_units, len(hotspots)),
            timestamp=datetime.utcnow()
        )

    async def simulate_intervention(self, request: InterventionRequest) -> InterventionSimulationResponse:
        """Simulate the impact of an intervention"""

        # Base impact calculations (simplified)
        base_impact = {
            "avg_travel_time_reduction": 0.0,
            "overload_risk_reduction": 0.0,
            "population_covered_increase": 0,
            "cost_estimate": 0.0
        }

        if request.intervention_type == "add_clinic":
            # Simulate adding a clinic
            base_impact["avg_travel_time_reduction"] = 15.0 * request.scale  # 15 min reduction per clinic
            base_impact["population_covered_increase"] = 5000 * request.scale
            base_impact["cost_estimate"] = 500000 * request.scale  # Cost per clinic

        elif request.intervention_type == "add_beds":
            # Simulate adding beds to facility
            base_impact["overload_risk_reduction"] = 5.0 * request.scale  # 5% risk reduction per bed
            base_impact["cost_estimate"] = 100000 * request.scale  # Cost per bed

        elif request.intervention_type == "deploy_mobile":
            # Simulate deploying mobile unit
            base_impact["avg_travel_time_reduction"] = 10.0 * request.scale
            base_impact["population_covered_increase"] = 2000 * request.scale
            base_impact["cost_estimate"] = 50000 * request.scale  # Daily cost per unit

        impact = InterventionImpact(**base_impact)

        return InterventionSimulationResponse(
            intervention=request,
            impact=impact,
            confidence="Medium",  # Based on historical data
            timestamp=datetime.utcnow()
        )