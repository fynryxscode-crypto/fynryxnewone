'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// Standard img tags for Vite
import { ChevronLeft, ChevronRight, Globe, ExternalLink, Sparkles } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Enterprise SaaS Dashboard',
    category: 'IT Solutions',
    description: 'A comprehensive analytics platform for enterprise resource management.',
    image: '/previews/it-dashboard.png',
    color: '#3b82f6',
  },
  {
    id: 2,
    title: 'Water Management System',
    category: 'Industrial IoT',
    description: 'Precision monitoring and automated controls for borewell networks.',
    image: '/previews/borewell.png',
    color: '#0ea5e9',
  },
  {
    id: 3,
    title: 'CareSync Telemedicine',
    category: 'Healthcare',
    description: 'Modern patient-doctor portal with integrated health diagnostics.',
    image: '/previews/healthcare.png',
    color: '#10b981',
  },
  {
    id: 4,
    title: 'LuxeCart E-commerce',
    category: 'Fashion Retail',
    description: 'Premium shopping experience with high-end designer aesthetics.',
    image: '/previews/ecommerce.png',
    color: '#f59e0b',
  },
  {
    id: 5,
    title: 'Global Fleet Logistics',
    category: 'Transportation',
    description: 'Real-time cargo tracking and global logistics management suite.',
    image: '/previews/logistics.png',
    color: '#8b5cf6',
  },
];

export default function FeaturedProductsCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const next = () => setIndex((prev) => (prev + 1) % PRODUCTS.length);
  const prev = () => setIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);

  // Auto-play
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Scroll to rotate logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-[#020617] overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] opacity-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-md"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span className="uppercase font-black tracking-[0.2em] text-[10px]">Showcase Portfolio</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Our Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Products</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg font-medium"
          >
            Discover our suite of enterprise-ready digital products, engineered for scale and high performance.
          </motion.p>
        </div>

        {/* 3D Carousel Stage */}
        <div 
          className="relative h-[600px] flex items-center justify-center pt-10"
          style={{ perspective: '2000px' }}
        >
          <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
            {PRODUCTS.map((product, i) => {
              let diff = i - index;
              if (diff > PRODUCTS.length / 2) diff -= PRODUCTS.length;
              if (diff < -PRODUCTS.length / 2) diff += PRODUCTS.length;

              const isCenter = diff === 0;
              const opacity = 1 - Math.abs(diff) * 0.4;
              const scale = 1 - Math.abs(diff) * 0.15;
              const rotateY = diff * -35;
              const translateZ = Math.abs(diff) * -350;
              const translateX = diff * 450;

              return (
                <motion.div
                  key={product.id}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    opacity: Math.max(0, opacity),
                    scale: scale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute w-[800px] h-[450px] cursor-pointer"
                  style={{
                    zIndex: 10 - Math.abs(diff),
                    filter: !isCenter ? 'blur(4px) brightness(0.5)' : 'none',
                  }}
                  onClick={() => setIndex(i)}
                >
                  {/* Browser Frame */}
                  <div className="relative w-full h-full bg-[#1e293b] rounded-2xl border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden group/browser">
                    {/* Browser Toolbar */}
                    <div className="h-10 bg-slate-800/80 backdrop-blur-md flex items-center px-4 gap-4 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <div className="flex-1 max-w-md h-6 bg-slate-900/50 rounded-lg flex items-center px-3 gap-2">
                         <Globe size={10} className="text-slate-500" />
                         <span className="text-[9px] text-slate-500 font-medium truncate tracking-wider">https://fynryx.com/products/{product.title.toLowerCase().replace(/ /g, '-') }</span>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-4 h-1 bg-slate-700 rounded-full" />
                         <div className="w-4 h-1 bg-slate-700 rounded-full" />
                      </div>
                    </div>

                    {/* Website Content - Auto Scroll Simulation */}
                    <div className="relative w-full h-[calc(450px-40px)] bg-slate-950 overflow-hidden">
                       <motion.div
                         animate={{
                           y: ["0%", "-50%", "0%"]
                         }}
                         transition={{
                           duration: 20,
                           repeat: Infinity,
                           ease: "linear"
                         }}
                         className="relative w-full"
                       >
                          <img 
                            src={product.image} 
                            alt={product.title}
                            width={800}
                            height={900}
                            className="w-full object-cover"
                          />
                          {/* Duplicate for seamless look or extra length */}
                          <img 
                            src={product.image} 
                            alt={product.title}
                            width={800}
                            height={900}
                            className="w-full object-cover pt-1"
                          />
                       </motion.div>
                       
                       {/* Glass Overlay on Non-Focused */}
                       {!isCenter && <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]" />}
                       
                       {/* Active Glow under card */}
                       {isCenter && (
                         <div 
                           className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-40 opacity-40 blur-[100px] pointer-events-none"
                           style={{ background: product.color }}
                         />
                       )}
                    </div>

                    {/* Info Overlay on Hover or Active */}
                    <div className={`absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black via-black/40 to-transparent transition-all duration-500 ${isCenter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{product.category}</p>
                                <h3 className="text-2xl font-black text-white mb-2">{product.title}</h3>
                                <p className="text-slate-300 text-sm font-medium max-w-md">{product.description}</p>
                            </div>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-black font-black text-xs hover:scale-105 transition-transform active:scale-95">
                                View Product <ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                  </div>

                  {/* Reflection Effect */}
                  <div 
                    className="absolute -bottom-[60%] left-0 right-0 h-full opacity-20 pointer-events-none"
                    style={{
                      maskImage: 'linear-gradient(to top, transparent, black 80%)',
                      WebkitMaskImage: 'linear-gradient(to top, transparent, black 80%)',
                      transform: 'scaleY(-1) perspective(1000px) rotateX(20deg)',
                      filter: 'blur(10px)',
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt="Reflection"
                      width={800}
                      height={450}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 lg:flex justify-between px-10 pointer-events-none hidden">
             <button 
               onClick={prev}
               className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center pointer-events-auto hover:bg-blue-600 hover:border-blue-500 transition-all shadow-2xl backdrop-blur-xl group"
             >
               <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
             </button>
             <button 
               onClick={next}
               className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center pointer-events-auto hover:bg-blue-600 hover:border-blue-500 transition-all shadow-2xl backdrop-blur-xl group"
             >
               <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-4 mt-20">
           {PRODUCTS.map((p, i) => (
             <Link 
               key={i}
               to={`/projects/${p.title.toLowerCase().replace(/ /g, '-')}`}
               className="relative group/dot"
               onMouseEnter={() => setIndex(i)}
             >
                <div 
                  className={`h-2 transition-all duration-500 rounded-full ${index === i ? 'w-12 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-20">
                   Go to {p.title}
                </span>
             </Link>
           ))}
        </div>
      </div>

      <style jsx global>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}
