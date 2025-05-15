import useRealtimeAI from '@/hooks/useRealtimeAI';
import AIControls from './AIControls';
import AudioPlayer from './AudioPlayer';

export default function RealtimeAI() {
  const { status, initialize, disconnect, audioElements } = useRealtimeAI();

  return (
    <div className="realtime-ai-container">
      <h2>OpenAI Realtime Interaction</h2>
      
      <AIControls 
        status={status} 
        onConnect={initialize}
        onDisconnect={disconnect} 
      />
      
      <AudioPlayer audioElements={audioElements} />
      
      <div className="debug-info">
        <p>Status: {status}</p>
        <p>Audio Elements: {audioElements.length}</p>
      </div>
      
      <style jsx>{`
        .realtime-ai-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .debug-info {
          margin-top: 20px;
          padding: 10px;
          background-color: #f5f5f5;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}