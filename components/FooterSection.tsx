'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AgentPulse } from './AgentPulse';

export function FooterSection() {
  return (
    <motion.footer 
      className="py-12 relative overflow-hidden bg-gradient-to-b from-white to-blue-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and tagline */}
          <motion.div 
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href={'/'} className="flex items-center gap-1.5 mb-2">
              <AgentPulse size="small" /> 
              <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                AgentTube
              </h2>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs text-center md:text-left">
              Supercharge your YouTube content with AI-powered analysis and optimization.
            </p>
          </motion.div>
          
          {/* Links */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Features */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Features</h3>
              <ul className="space-y-2 text-sm">
                <motion.li 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                    Video Analysis
                  </Link>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                    Transcript Generation
                  </Link>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                    Content Optimization
                  </Link>
                </motion.li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <motion.li 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                    Documentation
                  </Link>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                    API Reference
                  </Link>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                    Tutorials
                  </Link>
                </motion.li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <motion.li 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                    About Us
                  </Link>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                    Contact
                  </Link>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                    Privacy Policy
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>© {new Date().getFullYear()} AgentTube. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}