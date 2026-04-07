'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function ContactMap() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-16">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-sm">
            <Navigation size={14} className="animate-pulse" />
            <span className="uppercase font-black tracking-[0.2em] text-[10px]">Global Reach</span>
         </div>
         <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tighter">
           Our <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent italic">Nerve Center</span>
         </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative group/map">
           {/* Decorative Outer Frame */}
           <div className="absolute -inset-4 bg-linear-to-r from-blue-600/10 to-indigo-600/10 rounded-[4rem] blur-2xl opacity-0 group-hover/map:opacity-100 transition-opacity duration-1000" />
           
           <div className="relative aspect-video md:aspect-[21/9] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl group/inner">
              {/* Grayscale Styled Map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2755291244346!2d78.38421869999999!3d17.4470355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f3325603%3A0xc03df2435f3089!2sMSR-9%20BUILDING!5e0!3m2!1sen!2sin!4v1711846000000!5m2!1sen!2sin" 
                className="w-full h-full grayscale-[0.8] contrast-[1.2] invert-[0.9] hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Address Card (Desktop Only) */}
              <div className="absolute top-10 left-10 p-8 rounded-3xl bg-slate-900/40 backdrop-blur-3xl border border-white/10 hidden md:block group-hover/inner:-translate-x-2 transition-transform duration-500">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                       <MapPin size={20} className="text-blue-400" />
                    </div>
                    <div>
                       <h5 className="text-white font-black text-sm uppercase">Visit Our Hub</h5>
                       <p className="text-slate-400 text-[10px] font-bold">Madhapur, Hyderabad</p>
                    </div>
                 </div>
                 <a 
                   href="https://maps.google.com" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:text-blue-400 transition-colors"
                 >
                   Get Directions <Navigation size={12} />
                 </a>
              </div>
           </div>
        </div>
      </div>
    </motion.section>
  );
}
