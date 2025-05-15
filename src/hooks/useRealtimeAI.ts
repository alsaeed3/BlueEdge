// @ts-nocheck
"use client"
import RealtimeService from '@/services/realtimeService';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function useRealtimeAI() {
  const [status, setStatus] = useState('idle'); // idle, connecting, connected, error
  const [audioElements, setAudioElements] = useState([]);
  const serviceRef = useRef(null);
  
  const handleTrack = useCallback((event) => {
    const el = document.createElement('audio');
    el.srcObject = event.streams[0];
    el.autoplay = el.controls = true;
    
    setAudioElements((prev) => [...prev, el]);
  }, []);
  
  const initialize = useCallback(async () => {
    try {
      setStatus('connecting');
      
      // Initialize realtime service
      if (!serviceRef.current) {
        serviceRef.current = new RealtimeService();
      }
      
      await serviceRef.current.init(handleTrack);
      const success = await serviceRef.current.startSession();
      
      if (success) {
        setStatus('connected');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error initializing realtime AI:', error);
      setStatus('error');
    }
  }, [handleTrack]);
  
  useEffect(() => {
    return () => {
      // Cleanup
      audioElements.forEach(el => {
        if (el.srcObject) {
          el.srcObject.getTracks().forEach(track => track.stop());
        }
      });
    };
  }, [audioElements]);
  
  return {
    status,
    initialize,
    audioElements,
  };
}