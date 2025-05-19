# 360° Virtual Tour Implementation Guide with Dynamic Hotspots

This document outlines the implementation of a 360° virtual tour feature with dynamically placed hotspots for navigation between scenes, similar to Google Street View. The implementation uses `@photo-sphere-viewer/core` and `react-photo-sphere-viewer` libraries.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Implementation Steps](#implementation-steps)
   - [Step 1: Data Structure](#step-1-data-structure)
   - [Step 2: VirtualTour Component](#step-2-virtualtour-component)
   - [Step 3: Hotspot Editor](#step-3-hotspot-editor)
   - [Step 4: Scene Management](#step-4-scene-management)
   - [Step 5: Tour Image Upload](#step-5-tour-image-upload)
   - [Step 6: Scene Connector](#step-6-scene-connector)
   - [Step 7: API Integration](#step-7-api-integration)
4. [Final Integration](#final-integration)

## Overview

The 360° virtual tour feature allows users to:
- Navigate through different scenes (rooms) in a property
- Use visual hotspots to move between connected scenes
- Manually create and position these hotspots
- Upload their own panoramic images
- Create a complete virtual walkthrough experience

## Prerequisites

Make sure you have installed the following packages:

```bash
npm install @photo-sphere-viewer/core react-photo-sphere-viewer
```

## Implementation Steps

### Step 1: Data Structure

First, define the data structure for scenes and hotspots:

```typescript
// src/types/virtual-tour.ts

export interface Hotspot {
  id: string;
  yaw: number;       // Horizontal angle in radians
  pitch: number;     // Vertical angle in radians
  targetSceneId: string;
  tooltip: string;
}

export interface Scene {
  id: string;
  title: string;
  image: string;     // URL to the panorama image
  hotspots: Hotspot[];
}

export interface Tour {
  id: string;
  name: string;
  scenes: Record<string, Scene>;
}
```

### Step 2: VirtualTour Component

Create the main VirtualTour component that displays the 360° viewer with hotspots:

```tsx
// src/components/VirtualTour/VirtualTour.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '@photo-sphere-viewer/core/index.css';
import { Scene } from '@/types/virtual-tour';

interface VirtualTourProps {
  scenes: Record<string, Scene>;
}

const VirtualTour: React.FC<VirtualTourProps> = ({ scenes }) => {
  const [currentSceneId, setCurrentSceneId] = useState<string>('');
  const viewerRef = useRef<any>(null);
  
  // Initialize with the first scene
  useEffect(() => {
    if (Object.keys(scenes).length > 0 && !currentSceneId) {
      setCurrentSceneId(Object.keys(scenes)[0]);
    }
  }, [scenes, currentSceneId]);

  if (!scenes || Object.keys(scenes).length === 0) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center text-lg text-gray-600">
        No scenes available. Please add panoramic images.
      </div>
    );
  }

  const currentScene = scenes[currentSceneId];
  
  // Handle hotspot click to navigate to target scene
  const handleHotspotClick = (targetSceneId: string) => {
    if (scenes[targetSceneId]) {
      setCurrentSceneId(targetSceneId);
    }
  };

  // Navigate to the next scene
  const goToNextScene = () => {
    const sceneKeys = Object.keys(scenes);
    const currentIndex = sceneKeys.indexOf(currentSceneId);
    const nextIndex = (currentIndex + 1) % sceneKeys.length;
    setCurrentSceneId(sceneKeys[nextIndex]);
  };
  
  // Navigate to the previous scene
  const goToPrevScene = () => {
    const sceneKeys = Object.keys(scenes);
    const currentIndex = sceneKeys.indexOf(currentSceneId);
    const prevIndex = currentIndex === 0 ? sceneKeys.length - 1 : currentIndex - 1;
    setCurrentSceneId(sceneKeys[prevIndex]);
  };
  
  // Handle viewer initialization
  const handleReady = (instance: any) => {
    viewerRef.current = instance;
    
    // Clear any existing markers
    instance.clearMarkers();
    
    // Add hotspots to the viewer
    if (currentScene.hotspots && currentScene.hotspots.length > 0) {
      currentScene.hotspots.forEach(hotspot => {
        instance.addMarker({
          id: hotspot.id,
          position: { yaw: hotspot.yaw, pitch: hotspot.pitch },
          tooltip: hotspot.tooltip,
          data: { targetSceneId: hotspot.targetSceneId },
          onClick: (marker: any) => {
            handleHotspotClick(marker.data.targetSceneId);
          }
        });
      });
    }
  };

  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent className="p-0">
        <div className="relative w-full h-[80vh]">
          {/* PhotoSphere Viewer */}
          <div className="w-full h-full absolute inset-0">
            <ReactPhotoSphereViewer
              src={currentScene.image}
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
          <span className="font-medium mr-2">Navigate to Room:</span>
          {Object.keys(scenes).map((sceneId) => (
            <Button
              key={sceneId}
              variant={currentSceneId === sceneId ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentSceneId(sceneId)}
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
```

### Step 3: Hotspot Editor

Create a component for placing and managing hotspots on panoramic images:

```tsx
// src/components/VirtualTour/HotspotEditor.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import '@photo-sphere-viewer/core/index.css';
import { Hotspot } from '@/types/virtual-tour';

interface HotspotEditorProps {
  imageUrl: string;
  existingHotspots?: Hotspot[];
  availableScenes: Record<string, { id: string; title: string }>;
  onSave: (hotspots: Hotspot[]) => void;
}

const HotspotEditor: React.FC<HotspotEditorProps> = ({ 
  imageUrl, 
  existingHotspots = [], 
  availableScenes,
  onSave 
}) => {
  const [hotspots, setHotspots] = useState<Hotspot[]>(existingHotspots);
  const [isPlacingHotspot, setIsPlacingHotspot] = useState(false);
  const [targetSceneId, setTargetSceneId] = useState('');
  const viewerRef = useRef<any>(null);
  
  // Update internal state when existingHotspots changes
  useEffect(() => {
    setHotspots(existingHotspots);
  }, [existingHotspots]);
  
  // Handle viewer ready event
  const handleReady = (instance: any) => {
    viewerRef.current = instance;
    
    // Display existing hotspots
    refreshHotspots(instance, hotspots);
    
    // Register click event to add hotspots
    instance.addEventListener('click', (e: any) => {
      if (isPlacingHotspot && targetSceneId) {
        const clickPosition = e.data.textureCoords;
        
        const newHotspot: Hotspot = {
          id: `hotspot-${Date.now()}`,
          yaw: clickPosition.yaw,
          pitch: clickPosition.pitch,
          targetSceneId: targetSceneId,
          tooltip: `Go to ${availableScenes[targetSceneId]?.title || targetSceneId}`
        };
        
        const updatedHotspots = [...hotspots, newHotspot];
        setHotspots(updatedHotspots);
        refreshHotspots(instance, updatedHotspots);
        
        setIsPlacingHotspot(false);
        setTargetSceneId('');
      }
    });
  };
  
  // Refresh all hotspots in the viewer
  const refreshHotspots = (instance: any, hotspotsToShow: Hotspot[]) => {
    instance.clearMarkers();
    
    hotspotsToShow.forEach(hotspot => {
      instance.addMarker({
        id: hotspot.id,
        position: { yaw: hotspot.yaw, pitch: hotspot.pitch },
        tooltip: hotspot.tooltip,
        data: { targetSceneId: hotspot.targetSceneId }
      });
    });
  };
  
  // Remove a hotspot
  const removeHotspot = (hotspotId: string) => {
    const updatedHotspots = hotspots.filter(h => h.id !== hotspotId);
    setHotspots(updatedHotspots);
    
    if (viewerRef.current) {
      refreshHotspots(viewerRef.current, updatedHotspots);
    }
  };
  
  // Save hotspot changes
  const saveHotspots = () => {
    onSave(hotspots);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hotspot Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[70vh] relative mb-4">
          <ReactPhotoSphereViewer
            src={imageUrl}
            height="100%"
            width="100%"
            onReady={handleReady}
            navbar={['autorotate', 'zoom', 'fullscreen']}
            containerClass="photo-sphere-viewer"
          />
        </div>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="target-scene">Connect to Scene</Label>
            <select
              id="target-scene"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={targetSceneId}
              onChange={(e) => setTargetSceneId(e.target.value)}
              disabled={isPlacingHotspot}
            >
              <option value="">Select target scene</option>
              {Object.keys(availableScenes)
                .filter(sceneId => sceneId !== targetSceneId) // Can't link to the same scene
                .map(sceneId => (
                  <option key={sceneId} value={sceneId}>
                    {availableScenes[sceneId].title}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={() => setIsPlacingHotspot(true)}
              disabled={!targetSceneId || isPlacingHotspot}
              className="mb-0"
            >
              {isPlacingHotspot ? 'Click on the panorama to place' : 'Place Hotspot'}
            </Button>
          </div>
        </div>
        
        {isPlacingHotspot && (
          <div className="my-4 p-3 bg-yellow-100 text-yellow-800 rounded border border-yellow-200">
            Click anywhere on the panorama to place a hotspot connecting to {availableScenes[targetSceneId]?.title}
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Current Hotspots</h3>
          {hotspots.length === 0 ? (
            <p className="text-muted-foreground text-sm">No hotspots added yet. Use the controls above to add hotspots.</p>
          ) : (
            <div className="space-y-2">
              {hotspots.map((hotspot) => (
                <div key={hotspot.id} className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-800 rounded">
                  <div>
                    <span className="font-medium">Target: </span>
                    <span>{availableScenes[hotspot.targetSceneId]?.title || hotspot.targetSceneId}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">
                      Yaw: {hotspot.yaw.toFixed(2)}, Pitch: {hotspot.pitch.toFixed(2)}
                    </span>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeHotspot(hotspot.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button 
          className="mt-6 w-full" 
          onClick={saveHotspots}
          disabled={isPlacingHotspot}
        >
          Save Hotspots
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotspotEditor;
```

### Step 4: Scene Management

Create a component for managing scenes in the virtual tour:

```tsx
// src/components/VirtualTour/SceneManager.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scene } from '@/types/virtual-tour';
import { PencilIcon, TrashIcon } from 'lucide-react';

interface SceneManagerProps {
  scenes: Record<string, Scene>;
  onSelectScene: (sceneId: string) => void;
  onDeleteScene: (sceneId: string) => void;
  selectedSceneId: string | null;
}

const SceneManager: React.FC<SceneManagerProps> = ({
  scenes,
  onSelectScene,
  onDeleteScene,
  selectedSceneId
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Scenes</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(scenes).length === 0 ? (
          <p className="text-muted-foreground text-sm">No scenes added yet. Upload panoramic images to create scenes.</p>
        ) : (
          <div className="grid gap-3">
            {Object.entries(scenes).map(([sceneId, scene]) => (
              <div 
                key={sceneId}
                className={`flex items-center justify-between p-3 rounded-md border ${
                  selectedSceneId === sceneId 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${scene.image})` }}
                  ></div>
                  <div>
                    <h3 className="font-medium">{scene.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {scene.hotspots.length} hotspot{scene.hotspots.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onSelectScene(sceneId)}
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => onDeleteScene(sceneId)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SceneManager;
```

### Step 5: Tour Image Upload

Create a component for uploading panoramic images:

```tsx
// src/components/VirtualTour/TourImageUpload.tsx

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Scene } from '@/types/virtual-tour';

interface TourImageUploadProps {
  onImageUpload: (scene: Scene) => void;
}

const TourImageUpload: React.FC<TourImageUploadProps> = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local URL for the file preview
    const imageUrl = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(imageUrl);
    
    // Use filename as title if none is set
    if (!title) {
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      setTitle(fileName.replace(/_/g, ' ')); // Replace underscores with spaces
    }
  };

  // Add new scene
  const handleAddScene = async () => {
    if (!imageFile || !title) return;
    
    setUploading(true);
    
    try {
      // In a real application, you would upload the file to your server or cloud storage
      // and get back a permanent URL. For this example, we'll use the local preview URL.
      
      const newScene: Scene = {
        id: `scene-${Date.now()}`,
        title: title,
        image: imagePreview as string, // In production, replace with uploaded URL
        hotspots: []
      };
      
      onImageUpload(newScene);
      
      // Reset the form
      setTitle('');
      setImageFile(null);
      setImagePreview(null);
      
      // Reset the file input
      const fileInput = document.getElementById('panorama-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Scene</CardTitle>
        <CardDescription>Upload a 360° panoramic image to create a new scene</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Scene Title</Label>
            <Input 
              id="title" 
              placeholder="e.g., Living Room, Kitchen, etc." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="panorama-upload">Panoramic Image</Label>
            <Input
              id="panorama-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="text-xs text-muted-foreground">
              For best results, upload a 360° equirectangular panorama image
            </p>
          </div>
          
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <div 
                className="w-full h-40 bg-cover bg-center rounded-md" 
                style={{ backgroundImage: `url(${imagePreview})` }}
              ></div>
            </div>
          )}
          
          <Button 
            className="mt-2"
            onClick={handleAddScene}
            disabled={!imageFile || !title || uploading}
          >
            {uploading ? 'Adding...' : 'Add Scene'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourImageUpload;
```

### Step 6: Scene Connector

Create a component to visualize and manage connections between scenes:

```tsx
// src/components/VirtualTour/SceneConnector.tsx

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scene, Hotspot } from '@/types/virtual-tour';
import { ArrowRightIcon, XIcon } from 'lucide-react';

interface SceneConnectorProps {
  scenes: Record<string, Scene>;
  onUpdateConnections: (updatedScenes: Record<string, Scene>) => void;
}

interface Connection {
  source: string;
  target: string;
  hotspotId: string;
}

const SceneConnector: React.FC<SceneConnectorProps> = ({
  scenes,
  onUpdateConnections
}) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');

  // Extract existing connections from scenes
  useEffect(() => {
    const existingConnections: Connection[] = [];
    
    Object.keys(scenes).forEach(sourceId => {
      const sourceScene = scenes[sourceId];
      
      sourceScene.hotspots.forEach(hotspot => {
        existingConnections.push({
          source: sourceId,
          target: hotspot.targetSceneId,
          hotspotId: hotspot.id
        });
      });
    });
    
    setConnections(existingConnections);
  }, [scenes]);

  // Add a new connection with default hotspot placement
  const addConnection = () => {
    if (!selectedSource || !selectedTarget || selectedSource === selectedTarget) return;
    
    // Check if connection already exists
    const exists = connections.some(
      conn => conn.source === selectedSource && conn.target === selectedTarget
    );
    
    if (exists) return;
    
    // Create a copy of scenes
    const updatedScenes = {...scenes};
    
    // Add hotspot to source scene (with default position)
    const sourceScene = {...updatedScenes[selectedSource]};
    const newHotspot: Hotspot = {
      id: `hotspot-${Date.now()}`,
      yaw: 0,  // Default center position
      pitch: 0,
      targetSceneId: selectedTarget,
      tooltip: `Go to ${scenes[selectedTarget].title}`
    };
    
    sourceScene.hotspots = [...sourceScene.hotspots, newHotspot];
    updatedScenes[selectedSource] = sourceScene;
    
    // Add to connections list
    const newConnection: Connection = {
      source: selectedSource,
      target: selectedTarget,
      hotspotId: newHotspot.id
    };
    
    setConnections([...connections, newConnection]);
    onUpdateConnections(updatedScenes);
    
    // Reset selection
    setSelectedSource('');
    setSelectedTarget('');
  };

  // Remove a connection
  const removeConnection = (connection: Connection) => {
    // Create a copy of scenes
    const updatedScenes = {...scenes};
    
    // Remove hotspot from source scene
    const sourceScene = {...updatedScenes[connection.source]};
    sourceScene.hotspots = sourceScene.hotspots.filter(
      h => h.id !== connection.hotspotId
    );
    
    updatedScenes[connection.source] = sourceScene;
    
    // Update connections list
    const updatedConnections = connections.filter(
      c => !(c.source === connection.source && c.target === connection.target)
    );
    
    setConnections(updatedConnections);
    onUpdateConnections(updatedScenes);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scene Connections</CardTitle>
        <CardDescription>Define how scenes are connected to each other</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Add new connection */}
          <div>
            <h3 className="text-base font-medium mb-3">Add Connection</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              <div className="md:col-span-2">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                >
                  <option value="">Source Scene</option>
                  {Object.keys(scenes).map(sceneId => (
                    <option key={sceneId} value={sceneId}>
                      {scenes[sceneId].title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-center">
                <ArrowRightIcon className="h-5 w-5" />
              </div>
              
              <div className="md:col-span-2">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  disabled={!selectedSource}
                >
                  <option value="">Target Scene</option>
                  {Object.keys(scenes)
                    .filter(sceneId => sceneId !== selectedSource)
                    .map(sceneId => (
                      <option key={sceneId} value={sceneId}>
                        {scenes[sceneId].title}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
            
            <Button 
              className="w-full mt-3"
              onClick={addConnection}
              disabled={!selectedSource || !selectedTarget || selectedSource === selectedTarget}
            >
              Add Connection
            </Button>
            
            <p className="text-xs text-muted-foreground mt-2">
              The hotspot will be placed at the center of the scene. You can reposition it later
              using the Hotspot Editor.
            </p>
          </div>
          
          {/* Existing connections */}
          <div>
            <h3 className="text-base font-medium mb-3">Current Connections</h3>
            {connections.length === 0 ? (
              <p className="text-sm text-muted-foreground">No connections defined yet.</p>
            ) : (
              <div className="space-y-2">
                {connections.map((connection, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-800 rounded">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{scenes[connection.source]?.title || connection.source}</span>
                      <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{scenes[connection.target]?.title || connection.target}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeConnection(connection)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SceneConnector;
```

### Step 7: API Integration

Create API endpoints for saving and retrieving tour data:

```typescript
// src/app/api/tours/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Tour } from '@/types/virtual-tour';

// Get all tours
export async function GET() {
  try {
    // In a real application, you would fetch this from your database
    // For this example, we'll return mock data
    const tours: Tour[] = [
      {
        id: 'tour-1',
        name: 'Sample Apartment Tour',
        scenes: {
          livingRoom: {
            id: 'livingRoom',
            title: 'Living Room',
            image: '/living.jpg',
            hotspots: [
              {
                id: 'hotspot-1',
                yaw: 1.5,
                pitch: 0.1,
                targetSceneId: 'kitchen',
                tooltip: 'Go to Kitchen'
              }
            ]
          },
          kitchen: {
            id: 'kitchen',
            title: 'Kitchen',
            image: '/kitchen.jpg',
            hotspots: [
              {
                id: 'hotspot-2',
                yaw: -1.2,
                pitch: 0.2,
                targetSceneId: 'livingRoom',
                tooltip: 'Back to Living Room'
              }
            ]
          }
        }
      }
    ];
    
    return NextResponse.json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}

// Create or update a tour
export async function POST(request: NextRequest) {
  try {
    const tourData: Tour = await request.json();
    
    // In a real application, you would save this to your database
    // For this example, we'll just return the data
    
    // Process image uploads if needed
    // This would typically involve uploading to a cloud storage service
    
    console.log('Tour saved:', tourData);
    
    return NextResponse.json({
      success: true,
      tourId: tourData.id || `tour-${Date.now()}`
    });
  } catch (error) {
    console.error('Error saving tour:', error);
    return NextResponse.json(
      { error: 'Failed to save tour' },
      { status: 500 }
    );
  }
}
```

Add an endpoint for uploading images:

```typescript
// src/app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      console.error('Error creating uploads directory:', error);
    }
    
    // Generate unique filename
    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const path = join(uploadsDir, uniqueName);
    
    // Write file to disk
    await writeFile(path, buffer);
    
    // Return the public URL
    const publicUrl = `/uploads/${uniqueName}`;
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
```

## Final Integration

Create a page that integrates all components, with view and edit modes:

```tsx
// src/app/virtual-tour/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import VirtualTour from '@/components/VirtualTour/VirtualTour';
import TourImageUpload from '@/components/VirtualTour/TourImageUpload';
import SceneManager from '@/components/VirtualTour/SceneManager';
import HotspotEditor from '@/components/VirtualTour/HotspotEditor';
import SceneConnector from '@/components/VirtualTour/SceneConnector';
import { Scene, Tour } from '@/types/virtual-tour';

export default function VirtualTourPage() {
  const { toast } = useToast();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);

  // Load tour data
  useEffect(() => {
    const loadTour = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd fetch this from your API
        const response = await fetch('/api/tours');
        const tours = await response.json();
        
        if (tours && tours.length > 0) {
          setTour(tours[0]); // Just use the first tour for this example
        } else {
          // Create an empty tour if none exists
          setTour({
            id: `tour-${Date.now()}`,
            name: 'My Virtual Tour',
            scenes: {}
          });
        }
      } catch (error) {
        console.error('Error loading tour:', error);
        toast({
          title: 'Error loading tour',
          description: 'Failed to load tour data. Please try again.',
          variant: 'destructive'
        });
        
        // Create an empty tour if loading fails
        setTour({
          id: `tour-${Date.now()}`,
          name: 'My Virtual Tour',
          scenes: {}
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTour();
  }, [toast]);

  // Add a new scene
  const handleAddScene = (scene: Scene) => {
    if (!tour) return;
    
    const updatedScenes = {
      ...tour.scenes,
      [scene.id]: scene
    };
    
    setTour({
      ...tour,
      scenes: updatedScenes
    });
    
    toast({
      title: 'Scene added',
      description: `"${scene.title}" has been added to your tour.`
    });
  };

  // Delete a scene
  const handleDeleteScene = (sceneId: string) => {
    if (!tour) return;
    
    // Create a copy of scenes without the deleted scene
    const { [sceneId]: deletedScene, ...remainingScenes } = tour.scenes;
    
    // Remove hotspots that point to the deleted scene
    Object.keys(remainingScenes).forEach(key => {
      remainingScenes[key] = {
        ...remainingScenes[key],
        hotspots: remainingScenes[key].hotspots.filter(
          hotspot => hotspot.targetSceneId !== sceneId
        )
      };
    });
    
    setTour({
      ...tour,
      scenes: remainingScenes
    });
    
    // If the deleted scene was selected, clear selection
    if (selectedSceneId === sceneId) {
      setSelectedSceneId(null);
    }
    
    toast({
      title: 'Scene deleted',
      description: `"${deletedScene.title}" has been removed from your tour.`
    });
  };

  // Update hotspots for a scene
  const handleUpdateHotspots = (sceneId: string, hotspots: any[]) => {
    if (!tour) return;
    
    const updatedScenes = {
      ...tour.scenes,
      [sceneId]: {
        ...tour.scenes[sceneId],
        hotspots
      }
    };
    
    setTour({
      ...tour,
      scenes: updatedScenes
    });
    
    toast({
      title: 'Hotspots updated',
      description: `Hotspots for "${tour.scenes[sceneId].title}" have been updated.`
    });
  };

  // Update all scenes (used by SceneConnector)
  const handleUpdateScenes = (updatedScenes: Record<string, Scene>) => {
    if (!tour) return;
    
    setTour({
      ...tour,
      scenes: updatedScenes
    });
  };

  // Save the tour
  const handleSaveTour = async () => {
    if (!tour) return;
    
    try {
      // In a real app, you'd send this to your API
      const response = await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tour)
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: 'Tour saved',
          description: 'Your virtual tour has been saved successfully.'
        });
      } else {
        throw new Error(result.error || 'Failed to save tour');
      }
    } catch (error) {
      console.error('Error saving tour:', error);
      toast({
        title: 'Error saving tour',
        description: 'Failed to save tour. Please try again.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading virtual tour...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="mb-6">
        <CardHeader className="bg-primary text-primary-foreground py-6">
          <CardTitle className="text-center text-2xl">
            {mode === 'view' ? 'Virtual Tour' : 'Edit Virtual Tour'}
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="view" onValueChange={(value) => setMode(value as 'view' | 'edit')}>
        <TabsList className="mb-6">
          <TabsTrigger value="view">View Tour</TabsTrigger>
          <TabsTrigger value="edit">Edit Tour</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view">
          {tour && tour.scenes && Object.keys(tour.scenes).length > 0 ? (
            <VirtualTour scenes={tour.scenes} />
          ) : (
            <div className="text-center p-12 bg-slate-100 rounded-lg">
              <p>No tour scenes available. Switch to Edit mode to add images.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="edit">
          <div className="space-y-6">
            {/* Add new scene */}
            <TourImageUpload onImageUpload={handleAddScene} />
            
            {/* Scene management */}
            {tour && Object.keys(tour.scenes).length > 0 && (
              <>
                <SceneManager 
                  scenes={tour.scenes}
                  onSelectScene={setSelectedSceneId}
                  onDeleteScene={handleDeleteScene}
                  selectedSceneId={selectedSceneId}
                />
                
                {/* Hotspot editor for selected scene */}
                {selectedSceneId && (
                  <HotspotEditor 
                    imageUrl={tour.scenes[selectedSceneId].image}
                    existingHotspots={tour.scenes[selectedSceneId].hotspots}
                    availableScenes={Object.fromEntries(
                      Object.entries(tour.scenes)
                        .filter(([id]) => id !== selectedSceneId)
                        .map(([id, scene]) => [id, { id, title: scene.title }])
                    )}
                    onSave={(hotspots) => handleUpdateHotspots(selectedSceneId, hotspots)}
                  />
                )}
                
                {/* Scene connector */}
                <SceneConnector 
                  scenes={tour.scenes}
                  onUpdateConnections={handleUpdateScenes}
                />
                
                {/* Save button */}
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleSaveTour}
                >
                  Save Tour
                </Button>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## Conclusion

This implementation provides a complete solution for creating 360° virtual tours with dynamic hotspots for navigation. Users can:

1. Upload their own panoramic images
2. Place hotspots by clicking directly on the panorama
3. Connect scenes together for a walkthrough effect
4. View the tour with intuitive navigation controls
5. Save and load tour data

All UI components are built using Shadcn UI for a consistent look and feel.

To implement this feature in your project, you may need to adjust the file paths and integrate with your existing data storage solution. The basic structure and functionality should provide a solid foundation for adding virtual tours to your application.