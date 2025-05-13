'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AppBarProps {
  isSessionActive?: boolean;
  handleConnectClick?: () => void;
}

export default function AppBar({ isSessionActive = false, handleConnectClick }: AppBarProps) {
  const [scrolled, setScrolled] = useState(false);
  
  // Apply scrolled effect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and brand name */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse" />
            <div className="absolute inset-1 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-indigo-400 font-bold text-lg">S</span>
            </div>
          </div>
          <div className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Escoutly
          </div>
        </div>
        
        {/* Center area - can be used for navigation in the future */}
        <div className="hidden md:flex space-x-6">
          {/* Add navigation items here if needed */}
        </div>
        
        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {handleConnectClick && (
            <button
              onClick={handleConnectClick}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isSessionActive 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-indigo-500 hover:bg-indigo-600"
              } text-white`}
            >
              {isSessionActive ? "Stop Session" : "Start Session"}
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}