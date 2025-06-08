'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { AnimatedTitle } from './ui/AnimatedTitle';
import YoutubeFormFuturistic from './YoutubeFormFuturistic';
import { AgentPulse } from './AgentPulse';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

// Custom hook for enhanced mouse position tracking with slower spring physics
const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Slower spring config for more gentle movement
  const springConfig = { damping: 35, stiffness: 80 }; // Increased damping, reduced stiffness
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (-1 to 1) with reduced sensitivity
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;
      
      mouseX.set(normalizedX * 15); // Reduced sensitivity from 30 to 15
      mouseY.set(normalizedY * 15);
      setPosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, springX, springY, position };
};

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  // Enhanced parallax effect values
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  // Use the enhanced mouse position hook
  const { mouseX, mouseY, springX, springY, position } = useMousePosition();
  
  // Header hover state
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  
  // Generate cosmic particles
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number}>>([]);
  const [headerParticles, setHeaderParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number}>>([]);
  
  useEffect(() => {
    // Generate random particles for main section
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4
    }));
    setParticles(newParticles);
  }, []);
  
  useEffect(() => {
    if (isHeaderHovered) {
      // Generate random particles when header is hovered
      const newParticles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5, // Smaller particles for subtlety
        duration: Math.random() * 4 + 2
      }));
      setHeaderParticles(newParticles);
    } else {
      setHeaderParticles([]);
    }
  }, [isHeaderHovered]);
  
  return (
    <>
      {/* Integrated Header - now part of the HeroSection with improved seamless integration */}
      <motion.header 
        className="sticky top-0 z-50 w-full border-b border-indigo-500/10"
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        {/* Shared cosmic background with HeroSection - improved matching */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050714] to-[#050714]/90 backdrop-blur-md" />
        
        {/* Cosmic nebula effect that follows mouse - shared with HeroSection with reduced intensity */}
        <motion.div 
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="absolute w-full h-full"
            style={{
              background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.03) 0%, transparent 70%)`,
              filter: 'blur(30px)',
            }}
          />
        </motion.div>
        
        {/* Subtle grid pattern overlay - shared with HeroSection */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />
        
        {/* Dynamic floating particles on hover with reduced velocity */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <AnimatePresence>
            {headerParticles.map((particle) => (
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
                    `${particle.x + (Math.sin(particle.id) * 3)}%` // Reduced movement from 5 to 3
                  ],
                  y: [
                    `${particle.y}%`, 
                    `${particle.y + (Math.cos(particle.id) * 3)}%` // Reduced movement from 5 to 3
                  ],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: particle.duration * 1.5, // Slowed down by increasing duration
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
              AI Content Agent
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

      {/* Main Hero Section */}
      <motion.section 
        ref={sectionRef}
        className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
        style={{ opacity }}
      >
        {/* Deep space gradient background with enhanced depth */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-950/30 via-[#050714] to-purple-950/20" />
        
        {/* Improved grid pattern with reduced dot density */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 -z-10" />
        
        {/* Cosmic nebula effect - advanced background animation with reduced intensity */}
        <motion.div 
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className="absolute w-full h-full"
            style={{
              background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.02) 0%, transparent 50%)`, // Reduced opacity
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
        
        {/* Enhanced cosmic animated lines with depth effect and slower movement */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
            animate={{ 
              x: ["-100%", "100%"],
            }}
            transition={{ 
              duration: 25, // Increased from 18 to 25 for slower movement
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ 
              y: useTransform(springY, [-30, 30], [10, -10]), // Reduced movement range
              filter: 'blur(0.5px)',
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            animate={{ 
              x: ["100%", "-100%"],
            }}
            transition={{ 
              duration: 30, // Increased from 24 to 30 for slower movement
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ 
              y: useTransform(springY, [-30, 30], [-7, 7]), // Reduced movement range
              filter: 'blur(0.5px)',
            }}
          />
          <motion.div 
            className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/35 to-transparent"
            animate={{ 
              x: ["-100%", "100%"],
            }}
            transition={{ 
              duration: 28, // Increased from 21 to 28 for slower movement
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ 
              y: useTransform(springY, [-30, 30], [5, -5]), // Reduced movement range
              filter: 'blur(0.5px)',
            }}
          />
        </div>
        
        {/* Enhanced atmospheric glow effects with interactive movement - reduced intensity */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            className="absolute top-1/3 left-1/5 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[150px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2], // Reduced max opacity
            }}
            transition={{ 
              duration: 20, // Increased from 15 to 20 for slower movement
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              x: useTransform(springX, [-30, 30], [-30, 30]), // Reduced movement range
              y: useTransform(springY, [-30, 30], [-30, 30]), // Reduced movement range
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/5 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[130px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{ 
              duration: 24, // Increased from 18 to 24 for slower movement
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              x: useTransform(springX, [-30, 30], [40, -40]), // Reduced movement range
              y: useTransform(springY, [-30, 30], [40, -40]), // Reduced movement range
            }}
          />
        </div>
        
        {/* Dynamic floating particles with mouse interaction - slower movement */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-indigo-400/30"
                style={{
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  filter: 'blur(0.5px)',
                }}
                animate={{
                  x: [
                    `${particle.x}%`, 
                    `${particle.x + (Math.sin(particle.id) * 6)}%` // Reduced movement from 10 to 6
                  ],
                  y: [
                    `${particle.y}%`, 
                    `${particle.y + (Math.cos(particle.id) * 6)}%` // Reduced movement from 10 to 6
                  ],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: particle.duration * 1.5, // Slowed down by increasing duration
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* Cosmic portal effect with slower rotation */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] -z-10 opacity-10 pointer-events-none"
          style={{
            x: useTransform(springX, [-30, 30], [-10, 10]), // Reduced movement range
            y: useTransform(springY, [-30, 30], [-10, 10]), // Reduced movement range
          }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-indigo-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }} // Increased from 60 to 80 for slower rotation
          />
          <motion.div 
            className="absolute inset-[5%] rounded-full border border-blue-400/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 65, repeat: Infinity, ease: "linear" }} // Increased from 45 to 65 for slower rotation
          />
          <motion.div 
            className="absolute inset-[10%] rounded-full border border-purple-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }} // Increased from 30 to 50 for slower rotation
          />
          <motion.div 
            className="absolute inset-[15%] rounded-full border-2 border-indigo-600/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }} // Increased from 40 to 60 for slower rotation
          />
          <motion.div 
            className="absolute inset-[20%] rounded-full border border-blue-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }} // Increased from 50 to 70 for slower rotation
          />
        </motion.div>
        
        {/* Floating 3D elements that react to mouse movement - reduced sensitivity */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[20%] left-[15%] w-16 h-16 opacity-20"
            style={{
              x: useTransform(springX, [-30, 30], [25, -25]), // Reduced movement range
              y: useTransform(springY, [-30, 30], [25, -25]), // Reduced movement range
              rotateX: useTransform(springY, [-30, 30], [10, -10]), // Reduced rotation
              rotateY: useTransform(springX, [-30, 30], [-10, 10]), // Reduced rotation
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full border border-indigo-500/30 rounded-md transform rotate-45" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-[25%] right-[20%] w-20 h-20 opacity-20"
            style={{
              x: useTransform(springX, [-30, 30], [-30, 30]), // Reduced movement range
              y: useTransform(springY, [-30, 30], [-30, 30]), // Reduced movement range
              rotateX: useTransform(springY, [-30, 30], [-15, 15]), // Reduced rotation
              rotateY: useTransform(springX, [-30, 30], [15, -15]), // Reduced rotation
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full border-2 border-blue-400/30 rounded-full" />
          </motion.div>
          
          {/* Floating tetrahedron with slower rotation */}
          <motion.div
            className="absolute top-[60%] left-[70%] w-24 h-24 opacity-20"
            style={{
              x: useTransform(springX, [-30, 30], [-20, 20]), // Reduced movement range
              y: useTransform(springY, [-30, 30], [20, -20]), // Reduced movement range
              rotateX: useTransform(springY, [-30, 30], [15, -15]), // Reduced rotation
              rotateY: useTransform(springX, [-30, 30], [-15, 15]), // Reduced rotation
              rotateZ: useTransform(scrollYProgress, [0, 1], [0, 120]), // Reduced rotation
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15 L90 85 L10 85 Z" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{ y }}
        >
          <div className="flex flex-col items-center gap-16 text-center max-w-4xl mx-auto">
            {/* Main content with enhanced 3D effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="space-y-8"
              style={{
                x: useTransform(springX, [-30, 30], [10, -10]), // Reduced movement range
                y: useTransform(springY, [-30, 30], [5, -5]), // Reduced movement range
                perspective: 1000,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated title with enhanced space-themed typography */}
              <AnimatedTitle 
                text="Meet Your Personal AI Content Agent"
                highlightedText="AI Content Agent"
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-50 tracking-tight leading-[1.1]"
                glowColor="#6366f1"
                delay={0.3}
                subtitle="Transform your YouTube content with AI-powered analysis and optimization."
              />
            </motion.div>
            
            {/* Futuristic YouTube form with improved spacing and 3D effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-full"
              style={{
                x: useTransform(springX, [-30, 30], [-5, 5]), // Reduced movement range
                y: useTransform(springY, [-30, 30], [-3, 3]), // Reduced movement range
                transformStyle: 'preserve-3d',
              }}
            >
              <YoutubeFormFuturistic />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Enhanced scroll indicator with improved styling and animation */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-indigo-400/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            y: useTransform(scrollYProgress, [0, 0.1], [0, 20]),
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
          }}
        >
          <span className="text-sm font-medium tracking-wider">Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2.5, // Increased from 2 to 2.5 for slower animation
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 5L12 19M12 19L19 12M12 19L5 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}