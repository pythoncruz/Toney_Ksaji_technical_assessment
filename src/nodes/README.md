# React Flow Node System

This directory contains a refactored and scalable node system for React Flow, designed to eliminate code duplication and provide a clean abstraction for creating new nodes.

## Architecture

### Core Components

- **`BaseNode.jsx`** - The foundation component that provides consistent layout and styling
- **`createNode.js`** - Utility function that generates memoized node components
- **`nodeStyles.js`** - Shared styling configuration using Tailwind CSS
- **`registry.js`** - Central registry mapping node types to components

### Node Structure

Each node follows this pattern:
```javascript
const NodeContent = ({ id, data }) => {
  // Node-specific logic and state
  return (
    <div>
      {/* Node content */}
    </div>
  );
};

const NodeName = createNode({
  title: 'Node Title',
  icon: IconComponent,
  nodeType: 'nodetype',
  inputs: [{ name: 'input1', id: 'input1' }],
  outputs: [{ name: 'output1', id: 'output1' }],
  render: NodeContent
});
```

## Available Nodes

### Data Nodes
- **InputNode** - Data input with configurable name and type
- **OutputNode** - Data output with configurable name and type  
- **TextNode** - Text processing and manipulation
- **MarkdownNode** - Convert markdown to HTML
- **RandomNumberNode** - Generate random numbers within a range

### AI Nodes
- **LLMNode** - Large Language Model processing

### Control Nodes
- **TimerNode** - Timer that fires on interval
- **SwitchNode** - Route data based on boolean conditions

### Network Nodes
- **HttpRequestNode** - Make HTTP requests and return responses

## Creating New Nodes

### 1. Create the Node Content Component
```javascript
import { useState } from 'react';
import { FaIcon } from 'react-icons/fa';
import { createNode } from './createNode';
import { nodeStyles } from './nodeStyles';

const MyNodeContent = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || '');
  
  return (
    <div className="space-y-2">
      <label className={nodeStyles.content.label}>
        Value:
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          className={nodeStyles.content.input}
        />
      </label>
    </div>
  );
};
```

### 2. Create the Node Using createNode
```javascript
const MyNode = createNode({
  title: 'My Node',
  icon: FaIcon,
  nodeType: 'mynode',
  inputs: [
    { name: 'input1', id: 'input1' }
  ],
  outputs: [
    { name: 'output1', id: 'output1' }
  ],
  render: MyNodeContent
});
```

### 3. Add to Registry
```javascript
// In registry.js
import { MyNode } from './MyNode';

export const nodeTypes = {
  // ... existing nodes
  mynode: MyNode,
};

export const nodeMetadata = {
  // ... existing metadata
  mynode: {
    title: 'My Node',
    description: 'Description of what this node does',
    category: 'Data',
    icon: 'FaIcon',
  },
};
```

## Styling

The system uses Tailwind CSS with consistent styling defined in `nodeStyles.js`. Each node type has its own color scheme:

- **Input nodes** - Green theme
- **Output nodes** - Red theme  
- **LLM nodes** - Purple theme
- **Text nodes** - Blue theme
- **Timer nodes** - Yellow theme
- **Markdown nodes** - Indigo theme
- **Random nodes** - Pink theme
- **HTTP nodes** - Orange theme
- **Switch nodes** - Gray theme

## Features

- **Dark mode support** - All nodes support dark mode using Tailwind's `dark:` classes
- **Consistent layout** - All nodes have the same structure and spacing
- **Performance optimized** - All nodes are wrapped with `React.memo`
- **Type-safe handles** - Automatic handle positioning and styling
- **Responsive design** - Works on different screen sizes

## Usage

```javascript
import { nodeTypes, getNodeComponent } from './nodes/registry';

// Use in React Flow
<ReactFlow
  nodeTypes={nodeTypes}
  // ... other props
/>

// Get specific node component
const MyNodeComponent = getNodeComponent('mynode');
```

## Benefits

1. **Reduced code duplication** - Common functionality is abstracted
2. **Consistent styling** - All nodes follow the same design system
3. **Easy maintenance** - Changes to base styling affect all nodes
4. **Scalable** - Adding new nodes is straightforward
5. **Type safety** - Clear interface for node configuration
6. **Performance** - Memoized components prevent unnecessary re-renders 