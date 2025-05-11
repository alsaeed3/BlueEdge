'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PointsRewardProps {
  initialPoints?: number;
  earnedPoints?: number;
  message?: string;
}

export default function PointsReward({
  initialPoints = 1250,
  earnedPoints = 100,
  message = "Points Added!"
}: PointsRewardProps) {
  const [currentPoints, setCurrentPoints] = useState(initialPoints);
  const [isAnimating, setIsAnimating] = useState(false);
  const [coins, setCoins] = useState<number[]>([]);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  // Helper function to create random offset for coin animation
  const randomOffset = () => Math.random() * 50 - 25;
  
  useEffect(() => {
    // Start animation when component mounts
    startAnimation();
    
    // Cleanup
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);
  
  const startAnimation = () => {
    // Reset animation state
    setCurrentPoints(initialPoints);
    setIsAnimating(true);
    
    // Create 5 coins with slight delays
    const newCoins = Array(5).fill(0).map((_, i) => i);
    setCoins(newCoins);
    
    // Animate points counter
    let count = 0;
    const intervalTime = Math.max(50, 1000 / earnedPoints);
    const interval = setInterval(() => {
      count++;
      setCurrentPoints(prev => {
        const next = prev + 1;
        if (count >= earnedPoints) {
          clearInterval(interval);
        }
        return next;
      });
    }, intervalTime);
    
    // Clean up animation
    animationRef.current = setTimeout(() => {
      setIsAnimating(false);
      setCoins([]);
    }, 3000);
  };
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div className="relative flex flex-col items-center justify-center p-6 w-full max-w-sm">
      {/* Points container with glow effect */}
      <motion.div
        className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-md p-8 rounded-xl w-full relative overflow-hidden border border-amber-500/30"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Background decoration - partial circle */}
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-amber-500/10 rounded-full pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-amber-500/5 rounded-full pointer-events-none" />
        
        {/* Coin animation container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatePresence>
            {isAnimating && coins.map((coin, index) => (
              <motion.div
                key={`coin-${index}`}
                className="absolute bottom-0 left-1/2"
                initial={{ y: 100, x: randomOffset(), opacity: 0, rotate: -30 }}
                animate={{ 
                  y: -150, 
                  x: randomOffset(), 
                  opacity: [0, 1, 1, 0],
                  rotate: 30,
                  scale: [0.7, 1, 1, 0.9]
                }}
                transition={{ 
                  duration: 2,
                  delay: index * 0.15,
                  times: [0, 0.2, 0.8, 1],
                  ease: "easeOut"
                }}
              >
                {/* Gold coin SVG */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg border-2 border-yellow-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-800/80">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Points label */}
          <motion.div
            className="text-center mb-4"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-amber-500 text-xl font-medium">LOYALTY POINTS</h3>
          </motion.div>
          
          {/* Points counter */}
          <motion.div
            className="flex items-center justify-center mb-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="text-5xl font-bold text-white flex items-baseline">
              {formatNumber(currentPoints)}
              
              {/* Points notification */}
              <AnimatePresence>
                {isAnimating && (
                  <motion.span 
                    className="text-amber-400 ml-2 text-xl"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    +{earnedPoints}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Message */}
          <AnimatePresence mode="wait">
            {isAnimating ? (
              <motion.div 
                key="earning"
                className="text-center text-amber-300 font-medium mb-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ delay: 0.3 }}
              >
                {message}
              </motion.div>
            ) : (
              <motion.div 
                key="static"
                className="text-center text-amber-200/70 text-sm mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Earn more points with every transaction
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Progress indicator */}
          {/* <motion.div 
            className="relative h-2 w-full bg-amber-900/20 rounded-full mt-4 overflow-hidden"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ 
                width: isAnimating 
                  ? `${Math.min(100, ((currentPoints / (initialPoints + earnedPoints)) * 100))}%`
                  : `${Math.min(100, ((initialPoints / (initialPoints + 500)) * 100))}%`
              }}
              transition={{ duration: 1.5 }}
            />
          </motion.div> */}
          
          {/* Next reward level */}
          {/* <motion.div
            className="text-center text-amber-200/60 text-xs mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {earnedPoints} points until next loyalty level
          </motion.div> */}
        </div>
      </motion.div>
      
    </div>
  );
}