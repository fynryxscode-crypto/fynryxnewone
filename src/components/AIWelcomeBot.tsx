"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Volume2 } from "lucide-react";

/**
 * AIWelcomeBot component
 * 
 * Features:
 * - Appears once per session at bottom-right.
 * - Glassmorphism UI with typing animation.
 * - Text-to-Speech (SpeechSynthesis API).
 * - Auto-hide after message completion.
 * - Sound wave animation during speech.
 */
const AIWelcomeBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fullMessage = "Welcome to Fynryx Tech Private Limited 👋";
  const voiceMessage = "Welcome to Fynryx";
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    // 1. Check if already shown in this session
    const shown = sessionStorage.getItem("fynryx_welcome_shown_session");
    if (shown) return;

    // 2. Delayed entrance (lazy initialize)
    const initTimeout = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("fynryx_welcome_shown_session", "true");
    }, 1500);

    return () => clearTimeout(initTimeout);
  }, []);

  // 3. Handle Speech and Typing when visible
  useEffect(() => {
    if (!isVisible || hasSpokenRef.current) return;

    // A. Start typing animation
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(fullMessage.slice(0, i + 1));
      i++;
      if (i >= fullMessage.length) {
        clearInterval(typingInterval);
        
        // B. Automatically start fading out after reading/displaying
        setTimeout(() => {
          setIsVisible(false);
        }, 6000);
      }
    }, 40);

    // C. Start AI Voice (Text-to-Speech)
    const speak = () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        // Cancel existing speech if any
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(voiceMessage);
        
        // Settings for a "Natural" AI feel
        utterance.rate = 0.95; // Slightly slower for clarity
        utterance.pitch = 1.1; // Slightly higher for warmth
        utterance.volume = 0.8;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        
        // Note: Some browsers block auto-audio until first interaction.
        // We'll try to play, but silence is an acceptable fallback per requirement.
        window.speechSynthesis.speak(utterance);
      }
    };

    // Give typing a tiny headstart
    const speechTimeout = setTimeout(speak, 500);
    hasSpokenRef.current = true;

    return () => {
      clearInterval(typingInterval);
      clearTimeout(speechTimeout);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.5 } }}
          className="fixed bottom-48 right-5 md:right-8 z-10000 flex items-end gap-3 pointer-events-none md:pointer-events-auto"
        >
          {/* Message Bubble */}
          <div className="relative group overflow-hidden">
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_-10px_rgba(30,64,175,0.2)] px-5 py-4 rounded-3xl rounded-br-none max-w-[240px] md:max-w-[280px]">
              {/* Typing Animation Area */}
              <div className="text-slate-800 text-[14px] font-medium leading-relaxed">
                {displayText}
                {displayText.length < fullMessage.length && (
                  <span className="inline-block w-1 h-4 bg-blue-500 animate-pulse ml-0.5" />
                )}
              </div>

              {/* Speech Indicator / Waves */}
              {isSpeaking && (
                <div className="mt-2 flex items-center gap-1.5 opacity-80">
                  <div className="flex gap-[2px] h-3 items-center">
                    {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: isSpeaking ? [2, 10, 2] : 2 }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                        className="w-[2px] bg-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">AI Speaking...</span>
                </div>
              )}
            </div>
          </div>

          {/* Avatar Container */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div className="w-14 h-14 bg-linear-to-tr from-blue-700 to-indigo-500 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center border-2 border-white relative overflow-hidden group cursor-pointer pointer-events-auto">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
              <Bot size={28} className="text-white relative z-10 drop-shadow-md" />
              
              {/* Pulse effect if speaking */}
              {isSpeaking && (
                <div className="absolute inset-0 border-4 border-blue-400/50 rounded-2xl animate-ping" />
              )}
            </div>
            
            {/* User interaction hint */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIWelcomeBot;
