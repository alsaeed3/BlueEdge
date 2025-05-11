'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface VoucherProps {
  title: string;
  code?: string;
  discount?: string;
  expiryDate?: string;
  description?: string;
  backgroundColor?: string;
  carImageUrl?: string;
  onClaim?: () => void;
}

const Voucher: React.FC<VoucherProps> = ({
  title,
  code,
  discount,
  expiryDate,
  description = 'Use this voucher for your next purchase',
  backgroundColor = 'bg-gradient-to-r from-purple-600 to-indigo-600',
  carImageUrl = '/car.png',
  onClaim,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Copy voucher code to clipboard
  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  // Celebration animation effect with re-trigger capability
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 4000);
    return () => clearTimeout(timer);
  }, []);
  
  // Function to manually trigger the animation again
  const triggerAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  };

  return (
    <div className="relative my-8 max-w-xl mx-auto">
      {/* Celebration confetti effect */}
      {isAnimating && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {/* Large burst confetti */}
          {[...Array(100)].map((_, i) => {
            const xDist = (Math.random() - 0.5) * 800;
            const yDist = Math.random() * 800 - 200;
            const rotation = Math.random() * 1080 - 540;
            const delay = Math.random() * 0.8;
            const color = ['#FFC107', '#FF5722', '#03A9F4', '#4CAF50', '#E91E63', '#FFEB3B', '#9C27B0', '#F44336', '#2196F3', '#CDDC39'][Math.floor(Math.random() * 10)];
            const size = 5 + Math.random() * 15;
            const shape = ['50%', '0%', '50% 0', '0 50%'][Math.floor(Math.random() * 4)];
            const duration = 2.5 + Math.random() * 2;
            
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  '--x-dist': `${xDist}px`,
                  '--y-dist': `${yDist}px`,
                  '--rotation': `${rotation}deg`,
                  animationDelay: `${delay}s`,
                  animation: `confetti-burst ${duration}s ease-out forwards`,
                  backgroundColor: color,
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: shape,
                  transform: 'translate(-50%, -50%)',
                  zIndex: Math.floor(Math.random() * 10) + 50,
                } as React.CSSProperties}
              />
            );
          })}
          
          {/* Glitter particles */}
          {[...Array(50)].map((_, i) => {
            const xDist = (Math.random() - 0.5) * 600;
            const yDist = Math.random() * 600 - 100;
            const rotation = Math.random() * 360;
            const delay = Math.random() * 0.3;
            const color = ['#FFF', '#FFD700', '#E0E0E0', '#FFFAF0'][Math.floor(Math.random() * 4)];
            const size = 1 + Math.random() * 4;
            const opacity = 0.7 + Math.random() * 0.3;
            const duration = 1.5 + Math.random() * 1;
            
            return (
              <div
                key={`glitter-${i}`}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  '--x-dist': `${xDist}px`,
                  '--y-dist': `${yDist}px`,
                  '--rotation': `${rotation}deg`,
                  animationDelay: `${delay}s`,
                  animation: `confetti-burst ${duration}s ease-out forwards`,
                  backgroundColor: color,
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  opacity: opacity,
                  boxShadow: `0 0 ${Math.floor(Math.random() * 5) + 2}px ${color}`,
                  transform: 'translate(-50%, -50%)',
                } as React.CSSProperties}
              />
            );
          })}
          
          {/* Streamers */}
          {[...Array(30)].map((_, i) => {
            const xDist = (Math.random() - 0.5) * 700;
            const yDist = Math.random() * 700 - 150;
            const rotation = Math.random() * 720 - 360;
            const delay = Math.random() * 0.4;
            const color = ['#FFC107', '#FF5722', '#03A9F4', '#4CAF50', '#E91E63'][Math.floor(Math.random() * 5)];
            const width = 2 + Math.random() * 5;
            const height = 20 + Math.random() * 30;
            const duration = 3 + Math.random() * 2;
            
            return (
              <div
                key={`streamer-${i}`}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  '--x-dist': `${xDist}px`,
                  '--y-dist': `${yDist}px`,
                  '--rotation': `${rotation}deg`,
                  animationDelay: `${delay}s`,
                  animation: `confetti-burst ${duration}s ease-out forwards`,
                  backgroundColor: color,
                  width: `${width}px`,
                  height: `${height}px`,
                  borderRadius: '1px',
                  transform: 'translate(-50%, -50%)',
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      )}

      {/* Voucher Card */}
      <div 
        className={`${backgroundColor} rounded-2xl shadow-2xl transform transition duration-300 scale-105 shadow-3xl relative overflow-hidden py-3`}
        onClick={triggerAnimation}
      >
        {/* Dashed Border - Ticket Style */}
        <div className="absolute left-0 top-0 bottom-0 border-r-2 border-dashed border-white/30 w-[10px]"></div>
        <div className="absolute right-0 top-0 bottom-0 border-l-2 border-dashed border-white/30 w-[10px]"></div>

        {/* Main title - Now centered at the top */}
        <div className="relative z-20 pt-5 pb-1 flex justify-center">
          <h2 className="text-white text-2xl font-bold tracking-tighter text-center">LEASING VOUCHER</h2>
        </div>

        {/* Content - Horizontal layout */}
        <div className="relative z-10 px-6 pb-6 flex flex-row items-center justify-between">
          {/* Left Side - Title and Content */}
          <div className="flex flex-col flex-1 pr-2">
            {/* Title from props - Left aligned */}
            <h1 className="text-white text-xl sm:text-2xl font-extrabold mb-4 tracking-wider">
              {title}
            </h1>

            {/* Description */}
            <p className="text-white/80 text-sm mb-4 max-w-xs">{description}</p>

            {/* Coupon Code */}
            {code && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-2 rounded-lg mb-4 w-full">
                <div className="flex-1 text-center font-mono text-white font-bold tracking-widest text-lg">
                  {code}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard();
                  }}
                  className="bg-white text-indigo-700 p-1.5 rounded bg-indigo-100 transition"
                >
                  {isCopied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>
            )}

            {/* Claim Button */}
            {onClaim && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClaim) onClaim();
                  triggerAnimation();
                }} 
                className="w-full bg-white text-indigo-700 py-2 px-4 rounded-lg font-bold text-md shadow-lg shadow-xl bg-indigo-50 transition"
              >
                Claim Now
              </button>
            )}

            {/* Expiry Date */}
            {expiryDate && (
              <p className="text-white/70 text-xs mt-3">
                Valid until: <span className="font-semibold">{expiryDate}</span>
              </p>
            )}
          </div>

          {/* Right Side - Car Image, now larger/longer */}
          <div className="relative w-48 h-36 sm:w-60 sm:h-44 flex items-center justify-center">
            <Image
              src={carImageUrl}
              alt="Featured Vehicle"
              width={240}
              height={130}
              className="object-contain drop-shadow-2xl transform -rotate-5 scale-125"
              style={{ objectFit: 'contain', objectPosition: 'center right' }}
            />
          </div>

          {/* Star Burst - Positioned in the top-right area */}
          {discount && (
            <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12 shadow-lg z-20">
              <div className="text-center font-bold text-xs text-red-800">
                <span className="block text-lg">{discount}</span>
                OFF
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Voucher;