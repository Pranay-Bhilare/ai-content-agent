'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

type AnimatedTitleProps = {
  text: string;
  highlightedText?: string;
  className?: string;
  glowColor?: string;
  delay?: number;
  subtitle?: string;
};

export function AnimatedTitle({ text, highlightedText, className, glowColor = '#6366f1', delay = 0, subtitle }: AnimatedTitleProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const subtitleControls = useAnimation();

  // Move useTransform hooks to the top level
  const rotateX = useTransform(mouseY, [-300, 300], [1, -1]);
  const rotateY = useTransform(mouseX, [-300, 300], [-1, 1]);
  const perspective = useTransform(mouseX, [-300, 300], [1000, 1100]); // Reduced perspective change
  const scale = useTransform(
    mouseX,
    [-300, 0, 300],
    [0.99, 1, 0.99] // Minimal scale change
  );
  
  const controls = useAnimation();
  const [hovered, setHovered] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Split text into words for animation
  const words = text.split(' ');
  const highlightedWords = highlightedText ? highlightedText.split(' ') : [];
  
  // Handle mouse move for minimal 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized)
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(normalizedX * 60); // Use .set() method
    mouseY.set(normalizedY * 60); // Use .set() method
    
    if (!isHovering) setIsHovering(true);
  };
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };
  
  // Start animation sequence
  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: delay + i * 0.03, // Even faster animation
        duration: 0.3, // Shorter duration
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }));
    
    if (subtitle) {
      subtitleControls.start({
        opacity: 1,
        y: 0,
        transition: {
          delay: delay + words.length * 0.03 + 0.1, // Faster animation
          duration: 0.4, // Shorter duration
          ease: [0.2, 0.65, 0.3, 0.9],
        },
      });
    }
  }, [controls, subtitleControls, delay, words.length, subtitle]);

  // Generate minimal particles
  const particles = Array.from({ length: 5 }).map((_, i) => ({ // Significantly reduced particle count
    id: i,
    x: Math.random() * 80 - 40, // Reduced range
    y: Math.random() * 80 - 40, // Reduced range
    size: Math.random() * 1.5 + 0.5, // Smaller particles
    duration: Math.random() * 1.5 + 1 // Faster animation
  }));

  return (
    <div className="space-y-4">
      <motion.div 
        className={`${className} relative`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Minimal cosmic background glow effect */}
        <motion.div 
          className="absolute -inset-8 bg-gradient-to-r from-indigo-900/3 via-transparent to-blue-900/3 rounded-full blur-3xl" // Reduced opacity
          animate={{
            scale: isHovering ? [1, 1.02, 1] : 1, // Minimal scale
            opacity: isHovering ? [0.05, 0.08, 0.05] : 0.05, // Reduced opacity
          }}
          transition={{ duration: 3, repeat: isHovering ? Infinity : 0, repeatType: 'reverse' }}
        />
        
        {/* Minimal floating particles */}
        <AnimatePresence>
          {isHovering && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-indigo-400/10" // Reduced opacity
              initial={{ 
                x: particle.x, 
                y: particle.y, 
                opacity: 0,
                width: particle.size,
                height: particle.size,
              }}
              animate={{ 
                x: particle.x + (Math.random() * 20 - 10), // Minimal movement
                y: particle.y + (Math.random() * 20 - 10), // Minimal movement
                opacity: [0, 0.3, 0], // Reduced opacity
                scale: [0.9, 1.05, 0.9], // Minimal scale
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: particle.duration, 
                repeat: Infinity, 
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          ))}
        </AnimatePresence>
        
        {/* Main title with minimal 3D transform */}
        <motion.div
          className="flex flex-wrap justify-center"
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
          }}
        >
          {words.map((word, i) => {
            const isHighlighted = highlightedText && highlightedWords.includes(word);
            return (
              <React.Fragment key={i}>
                <motion.span
                  className={`inline-block ${isHighlighted ? 'relative' : ''} ${i > 0 ? 'ml-[0.25em]' : ''}`}
                  custom={i}
                  initial={{ opacity: 0, y: 10, rotateX: 10 }} // Reduced initial values
                  animate={controls}
                  whileHover={{ 
                    scale: isHighlighted ? 1.02 : 1.01, // Minimal scale
                    z: isHighlighted ? 10 : 5, // Reduced z-transform
                    transition: { type: 'spring', stiffness: 300, damping: 10 }
                  }}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isHighlighted ? 'translateZ(8px)' : 'none', // Reduced z-transform
                  }}
                >
                  {isHighlighted ? (
                    <>
                      {/* Minimal glow effect for highlighted text */}
                      <motion.span
                        className="absolute inset-0 blur-md z-0"
                        animate={{
                          opacity: hovered === i ? 0.3 : 0.2, // Reduced opacity
                          scale: hovered === i ? 1.05 : 1, // Minimal scale
                          z: hovered === i ? -5 : -3, // Reduced z-transform
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ 
                          color: glowColor,
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {word}
                      </motion.span>
                      
                      {/* Gradient text with minimal styling */}
                      <motion.span 
                        className="relative z-10 bg-gradient-to-r from-indigo-300 to-blue-400 bg-clip-text text-transparent font-bold"
                        animate={{
                          textShadow: hovered === i ? `0 0 5px ${glowColor}` : `0 0 2px ${glowColor}`, // Minimal glow
                          z: hovered === i ? 5 : 3, // Reduced z-transform
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {word}
                      </motion.span>
                      
                      {/* Minimal particles around highlighted text */}
                      {hovered === i && (
                        <>
                          {[...Array(2)].map((_, particleIndex) => { // Minimal particle count
                            const randomX = (Math.random() - 0.5) * 40; // Reduced range
                            const randomY = (Math.random() - 0.5) * 40; // Reduced range
                            const size = Math.random() * 2 + 0.5; // Smaller particles
                            
                            return (
                              <motion.span
                                key={particleIndex}
                                className="absolute rounded-full bg-gradient-to-r from-indigo-400/20 to-blue-400/20" // Reduced opacity
                                style={{
                                  width: size,
                                  height: size,
                                  x: randomX,
                                  y: randomY,
                                  opacity: 0,
                                  filter: 'blur(0.5px)',
                                }}
                                animate={{
                                  x: [randomX, randomX + (Math.random() - 0.5) * 20], // Minimal movement
                                  y: [randomY, randomY + (Math.random() - 0.5) * 20], // Minimal movement
                                  opacity: [0, 0.4, 0], // Reduced opacity
                                  scale: [0.9, 1.1, 0.9], // Minimal scale
                                }}
                                transition={{
                                  duration: Math.random() * 1 + 0.8, // Faster animation
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                  ease: "easeInOut"
                                }}
                              />
                            );
                          })}
                        </>
                      )}
                    </>
                  ) : (
                    <motion.span 
                      className="font-medium tracking-tight"
                      animate={{
                        textShadow: hovered === i ? "0 0 2px rgba(255,255,255,0.2)" : "none", // Minimal glow
                        z: hovered === i ? 2 : 0, // Minimal z-transform
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {word}
                    </motion.span>
                  )}
                </motion.span>
              </React.Fragment>
            );
          })}
        </motion.div>
        
        {/* Minimal gradient line underneath */}
        <motion.div 
          className="absolute -bottom-3 left-0 right-0 mx-auto w-1/2 h-[1px] opacity-20" // Reduced size and opacity
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.2 }} // Reduced opacity
          transition={{ delay: delay + 0.5, duration: 0.8 }}
          style={{
            rotateX,
            z: -3,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent"></div>
        </motion.div>
      </motion.div>
      
      {/* Minimal subtitle with gradient */}
      {subtitle && (
        <motion.p 
          className="text-center mt-6 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 5 }}
          animate={subtitleControls}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.span 
            className="bg-gradient-to-r from-indigo-200 to-blue-300 bg-clip-text text-transparent relative inline-block"
            whileHover={{
              scale: 1.01, // Minimal scale
              textShadow: "0 0 3px rgba(99, 102, 241, 0.3)", // Minimal glow
            }}
          >
            {subtitle}
            <motion.span 
              className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" // Reduced opacity
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.4 }} // Reduced opacity
              transition={{ delay: delay + 1, duration: 0.8 }}
            />
          </motion.span>
        </motion.p>
      )}
    </div>
  );
}