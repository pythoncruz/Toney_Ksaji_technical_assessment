import { useState } from 'react';
import { FaMarkdown } from 'react-icons/fa';
import { createNode } from './createNode';
import { nodeStyles } from './nodeStyles';

const MarkdownNodeContent = ({ id, data }) => {
  const [markdownText, setMarkdownText] = useState(data?.markdown || '# Hello World\n\nThis is **bold** and *italic* text.');

  const handleMarkdownChange = (e) => {
    setMarkdownText(e.target.value);
  };

  // Simple markdown to HTML conversion
  const convertMarkdownToHtml = (text) => {
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br>');
  };

  const htmlOutput = convertMarkdownToHtml(markdownText);

  return (
    <div className="space-y-3">
      <div>
        <label className={nodeStyles.content.label}>
          Markdown:
          <textarea 
            value={markdownText} 
            onChange={handleMarkdownChange}
            className="node-textarea"
            placeholder="Enter markdown text..."
            rows="3"
          />
        </label>
      </div>
      <div className="text-xs text-gray-600">
        <div className="font-medium mb-1">Preview:</div>
        <div 
          className="preview-box"
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </div>
    </div>
  );
};

const MarkdownNode = createNode({
  title: 'Markdown',
  icon: FaMarkdown,
  nodeType: 'markdown',
  inputs: [
    { name: 'markdown', id: 'markdown' }
  ],
  outputs: [
    { name: 'html', id: 'html' }
  ],
  render: MarkdownNodeContent
});

export { MarkdownNode }; 