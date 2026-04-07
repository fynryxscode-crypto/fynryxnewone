'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center"
          style={{ background: '#03030a' }}
        >
          {/* Background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute"
              style={{
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(79,142,247,0.15) 0%, transparent 70%)',
                top: '-200px',
                left: '50%',
                transform: 'translateX(-50%)',
                filter: 'blur(40px)',
              }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative z-10 mb-12 text-center"
          >
            {/* Logo Mark */}
            <div className="mx-auto mb-4 w-16 h-16 relative">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4f8ef7" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <polygon points="32,4 60,20 60,44 32,60 4,44 4,20" stroke="url(#logoGrad)" strokeWidth="2" fill="none" />
                <polygon points="32,14 50,24 50,40 32,50 14,40 14,24" fill="url(#logoGrad)" opacity="0.2" />
                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="url(#logoGrad)" fontSize="20" fontWeight="700" fontFamily="Inter">F</text>
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-wider gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              FYNRYX
            </h1>
            <p className="text-xs tracking-[0.3em] text-gray-500 mt-1 uppercase">Loading Experience</p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 w-64"
          >
            <div
              className="h-px w-full rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #4f8ef7, #8b5cf6, #22d3ee)',
                  width: `${Math.min(progress, 100)}%`,
                  transition: 'width 0.15s ease',
                }}
              />
            </div>
            <p className="text-center mt-3 text-xs text-gray-600 font-mono">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
