# GovAnalytics Healthcare API

AI-powered healthcare analytics API for Tamil Nadu government dashboard.

## Features

- **Overload Prediction**: Predict facility overload risks
- **Outbreak Severity Scoring**: Assess disease outbreak severity
- **KPI Dashboard**: Real-time healthcare metrics
- **Mobile Unit Recommendations**: Optimize mobile healthcare deployment
- **Facility Placement**: Recommend new healthcare facility locations
- **Intervention Simulation**: Simulate impact of healthcare interventions

## Quick Start

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set environment variables (optional):
```bash
export SUPABASE_URL="your-supabase-url"
export SUPABASE_ANON_KEY="your-supabase-key"
```

3. Run the server:
```bash
uvicorn app.main:app --reload
```

4. Visit http://localhost:8000/docs for API documentation

## API Endpoints

### Health
- `GET /api/v1/health` - Health check

### Predictions
- `POST /api/v1/predict/overload` - Predict facility overload risks
- `POST /api/v1/predict/outbreak-severity` - Assess outbreak severity
- `GET /api/v1/predict/kpis` - Get dashboard KPIs

### Recommendations
- `POST /api/v1/recommend/mobile-units` - Recommend mobile unit routes
- `POST /api/v1/recommend/facility-placement` - Recommend facility locations
- `POST /api/v1/simulate/intervention` - Simulate intervention impact

## Architecture

- **API Layer** (`app/api/`): FastAPI route handlers
- **Schemas** (`app/schemas/`): Pydantic models for validation
- **Services** (`app/services/`): Business logic
- **Data** (`app/data/`): Data access layer
- **Utils** (`app/utils/`): Helper functions