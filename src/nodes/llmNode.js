// llmNode.js

import { FaBrain } from 'react-icons/fa';
import { createNode } from './createNode';

const LLMNodeContent = () => {
  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-700">
        <div className="font-medium mb-2">Large Language Model</div>
        <div className="text-xs text-gray-600 leading-relaxed">
          Processes text inputs using AI to generate intelligent responses. 
          Connect system prompts and user inputs to get AI-generated content.
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
        <span>Ready to process</span>
      </div>
    </div>
  );
};

const LLMNode = createNode({
  title: 'LLM',
  icon: FaBrain,
  nodeType: 'llm',
  inputs: [
    { name: 'system', id: 'system', position: '33%' },
    { name: 'prompt', id: 'prompt', position: '66%' }
  ],
  outputs: [
    { name: 'response', id: 'response' }
  ],
  render: LLMNodeContent
});

export { LLMNode };
