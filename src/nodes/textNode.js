// textNode.js

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { FaFont } from 'react-icons/fa';
import { nodeStyles } from './nodeStyles';

// Regex to extract variable names from {{variableName}} patterns
// Matches: {{foo}}, {{ bar }}, {{baz123}}, but not {{ invalid-var }}
const VARIABLE_REGEX = /{{\s*([a-zA-Z_]\w*)\s*}}/g;

// Extract unique variable names from text
const extractVariables = (text) => {
  const variables = new Set();
  let match;
  
  // Reset regex state for global matching
  VARIABLE_REGEX.lastIndex = 0;
  
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    variables.add(match[1]); // match[1] contains the variable name
  }
  
  return Array.from(variables);
};

// Debounced resize calculation using requestAnimationFrame
const useDebouncedResize = (callback, delay = 16) => {
  const timeoutRef = useRef();
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      cancelAnimationFrame(timeoutRef.current);
    }
    
    timeoutRef.current = requestAnimationFrame(() => {
      callback(...args);
    });
  }, [callback]);
};

const TextNodeContent = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeWidth, setNodeWidth] = useState(140);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  
  // Extract variables whenever text changes
  useEffect(() => {
    const extractedVars = extractVariables(currText);
    setVariables(extractedVars);
    
    // Update node internals when variables change
    updateNodeInternals(id);
  }, [currText, id, updateNodeInternals]);
  
  // Auto-resize textarea height
  const resizeTextarea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);
  
  // Debounced width calculation
  const updateNodeWidth = useDebouncedResize((text) => {
    const calculatedWidth = Math.min(400, Math.max(140, text.length * 0.6));
    setNodeWidth(calculatedWidth);
  });
  
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    
    // Resize textarea immediately
    resizeTextarea();
    
    // Update node width with debouncing
    updateNodeWidth(newText);
  };
  
  // Initial resize on mount
  useEffect(() => {
    resizeTextarea();
    updateNodeWidth(currText);
  }, [resizeTextarea, updateNodeWidth, currText]);
  
  return (
    <div className="space-y-3" style={{ width: `${nodeWidth}px` }}>
      <div>
        <label className={nodeStyles.content.label}>
          Text Content:
          <textarea 
            ref={textareaRef}
            value={currText} 
            onChange={handleTextChange}
            className="node-textarea"
            placeholder="Enter text or use {{variableName}} for dynamic content..."
            rows="3"
            style={{ 
              height: 'auto',
              resize: 'none',
              overflow: 'hidden'
            }}
            aria-label="Text node content"
          />
        </label>
      </div>
      
      {/* Variable preview badge */}
      {variables.length > 0 && (
        <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
          <span className="font-medium">Variables:</span> {variables.join(', ')}
        </div>
      )}
      
      <div className="text-xs text-gray-600">
        <span className="font-medium">Preview:</span> {currText.length > 30 ? currText.substring(0, 30) + '...' : currText}
      </div>
    </div>
  );
};

// Create the TextNode with dynamic handles
const TextNode = React.memo(({ id, data, selected }) => {
  const [variables, setVariables] = useState([]);
  const updateNodeInternals = useUpdateNodeInternals();
  
  // Extract variables from the current text
  useEffect(() => {
    const text = data?.text || '{{input}}';
    const extractedVars = extractVariables(text);
    setVariables(extractedVars);
  }, [data?.text]);
  
  // Update node internals when variables change
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);
  
  return (
    <div className={`${nodeStyles.container.base} ${selected ? nodeStyles.container.selected : ''}`}>
      {/* Dynamic Input Handles for Variables */}
      {variables.map((varName, index) => (
        <Handle
          key={`input-${varName}`}
          type="target"
          position={Position.Left}
          id={`var-${varName}`}
          style={{
            top: `${60 + index * 20}px`,
            ...nodeStyles.handle.target
          }}
          className={nodeStyles.handle.target}
        />
      ))}
      
      {/* Header */}
      <div className={`${nodeStyles.header.base} ${nodeStyles.types.text.header}`}>
        <div className="flex items-center gap-2">
          <FaFont className={`${nodeStyles.header.icon} ${nodeStyles.types.text.icon}`} />
          <span className={nodeStyles.header.title}>Text</span>
        </div>
      </div>
      
      {/* Content */}
      <div className={nodeStyles.content.base}>
        <TextNodeContent id={id} data={data} />
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          top: '50%',
          ...nodeStyles.handle.source
        }}
        className={nodeStyles.handle.source}
      />
    </div>
  );
});

TextNode.displayName = 'TextNode';

export { TextNode };
