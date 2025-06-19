// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            // Prepare the request payload
            const pipelineData = {
                nodes: nodes.map(node => ({ id: node.id })),
                edges: edges.map(edge => ({ 
                    source: edge.source, 
                    target: edge.target 
                }))
            };

            console.log('Submitting pipeline:', pipelineData);

            // Send POST request to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Display the results in an alert
            const message = `Pipeline Analysis Results:
• Number of nodes: ${result.num_nodes}
• Number of edges: ${result.num_edges}
• Is DAG: ${result.is_dag ? 'Yes' : 'No'}`;
            
            alert(message);
            
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            
            // Fallback: provide mock response for testing when backend is not available
            if (error.message.includes('fetch')) {
                const mockResult = {
                    num_nodes: nodes.length,
                    num_edges: edges.length,
                    is_dag: edges.length === 0 || !edges.some(edge => edge.source === edge.target)
                };
                
                const message = `Pipeline Analysis Results (Mock - Backend not available):
• Number of nodes: ${mockResult.num_nodes}
• Number of edges: ${mockResult.num_edges}
• Is DAG: ${mockResult.is_dag ? 'Yes' : 'No'}

Note: This is a mock response. Start the backend server to get real analysis.`;
                
                alert(message);
            } else {
                alert(`Error submitting pipeline: ${error.message}`);
            }
        }
    };

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px',
            marginTop: '20px'
        }}>
            <button 
                type="button" 
                onClick={handleSubmit}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0056b3';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#007bff';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
