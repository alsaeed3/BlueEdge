// @ts-nocheck
import React, { useState, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '@photo-sphere-viewer/core/index.css';

const VirtualTour = ({ scenes }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const sceneKeys = Object.keys(scenes);
  const currentScene = sceneKeys[currentSceneIndex];
  const viewerRef = useRef(null);
  
  const goToNextScene = () => {
    setCurrentSceneIndex((prevIndex) => 
      prevIndex === sceneKeys.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevScene = () => {
    setCurrentSceneIndex((prevIndex) => 
      prevIndex === 0 ? sceneKeys.length - 1 : prevIndex - 1
    );
  };
  
  const handleReady = (instance) => {
    viewerRef.current = instance;
  };

  if (!scenes || Object.keys(scenes).length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex justify-center items-center text-lg text-gray-600">
        Loading virtual tour...
      </div>
    );
  }

  return (
    <Card className="w-full p-0 overflow-hidden border-0 shadow-none">
      <CardContent className="p-0">
        <div className="relative w-full min-h-[70vh]">
          <div className="w-full h-full absolute inset-0">
            <ReactPhotoSphereViewer
              src={scenes[currentScene].image}
              height="100%"
              width="100%"
              onReady={handleReady}
              navbar={[
                'autorotate',
                'zoom',
                'fullscreen',
              ]}
              containerClass="photo-sphere-viewer"
            />
          </div>
          
          {/* Navigation controls */}
          <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2 px-4 z-10 pointer-events-none">
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={goToPrevScene}
              className="h-12 w-12 rounded-full bg-black/60 text-white hover:bg-black/80 pointer-events-auto"
              aria-label="Previous room"
            >
              <ChevronLeft size={24} />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={goToNextScene}
              className="h-12 w-12 rounded-full bg-black/60 text-white hover:bg-black/80 pointer-events-auto"
              aria-label="Next room"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
        
        {/* Room selector */}
        <div className="flex flex-wrap gap-2 items-center p-4 bg-slate-100 dark:bg-slate-800">
          <span className="font-medium mr-2">Navigate to:</span>
          {sceneKeys.map((sceneId, index) => (
            <Button
              key={sceneId}
              variant={currentScene === sceneId ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentSceneIndex(index)}
            >
              {scenes[sceneId].title}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualTour;