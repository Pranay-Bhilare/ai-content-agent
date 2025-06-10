'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

type FuturisticInputProps = {
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FuturisticInput({
  name,
  placeholder = '',
  type = 'text',
  className = '',
  required = false,
  defaultValue = '',
  onChange,
}: FuturisticInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-50, 50], [1, -1]);
  const rotateY = useTransform(mouseX, [-50, 50], [-1, 1]);
  
  // Handle cursor position for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setCursorPosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
      
      // Calculate distance from center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
      
      if (!isHovered) setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };
  
  // Generate random particles
  const particles = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2 + 1
  }));

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background with animated cosmic border */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: isFocused
            ? `0 0 0 2px rgba(99, 102, 241, 0.6), 0 0 20px 2px rgba(99, 102, 241, 0.4)`
            : isHovered
              ? `0 0 0 1px rgba(99, 102, 241, 0.3), 0 0 10px 1px rgba(99, 102, 241, 0.2)`
              : `0 0 0 1px rgba(99, 102, 241, 0.15)`,
        }}
        transition={{ duration: 0.2 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      />
      
      {/* Cosmic glow effect that follows cursor */}
      <AnimatePresence>
        {(isFocused || isHovered) && (
          <motion.div
            className="absolute inset-0 opacity-30 rounded-lg overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 0.3 : 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${cursorPosition.x}% ${cursorPosition.y}%, rgba(99, 102, 241, 0.8), transparent 70%)`,
                filter: 'blur(8px)',
              }}
              animate={{
                scale: isFocused ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isFocused ? Infinity : 0,
                repeatType: 'reverse',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating particles that appear on focus */}
      <AnimatePresence>
        {isFocused && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-indigo-400/30"
            initial={{ 
              opacity: 0,
              x: `${particle.x}%`, 
              y: `${particle.y}%`, 
              width: particle.size,
              height: particle.size,
            }}
            animate={{ 
              opacity: [0, 0.7, 0],
              x: [`${particle.x}%`, `${particle.x + (Math.random() * 20 - 10)}%`],
              y: [`${particle.y}%`, `${particle.y + (Math.random() * 20 - 10)}%`],
              scale: [0.8, 1.2, 0.8],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: particle.duration, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            style={{
              filter: 'blur(0.5px)',
              zIndex: 5,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Input field with space-themed styling */}
      <motion.input
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-[rgba(13,17,38,0.4)] backdrop-blur-sm text-gray-100 rounded-lg focus:outline-none relative z-10 transition-all duration-200 placeholder:text-gray-400"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(1px)',
        }}
        whileFocus={{ boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.3)' }}
      />
      
      {/* Animated placeholder dots with cosmic styling */}
      <AnimatePresence>
        {isFocused && value.length === 0 && (
          <motion.div 
            className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-1 z-10 pointer-events-none"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400/50"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}