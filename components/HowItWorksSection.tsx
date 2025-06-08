'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { HolographicCard } from './ui/HolographicCard';

// Custom hook for mouse position tracking
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}

type StepProps = {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
};

function Step({ number, title, description, icon, delay = 0 }: StepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  // Mouse tracking for 3D effect
  const mousePosition = useMousePosition();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform values for 3D rotation
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-5, 5]);
  
  // Handle mouse movement for card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  // Generate particles for cosmic effect
  const particles = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 2 + 1
  }));
  
  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-6 relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      {/* Step number with enhanced glow effect */}
      <motion.div 
        className="relative flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(20px)',
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-indigo-600/30 rounded-full blur-lg"
          animate={{ 
            scale: [1.1, 1.4, 1.1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div 
          className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(99, 102, 241, 0.3) inset',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            transform: 'translateZ(5px)',
          }}
        >
          {number}
        </motion.div>
      </motion.div>
      
      {/* Step content with 3D effect */}
      <div className="flex-1">
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            rotateX,
            rotateY,
          }}
        >
          <HolographicCard 
            className="p-6" 
            glowColor="#4F46E5" 
            hoverScale={1.03}
            rotationIntensity={15}
          >
            <div className="flex items-start gap-4">
              {/* Icon with cosmic glow */}
              <motion.div 
                className="relative text-indigo-500 text-2xl flex-shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: delay + 0.2 }}
                style={{ transform: 'translateZ(15px)' }}
              >
                <motion.div 
                  className="absolute inset-0 bg-indigo-500/20 blur-md rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                {icon}
              </motion.div>
              
              <div style={{ transform: 'translateZ(10px)' }}>
                {/* Title with animated underline */}
                <motion.h3 
                  className="text-lg font-semibold mb-2 text-gray-100 relative inline-block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: delay + 0.3 }}
                >
                  {title}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: delay + 0.5 }}
                    style={{
                      boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
                    }}
                  />
                </motion.h3>
                
                {/* Description with improved readability */}
                <motion.p 
                  className="text-gray-300 text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: delay + 0.4 }}
                >
                  {description}
                </motion.p>
              </div>
            </div>
            
            {/* Floating particles */}
            <AnimatePresence>
              {particles.map((particle) => (
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
          </HolographicCard>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  // Parallax and opacity effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // Mouse position for cosmic background effect
  const mousePosition = useMousePosition();
  
  // Generate particles for cosmic effect
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 4 + 2
  }));
  
  // Steps data
  const steps = [
    {
      number: 1,
      title: 'Paste YouTube URL',
      description: 'Simply paste any YouTube video URL into our futuristic interface.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes the video content, transcripts, and metadata in seconds.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      number: 3,
      title: 'Get Insights',
      description: 'Receive detailed insights, transcripts, and content optimization suggestions.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      number: 4,
      title: 'Enhance Content',
      description: 'Use AI-generated suggestions to improve your titles, descriptions, and thumbnails.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-[#050714]/80"
      style={{ opacity }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
          filter: 'blur(60px)',
        }}
      />
      
      <motion.div 
        className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 45]),
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [50, -50]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, -45]),
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] opacity-30 -z-10" />
      
      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-indigo-400/20"
            initial={{ 
              opacity: 0,
              x: `${particle.x}%`, 
              y: `${particle.y}%`, 
              width: particle.size,
              height: particle.size,
            }}
            animate={{ 
              opacity: [0, 0.5, 0],
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
              filter: 'blur(1px)',
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Cosmic orbital rings */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-indigo-500/10 rounded-full -z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{
          boxShadow: '0 0 40px rgba(99, 102, 241, 0.1) inset',
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-blue-500/5 rounded-full -z-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        style={{
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.05) inset',
        }}
      />
      
      <div className="container mx-auto px-4">
        {/* Section title with enhanced cosmic styling */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{
            perspective: 1000,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transform: 'translateZ(30px)' }}
            whileHover={{
              scale: 1.05,
              textShadow: '0 0 20px rgba(99, 102, 241, 0.8)',
            }}
          >
            How It Works
          </motion.h2>
          
          <motion.div 
            className="h-1.5 w-20 bg-gradient-to-r from-indigo-400 to-blue-400 mx-auto mb-6 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 100, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transform: 'translateZ(20px)' }}
          />
          
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ transform: 'translateZ(10px)' }}
          >
            Our AI-powered platform makes it easy to analyze and optimize your YouTube content in just a few steps.
          </motion.p>
        </motion.div>
        
        {/* Steps with enhanced 3D and cosmic styling */}
        <div className="max-w-3xl mx-auto space-y-12 relative">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              delay={0.2 + index * 0.1}
            />
          ))}
          
          {/* Enhanced connecting line between steps */}
          <motion.div 
            className="absolute left-6 top-[12rem] bottom-20 w-0.5 bg-gradient-to-b from-indigo-400/50 via-blue-400/50 to-indigo-400/50 -z-10 ml-6"
            style={{ 
              height: 'calc(100% - 24rem)',
              top: '12rem',
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
            }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          
          {/* Pulsating energy points along the line */}
          {[0, 0.33, 0.66, 1].map((position, i) => (
            <motion.div 
              key={i}
              className="absolute left-6 ml-6 w-3 h-3 rounded-full bg-indigo-400 -z-10"
              style={{ 
                top: `calc(12rem + ${position * (100 - 24)}%)`,
                marginLeft: '-5px',
                boxShadow: '0 0 10px 2px rgba(99, 102, 241, 0.6)',
              }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}