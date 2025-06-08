'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

type PulsatingButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  glowColor?: string;
  pulseColor?: string;
  hoverScale?: number;
};

export function PulsatingButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  glowColor = 'rgba(99, 102, 241, 0.6)', // Default indigo glow
  pulseColor = 'rgba(99, 102, 241, 0.4)', // Default indigo pulse
  hoverScale = 1.02,
}: PulsatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-30, 30], [2, -2]);
  const rotateY = useTransform(mouseX, [-30, 30], [-2, 2]);
  
  // Generate particles for hover effect
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 2 + 1
  }));
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-3 rounded-lg font-medium text-white overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Cosmic background gradient */}
      <motion.div
        className="absolute inset-0 rounded-lg z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))', // Updated to match cosmic theme
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          boxShadow: isPressed
            ? `0 0 0 2px ${glowColor} inset, 0 0 20px 2px ${glowColor}`
            : isHovered
              ? `0 0 0 1px ${glowColor} inset, 0 0 15px 1px ${glowColor}`
              : `0 0 0 1px ${glowColor.replace(/[^,]+(?=\))/, '0.15')} inset`,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Enhanced pulsating glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.7 : 0.5,
          scale: isHovered ? [1, 1.05, 1] : [1, 1.03, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute -inset-1 rounded-lg"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${pulseColor}, transparent 70%)`,
            filter: 'blur(8px)',
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Floating particles on hover */}
      <AnimatePresence>
        {isHovered && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/40"
            initial={{ 
              opacity: 0,
              x: `${particle.x}%`, 
              y: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              x: [`${particle.x}%`, `${particle.x + (Math.random() * 20 - 10)}%`],
              y: [`${particle.y}%`, `${particle.y + (Math.random() * 20 - 10)}%`],
              scale: [0, 1, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: particle.duration, 
              ease: "easeInOut",
            }}
            style={{
              filter: 'blur(0.5px)',
              zIndex: 5,
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Button content with subtle 3D transform */}
      <motion.div 
        className="relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(2px)',
        }}
      >
        {children}
      </motion.div>
      
      {/* Subtle border glow */}
      <motion.div 
        className="absolute inset-0 rounded-lg border border-indigo-500/30 z-0"
        animate={{
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}