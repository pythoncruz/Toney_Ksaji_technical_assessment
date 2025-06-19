from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3003"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    """
    Parse a pipeline and return DAG information.
    
    Args:
        pipeline: PipelineRequest containing nodes and edges
        
    Returns:
        PipelineResponse with node count, edge count, and DAG status
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # Simple DAG check: ensure no self-loops and no duplicate edges
    is_dag = True
    
    # Check for self-loops
    for edge in pipeline.edges:
        if edge.source == edge.target:
            is_dag = False
            break
    
    # Check for duplicate edges (if DAG is still valid)
    if is_dag:
        edge_pairs = set()
        for edge in pipeline.edges:
            edge_pair = (edge.source, edge.target)
            if edge_pair in edge_pairs:
                is_dag = False
                break
            edge_pairs.add(edge_pair)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag
    )
