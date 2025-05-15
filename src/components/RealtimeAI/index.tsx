"use client";

import useRealtimeAI from "@/hooks/useRealtimeAI";
import AIControls from "./AIControls";
import AudioPlayer from "./AudioPlayer";
import SpeakingIndicator from "./SpeakingIndicator";

export default function RealtimeAI() {
  const {
    status,
    initialize,
    disconnect,
    audioElements,
    isAISpeaking,
    audioLevel,
  } = useRealtimeAI();

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full">
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
      {/* {process.env.NODE_ENV === "development" && (
        <div className="p-4 bg-muted/20 border-t border-border/50">
          <div
            className="debug-info w-full text-xs font-mono text-muted-foreground/80 
                            p-2 border border-dashed border-border/30 rounded-lg bg-background/50"
          >
            <p className="mb-1">
              <span className="font-semibold text-muted-foreground">
                Status:
              </span>{" "}
              {status}
            </p>
            <p>
              <span className="font-semibold text-muted-foreground">
                Audio Elements:
              </span>{" "}
              {audioElements.length}
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
}
