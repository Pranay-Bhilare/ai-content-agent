'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type HolographicCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverScale?: number;
  rotationIntensity?: number;
};

export function HolographicCard({
  children,
  className = '',
  glowColor = '#3B82F6',
  hoverScale = 1.02,
  rotationIntensity = 10,
}: HolographicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse movement for 3D rotation effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: isHovered ? -mousePosition.y * rotationIntensity : 0,
        rotateY: isHovered ? mousePosition.x * rotationIntensity : 0,
        scale: isHovered ? hoverScale : 1,
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 200,
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
    >
      {/* Glassmorphism background */}
      <div 
        className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl z-0"
        style={{
          boxShadow: isHovered ? `0 0 20px 2px ${glowColor}40` : 'none',
        }}
      />
      
      {/* Holographic glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 opacity-30 z-0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 100}% ${50 + mousePosition.y * 100}%, ${glowColor}, transparent 70%)`,
          }}
        />
      )}
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl z-0"
        animate={{
          boxShadow: isHovered ? `inset 0 0 0 1px ${glowColor}80` : 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}