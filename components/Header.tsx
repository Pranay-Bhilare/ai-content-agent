'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { AgentPulse } from './AgentPulse';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

// Custom hook for mouse position tracking with enhanced sensitivity
const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (-1 to 1)
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;
      
      mouseX.set(normalizedX * 40); // Enhanced sensitivity
      mouseY.set(normalizedY * 40);
      setPosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, position };
};

export default function Header() {
  const { mouseX, mouseY, position } = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate cosmic particles
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number}>>([]);
  
  useEffect(() => {
    if (isHovered) {
      // Generate random particles when header is hovered
      const newParticles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5, // Smaller particles for subtlety
        duration: Math.random() * 4 + 2
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-indigo-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cosmic background that matches HeroSection */}
      <div className="absolute inset-0 -z-10 bg-[#050714]/80 backdrop-blur-md" />
      
      {/* Cosmic nebula effect that follows mouse */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.05) 0%, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />
      </motion.div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />
      
      {/* Dynamic floating particles on hover */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-indigo-400/20"
              style={{
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                filter: 'blur(0.5px)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: [
                  `${particle.x}%`, 
                  `${particle.x + (Math.sin(particle.id) * 5)}%`
                ],
                y: [
                  `${particle.y}%`, 
                  `${particle.y + (Math.cos(particle.id) * 5)}%`
                ],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: particle.duration,
                ease: "easeInOut",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <AgentPulse size="small" />
          <span className="font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-indigo-400 tracking-tight">
            UGen
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-md bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 text-sm font-medium transition-all duration-200 border border-indigo-500/20 hover:border-indigo-500/40 backdrop-blur-sm">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </motion.header>
  );
}