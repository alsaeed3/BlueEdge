import React from 'react';
import { WaveAvatar } from '@/components/WaveAvatar';

interface SpeakingIndicatorProps {
  isSpeaking?: boolean;
  audioLevel?: number;
  status?: 'connected' | 'connecting' | 'disconnecting' | 'error' | 'disconnected' | string;
}

export default function SpeakingIndicator({ 
  isSpeaking = false, 
  audioLevel = 0,
  status = 'disconnected'
}: SpeakingIndicatorProps) {
  return (
    <div className="flex justify-center items-center" style={{ minHeight: '250px' }}>
      <WaveAvatar 
        isAIActive={status === 'connected'}
        isSpeaking={isSpeaking} 
        audioLevel={audioLevel} 
      />
    </div>
  );
}