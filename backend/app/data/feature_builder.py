from typing import Dict, List, Any
import pandas as pd
from datetime import datetime, timedelta

class FeatureBuilder:
    @staticmethod
    def build_overload_features(facility_data: Dict[str, Any], time_window_days: int = 7) -> Dict[str, Any]:
        """Build features for overload prediction"""
        features = {
            "current_bed_occupancy": facility_data.get("bed_occupancy", 0),
            "current_icu_occupancy": facility_data.get("icu_occupancy", 0),
            "current_opd_load": facility_data.get("opd_load", 0),
            "time_window_days": time_window_days,
            "zone": facility_data.get("zone", "Unknown"),
            "is_weekend": datetime.now().weekday() >= 5,
            "hour_of_day": datetime.now().hour
        }
        return features

    @staticmethod
    def build_outbreak_features(area: str, disease: str, reports: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Build features for outbreak severity prediction"""
        df = pd.DataFrame(reports)
        if not df.empty:
            df['date'] = pd.to_datetime(df['date'])
            df = df.sort_values('date')

            # Calculate trends
            recent_cases = df.tail(7)['cases'].sum()
            previous_cases = df.head(len(df)-7)['cases'].sum() if len(df) > 7 else 0

            trend = "stable"
            if recent_cases > previous_cases * 1.2:
                trend = "increasing"
            elif recent_cases < previous_cases * 0.8:
                trend = "decreasing"

            features = {
                "total_cases": df['cases'].sum(),
                "recent_cases_7d": recent_cases,
                "trend": trend,
                "area": area,
                "disease": disease,
                "days_since_first_report": (datetime.now() - df['date'].min()).days if not df.empty else 0
            }
        else:
            features = {
                "total_cases": 0,
                "recent_cases_7d": 0,
                "trend": "stable",
                "area": area,
                "disease": disease,
                "days_since_first_report": 0
            }

        return features

    @staticmethod
    def build_mobile_unit_features(hotspots: List[Dict[str, Any]], available_units: int) -> Dict[str, Any]:
        """Build features for mobile unit optimization"""
        total_population = sum(h['population'] for h in hotspots)
        high_urgency_count = sum(1 for h in hotspots if h['urgency'] == 'high')

        features = {
            "total_hotspots": len(hotspots),
            "high_urgency_hotspots": high_urgency_count,
            "total_population_affected": total_population,
            "available_units": available_units,
            "population_per_unit": total_population / available_units if available_units > 0 else 0
        }
        return features

    @staticmethod
    def build_placement_features(gap_zones: List[Dict[str, Any]], facility_type: str) -> List[Dict[str, Any]]:
        """Build features for facility placement optimization"""
        features_list = []
        for zone in gap_zones:
            features = {
                "population": zone['population'],
                "current_coverage": zone.get('current_coverage', 0),
                "coverage_gap": 1 - zone.get('current_coverage', 0),
                "facility_type": facility_type,
                "lat": zone['lat'],
                "lng": zone['lng']
            }
            features_list.append(features)
        return features_list