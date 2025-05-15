// @ts-nocheck
"use client"
import { useEffect, useRef } from 'react';

export default function AudioPlayer({ audioElements }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      // Clear previous elements
      containerRef.current.innerHTML = '';
      
      // Append new audio elements
      audioElements.forEach(el => {
        containerRef.current.appendChild(el);
      });
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [audioElements]);
  
  return (
    <div className="audio-container" ref={containerRef}></div>
  );
}