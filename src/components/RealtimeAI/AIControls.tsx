"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, StopCircle, Loader2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface AIControlsProps {
  status: 'connected' | 'connecting' | 'disconnecting' | 'error' | 'disconnected' | string;
  onConnect: () => Promise<void> | void;
  onDisconnect: () => Promise<void> | void;
}

const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-500 hover:bg-green-600 text-primary-foreground"><CheckCircle className="mr-1 h-4 w-4" />Connected</Badge>;
      case 'connecting':
        return <Badge variant="outline" className="text-blue-500 border-blue-500 animate-pulse"><Loader2 className="mr-1 h-4 w-4 animate-spin" />Connecting...</Badge>;
      case 'disconnecting':
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500 animate-pulse"><Loader2 className="mr-1 h-4 w-4 animate-spin" />Disconnecting...</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertTriangle className="mr-1 h-4 w-4" />Error</Badge>;
      default:
        return <Badge variant="outline"><XCircle className="mr-1 h-4 w-4" />Disconnected</Badge>;
    }
  };

export default function AIControls({ status, onConnect, onDisconnect }: AIControlsProps) {
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
    <div className="flex flex-col items-center gap-6 p-4 w-full">
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="flex items-center gap-2 text-md">
          <span className="font-medium text-foreground">Status:</span>
          {getStatusBadge(status)}
        </div>
      )} */}
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {status !== 'connected' ? (
          <Button 
            onClick={handleConnect}
            disabled={isConnecting || isDisconnecting || status === 'connecting'}
            className="w-full cursor-pointer"
            size="lg"
          >
            {isConnecting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <PlayCircle className="mr-2 h-5 w-5" />
            )}
            {isConnecting ? 'Connecting...' : 'Talk with Scoutly'}
          </Button>
        ) : (
          <Button 
            variant="outline"
            onClick={handleDisconnect}
            disabled={isDisconnecting || isConnecting}
            className="w-full cursor-pointer"
            size="lg"
          >
            {isDisconnecting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <StopCircle className="mr-2 h-5 w-5" />
            )}
            {isDisconnecting ? 'Disconnecting...' : 'Say Bye to Scoutly'}
          </Button>
        )}
      </div>
    </div>
  );
}