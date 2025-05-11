"use client";

import { useEffect, useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RotateCw, XCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const defaultFallback = ({ error, reset }: { error: Error; reset: () => void }) => (
  <Alert variant="destructive" className="my-8">
    <XCircle className="h-4 w-4" />
    <AlertTitle>Something went wrong!</AlertTitle>
    <AlertDescription>
      <div className="mt-2">
        {error.message || "An unexpected error occurred"}
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4" 
        onClick={reset}
      >
        <RotateCw className="mr-2 h-4 w-4" />
        Try again
      </Button>
    </AlertDescription>
  </Alert>
);

export function ErrorBoundary({ 
  children, 
  fallback = defaultFallback 
}: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Add error event listener
    const errorHandler = (event: ErrorEvent) => {
      event.preventDefault();
      setError(event.error);
    };

    // Add unhandled rejection event listener
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      setError(new Error(event.reason));
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  if (error) {
    const reset = () => setError(null);
    return (
      <>
        {typeof fallback === 'function'
          ? fallback({ error, reset })
          : fallback}
      </>
    );
  }

  return <>{children}</>;
}

export default ErrorBoundary;
