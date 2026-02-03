# Rust Predictions API Gateway

High-performance API gateway written in Rust that forwards requests to the Python intelligence service.

## Architecture

```
Frontend → Rust Gateway (Port 3001) → Python Service (Port 8000)
```

## Features

- **FastAPI Gateway**: Axum-based high-performance HTTP server
- **Request Forwarding**: Forwards prediction requests to Python backend
- **CORS Support**: Handles cross-origin requests from frontend
- **Error Handling**: Graceful error responses
- **Environment Config**: Configurable via `.env` file

## Endpoints

### Health
- `GET /health` - Gateway health check

### Predictions
- `POST /predict/overload` - Forward overload prediction
- `POST /predict/outbreak-severity` - Forward outbreak severity
- `GET /predict/kpis` - Forward KPI snapshot

## Setup

1. Install Rust: https://rustup.rs/

2. Clone and build:
```bash
cd rust-predictions-api
cargo build --release
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Run:
```bash
cargo run
```

The gateway will start on `http://localhost:3001`

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `RUST_PORT` | 3001 | Port for the Rust gateway |
| `PYTHON_INTELLIGENCE_URL` | http://localhost:8000 | URL of the Python service |

## Development

- Uses Axum for the web framework
- Reqwest for HTTP client to Python service
- Serde for JSON serialization
- Tower HTTP for CORS middleware