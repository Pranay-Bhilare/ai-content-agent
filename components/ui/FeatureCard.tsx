'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HolographicCard } from './HolographicCard';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  glowColor?: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  glowColor = '#3B82F6',
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <HolographicCard 
        className="p-6 h-full" 
        glowColor={glowColor}
        hoverScale={1.03}
      >
        <div className="flex flex-col h-full">
          {/* Icon with animated glow */}
          <motion.div 
            className="mb-4 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            <motion.div 
              className="absolute inset-0 blur-lg opacity-50"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{ color: glowColor }}
            >
              {icon}
            </motion.div>
            <div className="relative text-blue-500 text-3xl">{icon}</div>
          </motion.div>
          
          {/* Title with animated underline */}
          <motion.h3 
            className="text-lg font-semibold mb-2 text-gray-800 relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
          >
            {title}
            <motion.span 
              className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: delay + 0.5 }}
            />
          </motion.h3>
          
          {/* Description with character-by-character animation */}
          <motion.p 
            className="text-gray-600 text-sm flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
          >
            {description.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.2, 
                  delay: delay + 0.5 + index * 0.01,
                  ease: 'easeOut'
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </div>
      </HolographicCard>
    </motion.div>
  );
}