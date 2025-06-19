import React, { useMemo } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { nodeStyles } from './nodeStyles';

const BaseNode = React.memo(({ 
  id, 
  data, 
  selected,
  title, 
  icon: Icon, 
  inputs = [], 
  outputs = [], 
  children,
  nodeType = 'default'
}) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const typeStyles = nodeStyles.types[nodeType] || nodeStyles.types.text;
  
  // Handle dynamic inputs - can be array or function returning array
  const resolvedInputs = useMemo(() => {
    if (typeof inputs === 'function') {
      return inputs({ id, data, selected }) || [];
    }
    return inputs;
  }, [inputs, id, data, selected]);
  
  // Handle dynamic outputs - can be array or function returning array
  const resolvedOutputs = useMemo(() => {
    if (typeof outputs === 'function') {
      return outputs({ id, data, selected }) || [];
    }
    return outputs;
  }, [outputs, id, data, selected]);
  
  // Update node internals when inputs/outputs change
  React.useEffect(() => {
    updateNodeInternals(id);
  }, [resolvedInputs, resolvedOutputs, id, updateNodeInternals]);
  
  return (
    <div className={`${nodeStyles.container.base} ${selected ? nodeStyles.container.selected : ''}`}>
      {/* Input Handles */}
      {resolvedInputs.map((input, index) => (
        <Handle
          key={`input-${input.id || index}`}
          type="target"
          position={Position.Left}
          id={input.id || `${id}-${input.name}`}
          style={{
            top: input.position || `${((index + 1) * 100) / (resolvedInputs.length + 1)}%`,
            ...input.style
          }}
          className={nodeStyles.handle.target}
        />
      ))}
      
      {/* Header */}
      <div className={`${nodeStyles.header.base} ${typeStyles.header}`}>
        <div className="flex items-center gap-2">
          {Icon && <Icon className={`${nodeStyles.header.icon} ${typeStyles.icon}`} />}
          <span className={nodeStyles.header.title}>{title}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className={nodeStyles.content.base}>
        {children}
      </div>
      
      {/* Output Handles */}
      {resolvedOutputs.map((output, index) => (
        <Handle
          key={`output-${output.id || index}`}
          type="source"
          position={Position.Right}
          id={output.id || `${id}-${output.name}`}
          style={{
            top: output.position || `${((index + 1) * 100) / (resolvedOutputs.length + 1)}%`,
            ...output.style
          }}
          className={nodeStyles.handle.source}
        />
      ))}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';

export default BaseNode; 