# FastAPI Backend

This is the FastAPI backend for the React Flow pipeline application.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the backend server:
```bash
python -m uvicorn main:app --reload --port 8000
```

## API Endpoints

### POST /pipelines/parse
Parses a pipeline and returns DAG information.

**Request Body:**
```json
{
  "nodes": [
    {"id": "node1"},
    {"id": "node2"}
  ],
  "edges": [
    {"source": "node1", "target": "node2"}
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## DAG Validation

The backend performs basic DAG validation:
- Checks for self-loops (edges where source == target)
- Checks for duplicate edges
- Returns `is_dag: false` if any violations are found

## CORS

The backend is configured to accept requests from:
- http://localhost:3000
- http://localhost:3003 