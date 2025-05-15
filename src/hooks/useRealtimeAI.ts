// @ts-nocheck
"use client"
import RealtimeService from '@/services/realtimeService';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function useRealtimeAI() {
  const [status, setStatus] = useState('idle'); // idle, connecting, connected, disconnecting, error
  const [audioElements, setAudioElements] = useState([]);
  const serviceRef = useRef(null);
  const audioElementsRef = useRef([]);
  
  const handleTrack = useCallback((event) => {
    console.log('Track received:', event.track.kind);
    
    const el = document.createElement('audio');
    el.srcObject = event.streams[0];
    el.autoplay = true;
    el.controls = true;
    
    // Keep reference to clean up later
    audioElementsRef.current.push(el);
    setAudioElements(prev => [...prev]);
    
    // Update state to reflect the new audio element
    setAudioElements([...audioElementsRef.current]);
    
    // Log when audio starts playing
    el.onplay = () => console.log('Audio started playing');
    el.onpause = () => console.log('Audio paused');
    el.onerror = (e) => console.error('Audio error:', e);
  }, []);
  
  // Initialize the service only once
  useEffect(() => {
    if (!serviceRef.current) {
      serviceRef.current = new RealtimeService();
    }
    
    // Clean up on unmount
    return () => {
      if (serviceRef.current) {
        serviceRef.current.stopSession().catch(e => 
          console.error('Error stopping session during cleanup:', e)
        );
      }
    };
  }, []);
  
  const initialize = useCallback(async () => {
    try {
      setStatus('connecting');
      console.log('Initializing AI session...');
      
      // Ensure we have a service
      if (!serviceRef.current) {
        serviceRef.current = new RealtimeService();
      }
      
      // Clear previous audio elements
      audioElementsRef.current.forEach(el => {
        if (el.srcObject) {
          const tracks = el.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      });
      audioElementsRef.current = [];
      setAudioElements([]);
      
      // Initialize the connection
      console.log('Initializing WebRTC connection...');
      await serviceRef.current.init(handleTrack);
      
      console.log('Starting session...');
      const success = await serviceRef.current.startSession();
      
      if (success) {
        console.log('Session started successfully');
        setStatus('connected');
      } else {
        console.error('Failed to start session');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error initializing realtime AI:', error);
      setStatus('error');
    }
  }, [handleTrack]);
  
  const disconnect = useCallback(async () => {
    try {
      if (serviceRef.current) {
        setStatus('disconnecting');
        console.log('Disconnecting from AI session...');
        
        await serviceRef.current.stopSession();
        
        // Clean up audio elements
        audioElementsRef.current.forEach(el => {
          if (el.srcObject) {
            const tracks = el.srcObject.getTracks();
            tracks.forEach(track => {
              console.log('Stopping track:', track.kind, track.id);
              track.stop();
            });
          }
        });
        
        audioElementsRef.current = [];
        setAudioElements([]);
        
        setStatus('idle');
        console.log('Disconnected from AI session');
      }
    } catch (error) {
      console.error('Error disconnecting from realtime AI:', error);
      setStatus('error');
    }
  }, []);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      console.log('Component unmounting, cleaning up...');
      
      // Stop all audio elements
      audioElementsRef.current.forEach(el => {
        if (el.srcObject) {
          const tracks = el.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      });
      
      // Stop the session
      if (serviceRef.current) {
        serviceRef.current.stopSession().catch(console.error);
      }
    };
  }, []);
  
  return {
    status,
    initialize,
    disconnect,
    audioElements,
  };
}