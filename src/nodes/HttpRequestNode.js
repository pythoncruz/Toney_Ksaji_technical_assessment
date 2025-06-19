import { useState, useCallback } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { createNode } from './createNode';
import { nodeStyles } from './nodeStyles';

const HttpRequestNodeContent = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://jsonplaceholder.typicode.com/posts/1');
  const [method, setMethod] = useState(data?.method || 'GET');
  const [status, setStatus] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const makeRequest = useCallback(async () => {
    if (!url) return;
    
    setLoading(true);
    setStatus(null);
    setResponse(null);
    
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setStatus(response.status);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setStatus('Error');
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  const getStatusClass = () => {
    if (!status) return '';
    if (status === 'Error') return 'error';
    if (status >= 200 && status < 300) return 'success';
    return 'error';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600">
          <div className="font-medium">Status: {status || '---'}</div>
          <div className="text-gray-500">{method} Request</div>
        </div>
        <button
          onClick={makeRequest}
          disabled={loading}
          className={`btn ${loading ? 'bg-gray-400 cursor-not-allowed' : 'btn-success'}`}
        >
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </div>
      <div>
        <label className={nodeStyles.content.label}>
          URL:
          <input 
            type="text" 
            value={url} 
            onChange={handleUrlChange}
            className={nodeStyles.content.input}
            placeholder="https://api.example.com/data"
          />
        </label>
      </div>
      <div>
        <label className={nodeStyles.content.label}>
          Method:
          <select 
            value={method} 
            onChange={handleMethodChange}
            className={nodeStyles.content.select}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
      {response && (
        <div className="text-xs text-gray-600">
          <div className="font-medium mb-1">Response:</div>
          <div className="preview-box">
            {JSON.stringify(response, null, 2)}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400' : status ? (getStatusClass() === 'success' ? 'bg-green-400' : 'bg-red-400') : 'bg-gray-400'}`}></div>
        <span>{loading ? 'Loading...' : status ? (getStatusClass() === 'success' ? 'Success' : 'Error') : 'Ready'}</span>
      </div>
    </div>
  );
};

const HttpRequestNode = createNode({
  title: 'HTTP Request',
  icon: FaGlobe,
  nodeType: 'http',
  inputs: [
    { name: 'trigger', id: 'trigger' }
  ],
  outputs: [
    { name: 'response', id: 'response' },
    { name: 'status', id: 'status' }
  ],
  render: HttpRequestNodeContent
});

export { HttpRequestNode }; 