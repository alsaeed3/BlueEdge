"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, StopCircle, Loader2, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

interface AIControlsProps {
  status: 'connected' | 'connecting' | 'disconnecting' | 'error' | 'disconnected' | string;
  onConnect: () => Promise<void> | void;
  onDisconnect: () => Promise<void> | void;
}

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

  const getStatusBadge = () => {
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
  
  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full">
      <div className="flex items-center gap-2 text-md">
        <span className="font-medium text-foreground">Status:</span>
        {getStatusBadge()}
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {status !== 'connected' ? (
          <Button 
            onClick={handleConnect}
            disabled={isConnecting || isDisconnecting || status === 'connecting'}
            className="w-full"
            size="lg"
          >
            {isConnecting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <PlayCircle className="mr-2 h-5 w-5" />
            )}
            {isConnecting ? 'Connecting...' : 'Connect to AI'}
          </Button>
        ) : (
          <Button 
            variant="outline"
            onClick={handleDisconnect}
            disabled={isDisconnecting || isConnecting}
            className="w-full"
            size="lg"
          >
            {isDisconnecting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <StopCircle className="mr-2 h-5 w-5" />
            )}
            {isDisconnecting ? 'Disconnecting...' : 'Stop AI'}
          </Button>
        )}
      </div>
      
      {status === 'connected' && (
        <div className="mt-6 p-6 border border-dashed border-border rounded-lg bg-muted/40 w-full max-w-md text-center">
          <div className="flex items-center justify-center mb-3 text-primary">
            <Info className="h-5 w-5 mr-2" />
            <p className="text-sm font-semibold">Instructions</p>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Speak into your microphone or type a message.</p>
          <p className="text-sm font-medium text-foreground mb-2">Available commands:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground text-left inline-block">
            <li>Change background color</li>
            <li>Change text color</li>
            <li>Show 1-5 fingers on the robot hand</li>
            <li>Get the page HTML</li>
          </ul>
        </div>
      )}
    </div>
  );
}