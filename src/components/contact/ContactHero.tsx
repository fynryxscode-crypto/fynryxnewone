"use client";

import { motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: `url('/images/contact/hero.png')`,
        }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-[#020617]/90 via-[#020617]/70 to-[#020617]" />
      
      {/* Floating Particles Decor */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 mb-8 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse" />
            <span className="uppercase font-extrabold tracking-[0.25em] text-[10px]">Let's Build the Future</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
            Let's Synchronize Your <br />
            <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Vision with Our Intelligence.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Ready to initiate your digital migration? Connect with our elite engineering team to discuss strategy, scalability, and technical innovation.
          </p>
        </motion.div>
      </div>

      {/* Decorative Wave at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-[#020617]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
