from typing import Dict, Any, List

class ScoringUtils:
    @staticmethod
    def score_overload_risk(features: Dict[str, Any]) -> Dict[str, Any]:
        """Score overload risk based on features"""
        bed_occ = features.get("current_bed_occupancy", 0)
        icu_occ = features.get("current_icu_occupancy", 0)
        opd_load = features.get("current_opd_load", 0)

        # Simple scoring logic
        risk_score = 0
        reasons = []

        if bed_occ > 90:
            risk_score += 3
            reasons.append("Bed occupancy >90%")
        elif bed_occ > 75:
            risk_score += 2
            reasons.append("Bed occupancy >75%")

        if icu_occ > 80:
            risk_score += 3
            reasons.append("ICU occupancy >80%")
        elif icu_occ > 60:
            risk_score += 2
            reasons.append("ICU occupancy >60%")

        if opd_load > 200:
            risk_score += 2
            reasons.append("High OPD load")

        # Determine risk level
        if risk_score >= 5:
            risk_level = "Critical"
        elif risk_score >= 3:
            risk_level = "Watch"
        else:
            risk_level = "Safe"

        # Predict overload days (simplified)
        predicted_days = max(0, risk_score - 2)

        return {
            "risk_level": risk_level,
            "predicted_overload_days": predicted_days,
            "reasons": reasons
        }

    @staticmethod
    def score_outbreak_severity(features: Dict[str, Any]) -> Dict[str, Any]:
        """Score outbreak severity"""
        total_cases = features.get("total_cases", 0)
        recent_cases = features.get("recent_cases_7d", 0)
        trend = features.get("trend", "stable")

        severity_score = 0
        confidence = "Medium"
        reasons = []

        if total_cases > 100:
            severity_score += 3
            reasons.append("High total cases")
        elif total_cases > 50:
            severity_score += 2
            reasons.append("Moderate total cases")

        if recent_cases > 20:
            severity_score += 3
            reasons.append("High recent cases")
        elif recent_cases > 10:
            severity_score += 2
            reasons.append("Rising recent cases")

        if trend == "increasing":
            severity_score += 2
            reasons.append("Cases increasing")

        # Determine severity
        if severity_score >= 6:
            severity = "High"
        elif severity_score >= 3:
            severity = "Medium"
        else:
            severity = "Low"

        # Confidence based on data quality
        if len(reasons) >= 3:
            confidence = "High"
        elif len(reasons) <= 1:
            confidence = "Low"

        return {
            "severity": severity,
            "confidence": confidence,
            "reasons": reasons
        }

    @staticmethod
    def score_mobile_unit_priority(hotspot: Dict[str, Any]) -> float:
        """Score priority for mobile unit stops"""
        urgency_weights = {"high": 1.0, "medium": 0.7, "low": 0.4}
        urgency = hotspot.get("urgency", "low")
        population = hotspot.get("population", 0)

        return urgency_weights.get(urgency, 0.4) * (population / 10000)

    @staticmethod
    def score_facility_placement(zone_features: Dict[str, Any]) -> float:
        """Score facility placement priority"""
        population = zone_features.get("population", 0)
        coverage_gap = zone_features.get("coverage_gap", 0)

        return (population / 10000) * coverage_gap