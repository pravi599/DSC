import React from 'react';
import './AgenticMonitor.css';

function AgenticMonitor() {
  return (
    <div className="agentic-monitor">
      <h3>Agentic Framework Monitor</h3>
      <div className="metrics">
        <div className="metric">Queue: 15</div>
        <div className="metric">Avg Latency: 120ms</div>
        <div className="metric">Error Rate: 0.4%</div>
      </div>
    </div>
  );
}

export default AgenticMonitor;