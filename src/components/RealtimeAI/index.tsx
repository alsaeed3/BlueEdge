"use client";

import useRealtimeAI from "@/hooks/useRealtimeAI";
import AIControls from "./AIControls";
import AudioPlayer from "./AudioPlayer";

export default function RealtimeAI() {
  const { status, initialize, audioElements } = useRealtimeAI();
  
  return (
    <div className="realtime-ai-container">
      <h2>OpenAI Realtime Interaction</h2>
      
      <AIControls
        status={status} 
        onConnect={initialize} 
      />
      
      <AudioPlayer audioElements={audioElements} />
    </div>
  );
}