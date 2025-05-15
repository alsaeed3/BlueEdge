// @ts-nocheck
"use client"
import RealtimeService from '@/services/realtimeService';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function useRealtimeAI() {
  const [status, setStatus] = useState('idle'); // idle, connecting, connected, disconnecting, error
  const [audioElements, setAudioElements] = useState([]);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const serviceRef = useRef(null);
  const audioElementsRef = useRef([]);
  const audioAnalyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const speakingTimeoutRef = useRef(null);
  
  // Analyze audio levels to detect AI speaking
  const analyzeAudio = useCallback(() => {
    if (audioAnalyserRef.current) {
      const dataArray = new Uint8Array(audioAnalyserRef.current.frequencyBinCount);
      audioAnalyserRef.current.getByteFrequencyData(dataArray);

      // Calculate average volume level
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      
      // Normalize to 0-1 range for visualization
      const normalizedLevel = Math.min(average / 128, 1);
      setAudioLevel(normalizedLevel);

      // Improved speaking detection with debouncing
      if (normalizedLevel > 0.05 && !isSpeakingRef.current) {
        // Start speaking immediately
        isSpeakingRef.current = true;
        clearTimeout(speakingTimeoutRef.current);
        setIsAISpeaking(true);
        console.log('AI started speaking (audio level:', normalizedLevel, ')');
      } 
      else if (normalizedLevel <= 0.05 && isSpeakingRef.current) {
        // Delay ending speaking state to prevent flicker
        if (!speakingTimeoutRef.current) {
          speakingTimeoutRef.current = setTimeout(() => {
            isSpeakingRef.current = false;
            setIsAISpeaking(false);
            speakingTimeoutRef.current = null;
            console.log('AI stopped speaking (audio level:', normalizedLevel, ')');
          }, 300); // 300ms delay before considering AI stopped speaking
        }
      }

      // Continue analyzing
      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    }
  }, []);
  
  // Handle new WebRTC tracks
  const handleTrack = useCallback((event) => {
    console.log('Track received:', event.track.kind);
    
    if (event.track.kind !== 'audio') return;
    
    // Create audio element
    const el = document.createElement('audio');
    el.srcObject = event.streams[0];
    el.autoplay = true;
    
    // Keep reference to clean up later
    audioElementsRef.current.push(el);
    setAudioElements([...audioElementsRef.current]);
    
    // Set up audio analyzer
    try {
      // Clean up any existing analyzer
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(event.streams[0]);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256; // Smaller size is more efficient
      source.connect(analyzer);
      
      // Store analyzer for later use
      audioAnalyserRef.current = analyzer;
      
      // Start analyzing audio
      analyzeAudio();
      
      console.log('Audio analyzer set up successfully');
    } catch (error) {
      console.error('Error setting up audio analyzer:', error);
    }
    
    // Basic fallback to track events
    el.onplay = () => {
      console.log('Audio started playing');
      // setIsAISpeaking(true);
    };
    
  }, [analyzeAudio]);
  
  // Initialize the service
  useEffect(() => {
    if (!serviceRef.current) {
      serviceRef.current = new RealtimeService();
    }
    
    return () => {
      // Clean up
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (speakingTimeoutRef.current) {
        clearTimeout(speakingTimeoutRef.current);
      }
      
      if (serviceRef.current) {
        serviceRef.current.stopSession().catch(console.error);
      }
    };
  }, []);
  
  // Initialize the connection
  const initialize = useCallback(async () => {
    try {
      setStatus('connecting');
      console.log('Initializing AI session...');
      
      // Ensure we have a service
      if (!serviceRef.current) {
        serviceRef.current = new RealtimeService();
      }
      
      // Clean up previous audio elements
      audioElementsRef.current.forEach(el => {
        if (el.srcObject) {
          const tracks = el.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      });
      audioElementsRef.current = [];
      setAudioElements([]);
      
      // Clean up previous audio analysis
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Reset speaking state
      setIsAISpeaking(false);
      setAudioLevel(0);
      
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
  
  // Disconnect the session
  const disconnect = useCallback(async () => {
    try {
      if (serviceRef.current) {
        setStatus('disconnecting');
        console.log('Disconnecting from AI session...');
        
        // Clean up audio analysis
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
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
        
        // Reset speaking state
        setIsAISpeaking(false);
        setAudioLevel(0);
        
        setStatus('idle');
        console.log('Disconnected from AI session');
      }
    } catch (error) {
      console.error('Error disconnecting from realtime AI:', error);
      setStatus('error');
    }
  }, []);
  
  return {
    status,
    initialize,
    disconnect,
    audioElements,
    isAISpeaking,
    audioLevel,
  };
}