'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MapVideoProps {
  autoPlay?: boolean;
  loop?: boolean;
}

export default function MapVideo({ autoPlay = true, loop = false }: MapVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure the video plays when the component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
      });
    }
  }, []);

  return (
    <motion.div 
      className="relative w-full h-full rounded-lg overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        src="/map.mp4"
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        playsInline
        muted
        loop={loop}
        controls={false}
      />
      
      {/* Optional overlay gradient for better text readability if needed */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      
      {/* Optional loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="loading-indicator opacity-0">Loading...</div>
      </div>
    </motion.div>
  );
}