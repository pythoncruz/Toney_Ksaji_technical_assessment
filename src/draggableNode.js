// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    // Get color scheme based on node type
    const getNodeColors = (nodeType) => {
      const colors = {
        input: { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' },
        output: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
        llm: { bg: '#faf5ff', border: '#e9d5ff', text: '#9333ea' },
        text: { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb' },
        timer: { bg: '#fefce8', border: '#fef08a', text: '#ca8a04' },
        markdown: { bg: '#eef2ff', border: '#c7d2fe', text: '#4f46e5' },
        random: { bg: '#fdf2f8', border: '#fbcfe8', text: '#ec4899' },
        http: { bg: '#fff7ed', border: '#fed7aa', text: '#ea580c' },
        switch: { bg: '#f8fafc', border: '#e2e8f0', text: '#64748b' }
      };
      return colors[nodeType] || colors.text;
    };

    const colors = getNodeColors(type);
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '100px', 
          height: '70px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '10px',
          backgroundColor: colors.bg,
          border: `2px solid ${colors.border}`,
          justifyContent: 'center', 
          flexDirection: 'column',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }} 
        draggable
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${colors.text}, ${colors.border})`,
          opacity: 0.8
        }}></div>
        <span style={{ 
          color: colors.text, 
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.025em',
          textAlign: 'center',
          padding: '0 8px'
        }}>
          {label}
        </span>
        <div style={{
          fontSize: '10px',
          color: colors.text,
          opacity: 0.7,
          marginTop: '2px'
        }}>
          {type}
        </div>
      </div>
    );
  };
  