"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';

export default function AboutHero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/60 to-black/80 lg:bg-linear-to-r lg:from-black/90 lg:via-black/70 lg:to-transparent" />
      
      {/* Animated Particles / Glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse delay-1000 pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30 mb-8 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse" />
            <span className="uppercase font-extrabold tracking-[0.2em] text-[10px]">Architecting Futures Since 2015</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6.5xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
            Driven by <span className="text-[#2f55ff]">Innovation</span>. <br />
            Powered by Technology.
          </h1>
          
          <p className="text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl font-medium">
            Fynryx Tech Private Limited is more than an IT company. We are a collective of visionaries, engineers, and educators dedicated to redefining the digital landscape through elite development and precision training.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link 
              to="/contact"
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-[#2f55ff] text-white rounded-2xl font-black text-[15px] transition-all hover:bg-blue-600 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(47,85,255,0.4)] active:scale-95"
            >
              Get in Touch
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:block"
      >
        <div className="w-[30px] h-[50px] border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
