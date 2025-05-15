// @ts-nocheck
"use client"
import { useState } from 'react';

export default function AIControls({ status, onConnect }) {
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = async () => {
    setIsConnecting(true);
    await onConnect();
    setIsConnecting(false);
  };
  
  return (
    <div className="ai-controls">
      <div className="status-indicator">
        Status: {status === 'connected' ? 
          <span className="connected">Connected</span> : 
          <span className={status === 'error' ? 'error' : 'disconnected'}>
            {status === 'connecting' ? 'Connecting...' : 
             status === 'error' ? 'Error' : 'Disconnected'}
          </span>
        }
      </div>
      
      <button 
        onClick={handleConnect}
        disabled={isConnecting || status === 'connected'}
        className="connect-button"
      >
        {isConnecting ? 'Connecting...' : status === 'connected' ? 'Connected' : 'Connect to AI'}
      </button>
      
      {status === 'connected' && (
        <div className="instructions">
          <p>Speak into your microphone</p>
        </div>
      )}
    </div>
  );
}