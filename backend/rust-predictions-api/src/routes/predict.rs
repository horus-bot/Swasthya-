use axum::{Router, routing::post, routing::get, Json, extract::State};
use serde_json::Value;

use crate::AppState;
use crate::schemas::predict::{
    OverloadPredictionRequest,
    OutbreakSeverityRequest
};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/overload", post(predict_overload))
        .route("/outbreak-severity", post(predict_outbreak_severity))
        .route("/kpis", get(get_kpis))
}

async fn predict_overload(
    State(state): State<AppState>,
    Json(request): Json<OverloadPredictionRequest>,
) -> Json<Value> {
    // Convert request to JSON
    let payload = serde_json::to_value(request).unwrap();

    // Call Python service
    match state.python_client.call_python("/predict/overload", payload).await {
        Ok(response) => Json(response),
        Err(e) => {
            eprintln!("Error calling Python service: {}", e);
            Json(serde_json::json!({
                "error": "Failed to get overload prediction",
                "details": e.to_string()
            }))
        }
    }
}

async fn predict_outbreak_severity(
    State(state): State<AppState>,
    Json(request): Json<OutbreakSeverityRequest>,
) -> Json<Value> {
    // Convert request to JSON
    let payload = serde_json::to_value(request).unwrap();

    // Call Python service
    match state.python_client.call_python("/predict/outbreak-severity", payload).await {
        Ok(response) => Json(response),
        Err(e) => {
            eprintln!("Error calling Python service: {}", e);
            Json(serde_json::json!({
                "error": "Failed to get outbreak severity",
                "details": e.to_string()
            }))
        }
    }
}

async fn get_kpis(
    State(state): State<AppState>,
) -> Json<Value> {
    // Call Python service
    match state.python_client.get_python("/predict/kpis").await {
        Ok(response) => Json(response),
        Err(e) => {
            eprintln!("Error calling Python service: {}", e);
            Json(serde_json::json!({
                "error": "Failed to get KPIs",
                "details": e.to_string()
            }))
        }
    }
}