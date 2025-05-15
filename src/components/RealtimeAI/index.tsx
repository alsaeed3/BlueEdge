"use client";

import useRealtimeAI from '@/hooks/useRealtimeAI';
import AIControls from './AIControls';
import AudioPlayer from './AudioPlayer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import SpeakingIndicator from './SpeakingIndicator';

export default function RealtimeAI() {
  const { status, initialize, disconnect, audioElements , isAISpeaking, audioLevel } = useRealtimeAI();

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2 sm:p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-primary/30 bg-card overflow-hidden rounded-xl">
        <CardHeader className="text-center p-4 sm:p-6 border-b border-border/50 bg-muted/30">
          <div className="flex justify-center items-center mb-4 text-primary">
            <BrainCircuit size={48} strokeWidth={1.5} />
          </div>
          <CardTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight 
                               bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Scoutly AI
          </CardTitle>
          <CardDescription className="mt-3 text-base sm:text-lg text-muted-foreground">
            Connect and experience our AI capabilities in real-time.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          <SpeakingIndicator 
            isSpeaking={isAISpeaking}
            audioLevel={audioLevel}
            status={status}
          />
          <AIControls 
            status={status} 
            onConnect={initialize}
            onDisconnect={disconnect} 
          />
          <AudioPlayer audioElements={audioElements} />
        </CardContent>
        {process.env.NODE_ENV !== 'development' && (
          <CardFooter className="p-4 bg-muted/20 border-t border-border/50">
            <div className="debug-info w-full text-xs font-mono text-muted-foreground/80 
                            p-2 border border-dashed border-border/30 rounded-lg bg-background/50">
              <p className="mb-1"><span className="font-semibold text-muted-foreground">Status:</span> {status}</p>
              <p><span className="font-semibold text-muted-foreground">Audio Elements:</span> {audioElements.length}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}