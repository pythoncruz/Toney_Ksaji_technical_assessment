import React from 'react';
import BaseNode from './BaseNode';

/**
 * Creates a memoized React Flow node component
 * @param {Object} config - Node configuration
 * @param {string} config.title - Node title
 * @param {React.Component} config.icon - Icon component
 * @param {Array|Function} config.inputs - Input handle configurations (array or function returning array)
 * @param {Array|Function} config.outputs - Output handle configurations (array or function returning array)
 * @param {Function} config.render - Function to render node content
 * @param {string} config.nodeType - Node type for styling
 * @returns {React.Component} Memoized node component
 */
export const createNode = (config) => {
  const {
    title,
    icon,
    inputs = [],
    outputs = [],
    render,
    nodeType = 'default'
  } = config;

  const NodeComponent = React.memo(({ id, data, selected }) => {
    // Create context object for dynamic inputs/outputs
    const nodeContext = { id, data, selected };
    
    return (
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title={title}
        icon={icon}
        inputs={inputs}
        outputs={outputs}
        nodeType={nodeType}
      >
        {render ? render(nodeContext) : null}
      </BaseNode>
    );
  });

  NodeComponent.displayName = `${title}Node`;
  return NodeComponent;
}; 