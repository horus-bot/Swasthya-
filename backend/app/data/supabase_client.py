import os
from typing import List, Dict, Any
from supabase import create_client, Client
from app.core.config import settings

class SupabaseClient:
    def __init__(self):
        self.client: Client = create_client(
            supabase_url=settings.supabase_url or os.getenv("SUPABASE_URL", ""),
            supabase_key=settings.supabase_key or os.getenv("SUPABASE_ANON_KEY", "")
        )

    async def get_facility_data(self, facility_ids: List[str]) -> List[Dict[str, Any]]:
        """Fetch facility data from Supabase"""
        # Mock implementation - replace with actual Supabase query
        return [
            {
                "id": fid,
                "name": f"Facility {fid}",
                "bed_occupancy": 75.0,
                "icu_occupancy": 60.0,
                "opd_load": 150,
                "zone": "North",
                "lat": 13.0827,
                "lng": 80.2707
            } for fid in facility_ids
        ]

    async def get_outbreak_reports(self, area: str, disease: str) -> List[Dict[str, Any]]:
        """Fetch outbreak reports"""
        # Mock implementation
        return [
            {"date": "2024-01-01", "cases": 10, "area": area, "disease": disease},
            {"date": "2024-01-02", "cases": 15, "area": area, "disease": disease},
        ]

    async def get_hotspots(self) -> List[Dict[str, Any]]:
        """Fetch current hotspots"""
        # Mock implementation
        return [
            {"lat": 13.0827, "lng": 80.2707, "urgency": "high", "population": 50000},
            {"lat": 13.0527, "lng": 80.2507, "urgency": "medium", "population": 30000},
        ]

    async def get_kpi_data(self) -> Dict[str, Any]:
        """Fetch KPI data"""
        # Mock implementation
        return {
            "facilities_at_risk": 3,
            "avg_bed_occupancy": 78.5,
            "icu_occupancy": 65.2,
            "opd_today": 12450,
            "avg_travel_time": 24.5,
            "active_outbreaks": 2,
            "mobile_units_active": 15
        }

# Global instance
supabase_client = SupabaseClient()