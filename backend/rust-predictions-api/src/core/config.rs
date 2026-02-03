use std::env;

#[derive(Debug, Clone)]
pub struct Config {
    pub rust_port: u16,
    pub python_intelligence_url: String,
}

impl Config {
    pub fn from_env() -> Self {
        Self {
            rust_port: env::var("RUST_PORT")
                .unwrap_or_else(|_| "3001".to_string())
                .parse()
                .expect("RUST_PORT must be a valid port number"),
            python_intelligence_url: env::var("PYTHON_INTELLIGENCE_URL")
                .unwrap_or_else(|_| "http://localhost:8000".to_string()),
        }
    }
}