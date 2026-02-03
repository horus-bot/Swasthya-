use tower_http::cors::CorsLayer;
use std::net::SocketAddr;
use dotenvy::dotenv;
use std::sync::Arc;

mod core;
mod routes;
mod services;
mod schemas;

use crate::core::config::Config;
use crate::services::python_client::PythonClient;

#[derive(Clone)]
pub struct AppState {
    pub python_client: Arc<PythonClient>,
}

#[tokio::main]
async fn main() {
    // Load environment variables
    dotenv().ok();

    // Load configuration
    let config = Config::from_env();

    // Create Python client
    let python_client = Arc::new(PythonClient::new(config.python_intelligence_url));

    // Create app state
    let state = AppState { python_client };

    // Build the application router
    let app = routes::create_router().with_state(state);

    // Add CORS middleware
    let app = app.layer(CorsLayer::permissive());

    // Define the address
    let addr = SocketAddr::from(([0, 0, 0, 0], config.rust_port));

    println!("🚀 Rust Predictions API listening on {}", addr);

    // Start the server
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}