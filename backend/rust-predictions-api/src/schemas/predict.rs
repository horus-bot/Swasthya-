use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct OverloadPredictionRequest {
    pub facility_ids: Vec<String>,
    pub time_window_days: Option<i32>,
    pub include_reasons: Option<bool>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct OverloadRisk {
    pub facility_id: String,
    pub risk_level: String,
    pub predicted_overload_days: i32,
    pub reasons: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct OverloadPredictionResponse {
    pub predictions: Vec<OverloadRisk>,
    pub timestamp: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct OutbreakSeverityRequest {
    pub area: String,
    pub disease: String,
    pub recent_reports: i32,
    pub lab_confirmations: Option<i32>,
    pub population_density: Option<f64>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct OutbreakSeverityResponse {
    pub severity: String,
    pub confidence: String,
    pub reasons: Vec<String>,
    pub timestamp: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct KPISnapshot {
    pub facilities_at_risk: i32,
    pub avg_bed_occupancy: f64,
    pub icu_occupancy: f64,
    pub opd_today: i32,
    pub avg_travel_time: f64,
    pub active_outbreaks: i32,
    pub mobile_units_active: i32,
    pub timestamp: String,
}