// inputNode.js

import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { createNode } from './createNode';
import { nodeStyles } from './nodeStyles';

const InputNodeContent = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
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
            placeholder="Enter input name..."
          />
        </label>
      </div>
      <div>
        <label className={nodeStyles.content.label}>
          Type:
          <select 
            value={inputType} 
            onChange={handleTypeChange}
            className={nodeStyles.content.select}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Number">Number</option>
            <option value="Boolean">Boolean</option>
          </select>
        </label>
      </div>
      <div className="text-xs text-gray-600">
        <span className="font-medium">Output:</span> {currName} ({inputType})
      </div>
    </div>
  );
};

const InputNode = createNode({
  title: 'Input',
  icon: FaArrowRight,
  nodeType: 'input',
  outputs: [
    { name: 'value', id: 'value' }
  ],
  render: InputNodeContent
});

export { InputNode };
