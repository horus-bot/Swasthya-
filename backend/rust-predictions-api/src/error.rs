use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

#[derive(Debug)]
pub enum AppError {
    PythonServiceError(String),
    NetworkError(String),
    SerializationError(String),
    // ConfigurationError(String), // Not used yet
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            AppError::PythonServiceError(msg) => (StatusCode::BAD_GATEWAY, msg),
            AppError::NetworkError(msg) => (StatusCode::SERVICE_UNAVAILABLE, msg),
            AppError::SerializationError(msg) => (StatusCode::INTERNAL_SERVER_ERROR, msg),
        };

        let body = Json(json!({
            "status": "error",
            "message": error_message,
        }));

        (status, body).into_response()
    }
}

impl From<reqwest::Error> for AppError {
    fn from(err: reqwest::Error) -> Self {
        if err.is_connect() || err.is_timeout() {
            AppError::NetworkError(format!("Connection to Python service failed: {}", err))
        } else {
            AppError::PythonServiceError(format!("Python service error: {}", err))
        }
    }
}

impl From<serde_json::Error> for AppError {
    fn from(err: serde_json::Error) -> Self {
        AppError::SerializationError(format!("Serialization error: {}", err))
    }
}
