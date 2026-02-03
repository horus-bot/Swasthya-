use reqwest::Client;
use serde_json::Value;
use std::time::Duration;

pub struct PythonClient {
    client: Client,
    base_url: String,
}

impl PythonClient {
    pub fn new(base_url: String) -> Self {
        let client = Client::builder()
            .timeout(Duration::from_secs(30))
            .build()
            .expect("Failed to create HTTP client");

        Self { client, base_url }
    }

    pub async fn call_python(&self, endpoint: &str, payload: Value) -> Result<Value, Box<dyn std::error::Error>> {
        let url = format!("{}/api/v1{}", self.base_url, endpoint);

        let response = self.client
            .post(&url)
            .json(&payload)
            .send()
            .await?;

        if !response.status().is_success() {
            return Err(format!("Python service returned status: {}", response.status()).into());
        }

        let json_response: Value = response.json().await?;
        Ok(json_response)
    }

    pub async fn get_python(&self, endpoint: &str) -> Result<Value, Box<dyn std::error::Error>> {
        let url = format!("{}/api/v1{}", self.base_url, endpoint);

        let response = self.client
            .get(&url)
            .send()
            .await?;

        if !response.status().is_success() {
            return Err(format!("Python service returned status: {}", response.status()).into());
        }

        let json_response: Value = response.json().await?;
        Ok(json_response)
    }
}