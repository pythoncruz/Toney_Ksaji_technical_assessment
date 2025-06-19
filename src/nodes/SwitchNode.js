import { useState } from 'react';
import { FaToggleOn } from 'react-icons/fa';
import { createNode } from './createNode';
import { nodeStyles } from './nodeStyles';

const SwitchNodeContent = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'true');
  const [lastResult, setLastResult] = useState(null);

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const evaluateCondition = (value) => {
    try {
      // Simple condition evaluation without eval
      switch (condition) {
        case 'true':
          return true;
        case 'false':
          return false;
        case 'truthy':
          return Boolean(value);
        case 'falsy':
          return !Boolean(value);
        case 'number':
          return typeof value === 'number';
        case 'string':
          return typeof value === 'string';
        case 'array':
          return Array.isArray(value);
        case 'object':
          return typeof value === 'object' && !Array.isArray(value);
        case 'empty':
          return value === '' || value === null || value === undefined;
        case 'notEmpty':
          return value !== '' && value !== null && value !== undefined;
        default:
          return Boolean(value);
      }
    } catch (error) {
      console.error('Condition evaluation error:', error);
      return false;
    }
  };

  const testCondition = () => {
    const testValue = prompt('Enter a test value:');
    if (testValue !== null) {
      const result = evaluateCondition(testValue);
      setLastResult({ value: testValue, result });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600">
          <div className="font-medium">Last Test:</div>
          <div className="text-gray-500">
            {lastResult ? `${lastResult.value} → ${lastResult.result ? 'True' : 'False'}` : 'No tests yet'}
          </div>
        </div>
        <button
          onClick={testCondition}
          className="btn btn-primary"
        >
          Test
        </button>
      </div>
      <div>
        <label className={nodeStyles.content.label}>
          Condition:
          <select 
            value={condition} 
            onChange={handleConditionChange}
            className={nodeStyles.content.select}
          >
            <option value="true">Always True</option>
            <option value="false">Always False</option>
            <option value="truthy">Truthy Check</option>
            <option value="falsy">Falsy Check</option>
            <option value="number">Is Number</option>
            <option value="string">Is String</option>
            <option value="array">Is Array</option>
            <option value="object">Is Object</option>
            <option value="empty">Is Empty</option>
            <option value="notEmpty">Is Not Empty</option>
          </select>
        </label>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>True Output</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <span>False Output</span>
        </div>
      </div>
    </div>
  );
};

const SwitchNode = createNode({
  title: 'Switch',
  icon: FaToggleOn,
  nodeType: 'switch',
  inputs: [
    { name: 'data', id: 'data' }
  ],
  outputs: [
    { name: 'true', id: 'true' },
    { name: 'false', id: 'false' }
  ],
  render: SwitchNodeContent
});

export { SwitchNode }; 