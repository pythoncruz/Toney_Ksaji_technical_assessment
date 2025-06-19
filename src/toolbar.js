// toolbar.js

import { DraggableNode } from './draggableNode';
import { getNodesByCategory } from './nodes/registry';

export const PipelineToolbar = () => {
    const nodeCategories = getNodesByCategory();

    return (
        <div style={{ 
            padding: '16px', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{ marginTop: '0' }}>
                <h2 style={{ 
                    margin: '0 0 20px 0', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: '#1e293b',
                    letterSpacing: '-0.025em'
                }}>
                    Node Library
                </h2>
                {Object.entries(nodeCategories).map(([category, nodes]) => (
                    <div key={category} style={{ marginBottom: '24px' }}>
                        <h3 style={{ 
                            margin: '0 0 12px 0', 
                            fontSize: '14px', 
                            fontWeight: '600',
                            color: '#374151',
                            borderBottom: '2px solid #e5e7eb',
                            paddingBottom: '8px',
                            letterSpacing: '0.025em'
                        }}>
                            {category}
                        </h3>
                        <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '12px' 
                        }}>
                            {nodes.map((node) => (
                                <DraggableNode 
                                    key={node.type}
                                    type={node.type} 
                                    label={node.title} 
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
