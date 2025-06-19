import { useState, useEffect, useCallback } from 'react';
import { FaClock } from 'react-icons/fa';
import { createNode } from './createNode';
import { nodeStyles } from './nodeStyles';

const TimerNodeContent = ({ id, data }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [interval, setInterval] = useState(data?.interval || 1000);
  const [tickCount, setTickCount] = useState(0);

  const handleIntervalChange = (e) => {
    setInterval(parseInt(e.target.value));
  };

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  useEffect(() => {
    let timerId;
    if (isRunning) {
      timerId = setInterval(() => {
        setTickCount(prev => prev + 1);
      }, interval);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning, interval]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600">
          <div className="font-medium">Ticks: {tickCount}</div>
          <div className="text-gray-500">{interval}ms interval</div>
        </div>
        <button
          onClick={toggleTimer}
          className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
      <div>
        <label className={nodeStyles.content.label}>
          Interval (ms):
          <input 
            type="number" 
            value={interval} 
            onChange={handleIntervalChange}
            className={nodeStyles.content.input}
            min="100"
            max="10000"
            step="100"
          />
        </label>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400' : 'bg-gray-400'}`}></div>
        <span>{isRunning ? 'Running' : 'Stopped'}</span>
      </div>
    </div>
  );
};

const TimerNode = createNode({
  title: 'Timer',
  icon: FaClock,
  nodeType: 'timer',
  inputs: [
    { name: 'start', id: 'start' },
    { name: 'stop', id: 'stop' }
  ],
  outputs: [
    { name: 'tick', id: 'tick' }
  ],
  render: TimerNodeContent
});

export { TimerNode }; 