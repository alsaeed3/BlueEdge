'use client';

import { useEffect, useRef } from 'react';

interface WaveAvatarProps {
  isAIActive: boolean;
  audioLevel?: number; // Audio level from 0 to 1
}

export const WaveAvatar: React.FC<WaveAvatarProps> = ({ isAIActive, audioLevel = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const drawSiriEffect = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Calculate dynamic amplitude based on AI activity and audio level
      const baseSize = 40;
      const maxAdditionalSize = 60;
      let currentSize = baseSize;
      
      if (isAIActive) {
        currentSize = baseSize + (maxAdditionalSize * audioLevel);
      }
      
      // Number of circles to draw
      const numCircles = 5;
      
      // Draw multiple concentric circles with varying opacity
      for (let i = 0; i < numCircles; i++) {
        // Calculate current circle size with oscillation
        const oscillation = Math.sin(time * 1.5) * 10;
        const circleSize = currentSize + (i * 15) + oscillation;
        
        // Calculate opacity (fade out as circles get larger)
        const baseOpacity = isAIActive ? 0.7 : 0.3;
        const opacity = baseOpacity * (1 - (i / numCircles));
        
        // Create gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, circleSize);
        gradient.addColorStop(0, `rgba(99, 102, 241, ${opacity})`);     // Indigo
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity * 0.8})`); // Blue
        gradient.addColorStop(1, `rgba(37, 99, 235, 0)`);               // Transparent
        
        ctx.fillStyle = gradient;
        
        // Draw the circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw center orb
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseSize);
      centerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      centerGradient.addColorStop(0.5, 'rgba(147, 197, 253, 0.9)');
      centerGradient.addColorStop(1, 'rgba(59, 130, 246, 0.7)');
      
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Add subtle glow effect when active
      if (isAIActive) {
        ctx.shadowColor = 'rgba(99, 102, 241, 0.8)';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseSize - 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // Update time for animation
      time += 0.05;
      
      // Continue animation
      animationRef.current = requestAnimationFrame(drawSiriEffect);
    };

    // Start animation
    drawSiriEffect();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAIActive, audioLevel]);

  return (
    <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden shadow-lg bg-gradient-to-b from-gray-900 to-black">
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={300} 
        className="w-full h-full"
      />
    </div>
  );
};