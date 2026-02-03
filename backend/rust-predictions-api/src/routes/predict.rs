use axum::{Router, routing::post, routing::get, Json, extract::State};
use serde_json::Value;

use crate::AppState;
use crate::error::AppError;
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
) -> Result<Json<Value>, AppError> {
    // Convert request to JSON
    let payload = serde_json::to_value(request)?;

    // Call Python service
    let response = state.python_client.call_python("/predict/overload", payload).await?;
    
    Ok(Json(response))
}

async fn predict_outbreak_severity(
    State(state): State<AppState>,
    Json(request): Json<OutbreakSeverityRequest>,
) -> Result<Json<Value>, AppError> {
    // Convert request to JSON
    let payload = serde_json::to_value(request)?;

    // Call Python service
    let response = state.python_client.call_python("/predict/outbreak-severity", payload).await?;

    Ok(Json(response))
}

async fn get_kpis(
    State(state): State<AppState>,
) -> Result<Json<Value>, AppError> {
    // Call Python service
    let response = state.python_client.get_python("/predict/kpis").await?;

    Ok(Json(response))
}