// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const PanoramaContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  margin: 40px 0;
`;

const PanoramaImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: ${props => `${props.position}% center`};
  transition: background-position ${props => props.isAnimating ? '0.05s' : '0.5s'} ease-out;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Hotspot = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  border: 3px solid white;
  top: ${props => props.top};
  left: ${props => props.left};
  transform: translate(-50%, -50%);
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background-color: rgba(255, 255, 255, 0.9);
  }

  &::after {
    content: '';
    width: 15px;
    height: 15px;
    background-color: #ff6b6b;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
    }
    100% {
      transform: scale(0.8);
      box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
    }
  }
`;

const HotspotTooltip = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  z-index: 20;

  ${Hotspot}:hover & {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  }
`;

const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 30;
`;

const ControlButton = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SceneTitle = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
  z-index: 20;
`;

// Main component
const Panorama360 = () => {
  // Sample panoramic scenes data
  const scenes = [
    {
      id: "living_room",
      title: "Living Room",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop",
      hotspots: [
        {
          id: "to_kitchen",
          position: { top: "40%", left: "70%" },
          tooltip: "Go to Kitchen",
          targetScene: "kitchen"
        },
        {
          id: "to_bedroom",
          position: { top: "50%", left: "20%" },
          tooltip: "Go to Bedroom",
          targetScene: "bedroom"
        }
      ]
    },
    {
      id: "kitchen",
      title: "Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&auto=format&fit=crop",
      hotspots: [
        {
          id: "back_to_living",
          position: { top: "60%", left: "30%" },
          tooltip: "Back to Living Room",
          targetScene: "living_room"
        }
      ]
    },
    {
      id: "bedroom",
      title: "Bedroom",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&auto=format&fit=crop",
      hotspots: [
        {
          id: "back_to_living",
          position: { top: "70%", left: "50%" },
          tooltip: "Back to Living Room",
          targetScene: "living_room"
        }
      ]
    }
  ];

  // State hooks
  const [currentSceneId, setCurrentSceneId] = useState("living_room");
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  
  const containerRef = useRef(null);
  
  // Get current scene data
  const currentScene = scenes.find(scene => scene.id === currentSceneId);
  
  // Handle dragging for 360 movement
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoRotate(false);
    setIsAnimating(true);
  };
  
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setAutoRotate(false);
    setIsAnimating(true);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const containerWidth = containerRef.current?.offsetWidth || 1000;
    const sensitivity = 100 / containerWidth; // 100% movement for full container width
    const movementX = (e.clientX - startX) * sensitivity;
    
    let newPosition = position - movementX;
    
    // Wrap around for 360-degree effect
    if (newPosition > 100) newPosition = 0;
    if (newPosition < 0) newPosition = 100;
    
    setPosition(newPosition);
    setStartX(e.clientX);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const containerWidth = containerRef.current?.offsetWidth || 1000;
    const sensitivity = 100 / containerWidth; // 100% movement for full container width
    const movementX = (e.touches[0].clientX - startX) * sensitivity;
    
    let newPosition = position - movementX;
    
    // Wrap around for 360-degree effect
    if (newPosition > 100) newPosition = 0;
    if (newPosition < 0) newPosition = 100;
    
    setPosition(newPosition);
    setStartX(e.touches[0].clientX);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsAnimating(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsAnimating(false);
  };
  
  // Scene transition
  const changeScene = (targetSceneId) => {
    setCurrentSceneId(targetSceneId);
    setPosition(50); // Reset view position when changing scenes
  };
  
  // Auto-rotation effect
  useEffect(() => {
    let intervalId;
    
    if (autoRotate) {
      setIsAnimating(true);
      intervalId = setInterval(() => {
        setPosition(prevPosition => {
          let newPosition = prevPosition + 0.5;
          if (newPosition > 100) newPosition = 0;
          return newPosition;
        });
      }, 50);
    } else {
      setIsAnimating(false);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRotate]);
  
  // Controls handlers
  const toggleAutoRotate = () => {
    setAutoRotate(prev => !prev);
  };
  
  const rotateLeft = () => {
    setAutoRotate(false);
    setPosition(prev => {
      let newPosition = prev + 10;
      if (newPosition > 100) newPosition = newPosition - 100;
      return newPosition;
    });
  };
  
  const rotateRight = () => {
    setAutoRotate(false);
    setPosition(prev => {
      let newPosition = prev - 10;
      if (newPosition < 0) newPosition = 100 + newPosition;
      return newPosition;
    });
  };
  
  return (
    <PanoramaContainer ref={containerRef}>
      <PanoramaImage
        src={currentScene.image}
        position={position}
        isAnimating={isAnimating || isDragging}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <SceneTitle>{currentScene.title}</SceneTitle>
        
        {/* Render hotspots */}
        {currentScene.hotspots.map(hotspot => (
          <Hotspot
            key={hotspot.id}
            top={hotspot.position.top}
            left={hotspot.position.left}
            onClick={() => changeScene(hotspot.targetScene)}
          >
            <HotspotTooltip>{hotspot.tooltip}</HotspotTooltip>
          </Hotspot>
        ))}
      </PanoramaImage>
    </PanoramaContainer>
  );
};

export default Panorama360;
