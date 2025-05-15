// @ts-nocheck
"use client"
import { useState } from 'react';

export default function AIControls({ status, onConnect, onDisconnect }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  
  const handleConnect = async () => {
    setIsConnecting(true);
    await onConnect();
    setIsConnecting(false);
  };
  
  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    await onDisconnect();
    setIsDisconnecting(false);
  };
  
  return (
    <div className="ai-controls">
      <div className="status-indicator">
        Status: {
          status === 'connected' ? <span className="connected">Connected</span> :
          status === 'connecting' ? <span className="connecting">Connecting...</span> :
          status === 'disconnecting' ? <span className="disconnecting">Disconnecting...</span> :
          status === 'error' ? <span className="error">Error</span> :
          <span className="disconnected">Disconnected</span>
        }
      </div>
      
      <div className="button-container">
        <button 
          onClick={handleConnect}
          disabled={isConnecting || isDisconnecting || ['connected', 'connecting'].includes(status)}
          className="connect-button"
        >
          {isConnecting ? 'Connecting...' : 'Connect to AI'}
        </button>
        
        <button 
          onClick={handleDisconnect}
          disabled={isDisconnecting || isConnecting || !['connected'].includes(status)}
          className="disconnect-button"
        >
          {isDisconnecting ? 'Disconnecting...' : 'Stop AI'}
        </button>
      </div>
      
      {status === 'connected' && (
        <div className="instructions">
          <p>Speak into your microphone or type a message</p>
          <p>Available commands:</p>
          <ul>
            <li>Change background color</li>
            <li>Change text color</li>
            <li>Show 1-5 fingers on the robot hand</li>
            <li>Get the page HTML</li>
          </ul>
        </div>
      )}
      
      <style jsx>{`
        .button-container {
          display: flex;
          gap: 10px;
          margin: 15px 0;
        }
        
        .connect-button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .disconnect-button {
          background-color: #f44336;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .connect-button:disabled, .disconnect-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        
        .status-indicator {
          margin-bottom: 10px;
        }
        
        .connected {
          color: #4CAF50;
          font-weight: bold;
        }
        
        .connecting, .disconnecting {
          color: #FF9800;
          font-weight: bold;
        }
        
        .error {
          color: #f44336;
          font-weight: bold;
        }
        
        .disconnected {
          color: #9E9E9E;
        }
      `}</style>
    </div>
  );
}