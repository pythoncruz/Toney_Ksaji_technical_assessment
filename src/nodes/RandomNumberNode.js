import { useState, useCallback } from 'react';
import { FaDice } from 'react-icons/fa';
import { createNode } from './createNode';
import { nodeStyles } from './nodeStyles';

const RandomNumberNodeContent = ({ id, data }) => {
  const [min, setMin] = useState(data?.min || 1);
  const [max, setMax] = useState(data?.max || 100);
  const [currentNumber, setCurrentNumber] = useState(null);

  const handleMinChange = (e) => {
    setMin(parseInt(e.target.value));
  };

  const handleMaxChange = (e) => {
    setMax(parseInt(e.target.value));
  };

  const generateRandomNumber = useCallback(() => {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setCurrentNumber(randomNum);
  }, [min, max]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600">
          <div className="font-medium">Result: {currentNumber !== null ? currentNumber : '---'}</div>
          <div className="text-gray-500">Range: {min} - {max}</div>
        </div>
        <button
          onClick={generateRandomNumber}
          className="btn btn-primary"
        >
          Generate
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={nodeStyles.content.label}>
            Min:
            <input 
              type="number" 
              value={min} 
              onChange={handleMinChange}
              className={nodeStyles.content.input}
              min="0"
              max="999999"
            />
          </label>
        </div>
        <div>
          <label className={nodeStyles.content.label}>
            Max:
            <input 
              type="number" 
              value={max} 
              onChange={handleMaxChange}
              className={nodeStyles.content.input}
              min="0"
              max="999999"
            />
          </label>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
        <span>Ready to generate</span>
      </div>
    </div>
  );
};

const RandomNumberNode = createNode({
  title: 'Random',
  icon: FaDice,
  nodeType: 'random',
  inputs: [
    { name: 'trigger', id: 'trigger' }
  ],
  outputs: [
    { name: 'number', id: 'number' }
  ],
  render: RandomNumberNodeContent
});

export { RandomNumberNode }; 