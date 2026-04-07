'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Monitor, Smartphone, Sparkles } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  type: 'web' | 'mobile';
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Fintech Mobile Bank',
    category: 'Banking App',
    image: 'https://images.unsplash.com/photo-1616077168079-7e09ad6bb32e?auto=format&fit=crop&q=80&w=800',
    type: 'mobile'
  },
  {
    id: 2,
    title: 'Health Tracking SaaS',
    category: 'Wellness Platform',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    type: 'mobile'
  },
  {
    id: 3,
    title: 'Enterprise Dashboard',
    category: 'SaaS Platform',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    type: 'web'
  },
  {
    id: 4,
    title: 'Eco E-Commerce',
    category: 'Sustainable Retail',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    type: 'web'
  },
  {
    id: 5,
    title: 'Smart Logistics',
    category: 'Fleet Management',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    type: 'mobile'
  },
  {
    id: 6,
    title: 'AI Analytics Port',
    category: 'Intelligent Data',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    type: 'web'
  }
];

export default function ProjectCarousel3D() {
  const [activeType, setActiveType] = useState<'web' | 'mobile'>('mobile');
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const filteredProjects = PROJECTS.filter(p => p.type === activeType);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  }, [filteredProjects.length]);

  useEffect(() => {
    setIndex(0);
  }, [activeType]);

  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(next, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, next]);

  return (
    <section className="relative w-full py-32 bg-[#020617] overflow-hidden group/carousel select-none pb-48">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[160px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Area */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span className="uppercase font-black tracking-[0.2em] text-[10px]">Product Portfolio</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-12 tracking-tighter"
          >
            Explore Our <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent italic">Expertise</span>
          </motion.h2>

          {/* Premium Toggle */}
          <div className="inline-flex p-1.5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl relative z-20">
             <button 
               onClick={() => setActiveType('web')}
               className={`relative flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-500 z-10 ${
                 activeType === 'web' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
               }`}
             >
                <Monitor size={18} /> Web Apps
                {activeType === 'web' && (
                  <motion.div layoutId="toggleBg" className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                )}
             </button>
             <button 
               onClick={() => setActiveType('mobile')}
               className={`relative flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-500 z-10 ${
                 activeType === 'mobile' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
               }`}
             >
                <Smartphone size={18} /> Mobile Apps
                {activeType === 'mobile' && (
                  <motion.div layoutId="toggleBg" className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                )}
             </button>
          </div>
        </div>

        {/* 3D Showcase */}
        <div 
          className="relative h-[600px] flex items-center justify-center -mx-6 md:mx-0 mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeType + index}
              initial={{ opacity: 0, rotateY: 30, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -30, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 1 }}
              className="relative w-full h-full flex items-center justify-center will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {filteredProjects.map((project, i) => {
                let diff = i - index;
                if (diff > filteredProjects.length / 2) diff -= filteredProjects.length;
                if (diff < -filteredProjects.length / 2) diff += filteredProjects.length;

                const isCenter = diff === 0;
                const opacity = 1 - Math.abs(diff) * 0.4;
                const scale = 1 - Math.abs(diff) * 0.15;
                const rotateY = diff * -35;
                const translateZ = Math.abs(diff) * -250;
                const translateX = diff * (activeType === 'web' ? 450 : 320);

                return (
                  <motion.div
                    key={project.id}
                    animate={{
                      x: translateX,
                      z: translateZ,
                      rotateY: rotateY,
                      scale: isCenter && isHovered ? scale * 1.05 : scale,
                      opacity: Math.max(0, opacity),
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for premium feel
                    }}
                    className={`absolute preserve-3d group/item ${
                      activeType === 'web' ? 'w-[450px] md:w-[600px] h-[340px] md:h-[420px]' : 'w-[240px] md:w-[280px] h-[500px] md:h-[580px]'
                    }`}
                    style={{
                      zIndex: 10 - Math.abs(diff),
                      filter: !isCenter ? 'blur(3px) grayscale(0.4)' : 'none',
                      pointerEvents: isCenter ? 'auto' : 'none',
                    }}
                  >
                    {/* Device Frame */}
                    <div className={`relative w-full h-full p-2 bg-slate-900 border-[6px] border-slate-800 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-700 ${
                      activeType === 'web' ? 'rounded-3xl' : 'rounded-[3.2rem]'
                    } ${isCenter ? 'border-blue-500/30' : 'border-slate-800'}`}>
                      
                      {/* Notch / Camera */}
                      {activeType === 'mobile' && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-slate-950" />
                           <div className="w-8 h-1 bg-slate-950 rounded-full" />
                        </div>
                      )}

                      {activeType === 'web' && (
                        <div className="absolute top-0 left-0 right-0 h-6 bg-slate-800 flex items-center px-4 gap-1.5 z-20">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                        </div>
                      )}

                      {/* Content Container */}
                      <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${
                        activeType === 'web' ? 'rounded-2xl pt-6' : 'rounded-[2.4rem]'
                      }`}>
                         <img 
                           src={project.image} 
                           alt={project.title}
                           className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover/item:scale-110"
                         />
                         {/* Overlay */}
                         <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                         
                         {/* Labels */}
                         <div className="absolute bottom-12 left-0 right-0 px-8 text-center">
                            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-400 mb-2">{project.category}</p>
                            <h4 className="text-xl font-bold tracking-tight text-white">{project.title}</h4>
                         </div>
                      </div>

                      {/* Glass Glare */}
                      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Mirror Reflection */}
                    <div 
                      className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[90%] h-40 opacity-30 pointer-events-none blur-xl"
                      style={{
                        background: `linear-gradient(to bottom, ${isCenter ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.1)'}, transparent)`,
                        maskImage: 'linear-gradient(to top, rgba(0,0,0,1), transparent)',
                        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1), transparent)',
                        transform: 'scaleY(-1) perspective(1000px) rotateX(45deg)',
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />

                    {isCenter && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-600 px-6 py-2 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                      >
                        <span className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                           Live Preview
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4 md:px-20 lg:px-40">
             <button 
               onClick={prev}
               className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center pointer-events-auto hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 backdrop-blur-xl group-hover/carousel:translate-x-[-10px]"
             >
               <ChevronLeft size={24} />
             </button>
             <button 
               onClick={next}
               className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center pointer-events-auto hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 backdrop-blur-xl group-hover/carousel:translate-x-[10px]"
             >
               <ChevronRight size={24} />
             </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-24">
           {filteredProjects.map((p, i) => (
             <Link 
               key={i}
               to={`/projects`}
               className="relative group/dot"
               onMouseEnter={() => setIndex(i)}
             >
                <div 
                  className={`h-1 rounded-full transition-all duration-500 ${index === i ? 'w-12 bg-blue-500' : 'w-3 bg-slate-800 h-1'}`}
                />
                <motion.span 
                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full opacity-0 group-hover/dot:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl z-20 translate-y-2 group-hover/dot:translate-y-0"
                >
                   Details: {p.title}
                </motion.span>
             </Link>
           ))}
        </div>
      </div>

      <style jsx global>{`
        .transform-style-3d { transform-style: preserve-3d; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </section>
  );
}
