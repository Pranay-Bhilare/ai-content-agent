'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FuturisticInput } from './ui/FuturisticInput';
import { PulsatingButton } from './ui/PulsatingButton';
import { analyseYoutubeVideo } from '@/actions/analyseYoutubeVideo';
import Form from 'next/form';

export default function YoutubeFormFuturistic() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-100, 100], [2, -2]);
  const rotateY = useTransform(mouseX, [-100, 100], [-2, 2]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
    
    if (!isHovered) setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  
  // Generate random particles
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2
  }));
  
  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Form with cosmic glassmorphism effect */}
      <motion.div 
        className="relative bg-[rgba(13,17,38,0.3)] backdrop-blur-xl border border-indigo-500/10 rounded-xl shadow-lg overflow-hidden"
        initial={{ boxShadow: '0 0 0 rgba(99, 102, 241, 0)' }}
        animate={{ 
          boxShadow: isHovered
            ? '0 10px 40px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(99, 102, 241, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(99, 102, 241, 0.1)'
        }}
        transition={{ duration: 0.4 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cosmic gradient overlay with enhanced depth */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(2px)',
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Enhanced glow effect with depth */}
        <motion.div 
          className="absolute -inset-1 bg-indigo-500/20 blur-3xl opacity-0 rounded-full -z-10"
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Floating particles that appear on hover */}
        <AnimatePresence>
          {isHovered && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-indigo-400/30"
              initial={{ 
                opacity: 0,
                x: particle.x, 
                y: particle.y, 
                width: particle.size,
                height: particle.size,
              }}
              animate={{ 
                opacity: [0, 0.8, 0],
                x: [particle.x, particle.x + (Math.random() * 40 - 20)],
                y: [particle.y, particle.y + (Math.random() * 40 - 20)],
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
                transformStyle: 'preserve-3d',
                transform: 'translateZ(5px)',
              }}
            />
          ))}
        </AnimatePresence>
        
        <Form 
          action={analyseYoutubeVideo} 
          className="flex flex-col sm:flex-row items-center p-4 sm:p-3 relative z-10"
        >
          <div className="flex-1 w-full p-2">
            <FuturisticInput 
              name="url"
              placeholder="Enter YouTube URL"
              required
            />
          </div>
          
          <div className="p-2">
            <PulsatingButton 
              type="submit" 
              className="whitespace-nowrap"
              glowColor="rgba(99, 102, 241, 0.6)"
              pulseColor="rgba(139, 92, 246, 0.4)"
              hoverScale={1.05}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center"
              >
                Analyse
                <motion.svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="ml-2"
                >
                  <path 
                    d="M13 5L20 12L13 19M4 12H20" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.span>
            </PulsatingButton>
          </div>
        </Form>
        
        <motion.div
          className="px-5 py-3 bg-indigo-500/5 border-t border-indigo-500/10 text-center sm:text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(1px)',
          }}
        >
          <motion.p 
            className="text-xs text-gray-400 font-medium tracking-wide"
            whileHover={{ color: '#a5b4fc' }}
            transition={{ duration: 0.2 }}
          >
            Paste any YouTube URL to get AI-powered insights and optimization
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}