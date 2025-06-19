// registry.js - Node registry for React Flow

import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { LLMNode } from './llmNode';
import { TextNode } from './textNode';
import { TimerNode } from './TimerNode';
import { MarkdownNode } from './MarkdownNode';
import { RandomNumberNode } from './RandomNumberNode';
import { HttpRequestNode } from './HttpRequestNode';
import { SwitchNode } from './SwitchNode';

// Node type registry
export const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  timer: TimerNode,
  markdown: MarkdownNode,
  random: RandomNumberNode,
  http: HttpRequestNode,
  switch: SwitchNode,
};

// Node metadata for UI display
export const nodeMetadata = {
  input: {
    title: 'Input',
    description: 'Data input node with configurable name and type',
    category: 'Data',
    icon: 'FaArrowRight',
  },
  output: {
    title: 'Output',
    description: 'Data output node with configurable name and type',
    category: 'Data',
    icon: 'FaArrowLeft',
  },
  llm: {
    title: 'LLM',
    description: 'Large Language Model node for AI processing',
    category: 'AI',
    icon: 'FaBrain',
  },
  text: {
    title: 'Text',
    description: 'Text processing and manipulation node',
    category: 'Data',
    icon: 'FaFont',
  },
  timer: {
    title: 'Timer',
    description: 'Timer node that fires on interval',
    category: 'Control',
    icon: 'FaClock',
  },
  markdown: {
    title: 'Markdown',
    description: 'Convert markdown text to HTML',
    category: 'Data',
    icon: 'FaMarkdown',
  },
  random: {
    title: 'Random',
    description: 'Generate random numbers within a range',
    category: 'Data',
    icon: 'FaDice',
  },
  http: {
    title: 'HTTP Request',
    description: 'Make HTTP requests and return responses',
    category: 'Network',
    icon: 'FaGlobe',
  },
  switch: {
    title: 'Switch',
    description: 'Route data based on boolean conditions',
    category: 'Control',
    icon: 'FaToggleOn',
  },
};

// Helper function to get node component by type
export const getNodeComponent = (type) => {
  return nodeTypes[type] || null;
};

// Helper function to get node metadata by type
export const getNodeMetadata = (type) => {
  return nodeMetadata[type] || null;
};

// Helper function to get all available node types
export const getAvailableNodeTypes = () => {
  return Object.keys(nodeTypes);
};

// Helper function to get nodes by category
export const getNodesByCategory = () => {
  const categories = {};
  Object.entries(nodeMetadata).forEach(([type, metadata]) => {
    if (!categories[metadata.category]) {
      categories[metadata.category] = [];
    }
    categories[metadata.category].push({
      type,
      ...metadata,
    });
  });
  return categories;
}; 