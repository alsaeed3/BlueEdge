// @ts-nocheck
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper: Sine Wave Generator (draws multiple sine lines on canvas)
function drawSineWaves({
  ctx,
  width,
  height,
  isSpeaking,
  wavesConfig,
  gradient,
  maskRadius,
}) {
  ctx.clearRect(0, 0, width, height);

  // Mask to a circle (globe)
  ctx.save();
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, maskRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Draw globe background - Updated to match app's slate-900/purple-900 gradient
  const globeGradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    maskRadius * 0.2,
    width / 2,
    height / 2,
    maskRadius
  );
  globeGradient.addColorStop(0, "rgba(76, 29, 149, 0.95)"); // purple-900
  globeGradient.addColorStop(0.5, "rgba(88, 28, 135, 0.97)"); // purple-950
  globeGradient.addColorStop(1, "rgba(15, 23, 42, 0.98)"); // slate-900

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, maskRadius, 0, Math.PI * 2);
  ctx.fillStyle = globeGradient;
  ctx.fill();

  // Draw straight line if not speaking
  if (!isSpeaking) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(width * 0.13, height / 2);
    ctx.lineTo(width * 0.87, height / 2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "#a855f7"; // Updated to purple-500
    ctx.shadowBlur = 5;
    ctx.stroke();
    ctx.restore();
    ctx.restore();
    return;
  }

  // Draw animated waves
  const now = Date.now() / 800;
  wavesConfig.forEach((wave, i) => {
    ctx.save();
    ctx.beginPath();
    for (let x = width * 0.13; x <= width * 0.87; x += 1) {
      // Sine function for each wave
      const progress = x / wave.wavelength;
      const time = now * wave.timeModifier;
      const y =
        height / 2 +
        Math.sin(progress + time) * wave.amplitude *
        // Add a little fade at both ends
        Math.sin(
          (Math.PI * (x - width * 0.13)) /
            (width * 0.87 - width * 0.13)
        );

      if (x === width * 0.13) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = gradient;
    ctx.lineWidth = wave.lineWidth;
    ctx.globalAlpha = 0.85;
    ctx.shadowColor = "#c084fc"; // Updated to purple-400
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.restore();
  });

  ctx.restore();
}

/**
 * SiriWave - a React dark bluish globe Siri-like animated wave component.
 *
 * Props:
 * @param {boolean} isSpeaking - If true, shows animated waves; if false, shows a straight line.
 * @param {number} size - Width and height of the globe (default: 220)
 * @param {string} className - Additional className for the container
 */
export default function SiriWave({
  isSpeaking = false,
  size = 220,
  className = "",
}: {
  isSpeaking?: boolean;
  size?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Wave configuration
  const wavesConfig = [
    { timeModifier: 4, lineWidth: 2, amplitude: 25, wavelength: 25 },
    { timeModifier: 2, lineWidth: 2, amplitude: 10, wavelength: 30 },
    { timeModifier: 1, lineWidth: 2, amplitude: 30, wavelength: 30 },
    { timeModifier: 3, lineWidth: 2, amplitude: 40, wavelength: 40 },
    { timeModifier: 0.5, lineWidth: 2, amplitude: 60, wavelength: 60 },
    { timeModifier: 1.3, lineWidth: 2, amplitude: 40, wavelength: 40 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Gradient for wave lines
    let gradient = ctx.createLinearGradient(0, 0, size, 0);
    gradient.addColorStop(0, "rgba(25,255,255,0.4)");
    gradient.addColorStop(0.5, "rgba(124,58,237,0.85)"); // violet-600
    gradient.addColorStop(1, "rgba(16,185,129,0.4)"); // emerald-500

    const maskRadius = size / 2 - 5;

    function animate() {
      drawSineWaves({
        ctx,
        width: size,
        height: size,
        isSpeaking,
        wavesConfig,
        gradient,
        maskRadius,
      });
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpeaking, size]);

  return (
    <div
      className={`relative rounded-full overflow-hidden shadow-2xl border border-slate-800 bg-gradient-to-b from-blue-950 to-slate-900 flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        boxShadow:
          "0 6px 32px 0 rgba(16, 29, 80, 0.30), 0 0px 0px 1px #334155",
      }}
    >
      <AnimatePresence>
        <motion.canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>
      {/* Subtle glow for globe */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-blue-400/10 to-blue-900/0 blur-2xl" />
    </div>
  );
}