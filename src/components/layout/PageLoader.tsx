'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  isVisible?: boolean;
}

/**
 * Premium Page Loader featuring the Fynryx logo.
 * Designed to feel fast, high-end, and integrated.
 */
export default function PageLoader({ isVisible = true }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-99999 bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient Background Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px]"
          />

          <div className="relative">
            {/* Logo Wrapper with Floating Effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-32 h-32 flex items-center justify-center"
            >
              {/* Outer Glowing Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20%] border border-blue-500/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10%] border border-cyan-500/5 rounded-full"
              />

              {/* Central Logo */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 w-24 h-24"
              >
                <img 
                  src="/f-logo.png" 
                  alt="Fynryx Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                />
              </motion.div>

              {/* Circular Progress Bar */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-500/10"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="377"
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-blue-500"
                />
              </svg>
            </motion.div>

            {/* Premium Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <h3 className="text-white font-black text-2xl tracking-[0.3em] uppercase mb-1">
                Fynryx
              </h3>
              <p className="text-blue-400/60 text-xs font-medium uppercase tracking-[0.5em] flex items-center justify-center gap-2">
                Accelerating 
                <span className="flex gap-1">
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1 h-1 rounded-full bg-blue-500" />
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 rounded-full bg-blue-500" />
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 rounded-full bg-blue-500" />
                </span>
              </p>
            </motion.div>
          </div>

          {/* Top Edge Progress Bar for perceived speed */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
