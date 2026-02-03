use axum::Router;

pub mod health;
pub mod predict;

use crate::AppState;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .nest("/health", health::router())
        .nest("/predict", predict::router())
}