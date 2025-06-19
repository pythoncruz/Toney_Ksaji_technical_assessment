// outputNode.js

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { createNode } from './createNode';
import { nodeStyles } from './nodeStyles';

const OutputNodeContent = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className={nodeStyles.content.label}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className={nodeStyles.content.input}
            placeholder="Enter output name..."
          />
        </label>
      </div>
      <div>
        <label className={nodeStyles.content.label}>
          Type:
          <select 
            value={outputType} 
            onChange={handleTypeChange}
            className={nodeStyles.content.select}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="File">File</option>
            <option value="JSON">JSON</option>
          </select>
        </label>
      </div>
      <div className="text-xs text-gray-600">
        <span className="font-medium">Input:</span> {currName} ({outputType})
      </div>
    </div>
  );
};

const OutputNode = createNode({
  title: 'Output',
  icon: FaArrowLeft,
  nodeType: 'output',
  inputs: [
    { name: 'value', id: 'value' }
  ],
  render: OutputNodeContent
});

export { OutputNode };
