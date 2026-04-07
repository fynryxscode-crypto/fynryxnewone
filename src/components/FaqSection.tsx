'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, Sparkles, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'What is your typical project timeline?',
    a: 'Timelines vary by complexity, but core MVP development usually takes 4-8 weeks, while full-scale enterprise platforms may span 3-6 months. We prioritize agile cycles for faster iterative releases.'
  },
  {
    q: 'Do you provide post-launch technical support?',
    a: 'Yes, we offer comprehensive maintenance packages including 24/7 monitoring, security updates, and performance optimization to ensure your platform remains at peak efficiency.'
  },
  {
    q: 'Can you work with our existing development team?',
    a: 'Absolutely. We frequently act as an extension to internal engineering teams, providing specialized expertise in architecture, AI integration, or UI/UX refinement.'
  },
  {
    q: 'Do you offer custom API development & integration?',
    a: 'Custom API architecture is one of our core strengths. We build robust, scalable REST and GraphQL APIs that seamlessly bridge your systems with third-party providers.'
  },
  {
    q: 'How do you ensure project security?',
    a: 'We follow a "Security-First" approach, implementing end-to-end encryption, multi-factor authentication, and regular vulnerability audits as part of our standard development lifecycle.'
  }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-32 relative overflow-hidden bg-[#020617]" id="faqs">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2f55ff]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#2f55ff 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Left Column: Heading & CTA */}
          <div className="sticky top-32">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-[#2f55ff] border border-blue-500/20 mb-8 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              <span className="uppercase font-black tracking-[0.2em] text-[10px]">Knowledge Base</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              Got <span className="bg-linear-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent italic">questions</span>? <br />
              We have answers.
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-lg">
              Explore the most common inquiries regarding our engineering process, architectural standards, and project management workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                to="/contact"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white rounded-2xl font-black text-sm shadow-[0_10px_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1 active:scale-95"
              >
                <MessageCircle size={18} />
                Contact Support
              </Link>
              
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Search size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-[#2f55ff]">Avg Response</p>
                  <p className="text-sm font-bold text-white">Less than 2 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="flex flex-col gap-6">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <motion.div 
                  key={idx} 
                  initial={false}
                  animate={{ 
                    backgroundColor: isOpen ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                    borderColor: isOpen ? 'rgba(47,85,255,0.3)' : 'rgba(255,255,255,0.08)' 
                  }}
                  className={`rounded-[2rem] border backdrop-blur-3xl overflow-hidden transition-shadow duration-500 ${
                    isOpen ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-blue-500/20' : 'hover:border-white/20'
                  }`}
                >
                  <button 
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left px-8 py-8 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-xs font-black tracking-widest font-mono transition-colors duration-300 ${
                        isOpen ? 'text-[#2f55ff]' : 'text-slate-600'
                      }`}>
                        0{idx + 1}
                      </span>
                      <h4 className={`text-lg font-black tracking-tight leading-snug transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      }`}>
                        {faq.q}
                      </h4>
                    </div>
                    
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isOpen ? 'bg-[#2f55ff] text-white rotate-180 shadow-[0_0_20px_rgba(47,85,255,0.4)]' : 'bg-white/5 text-slate-500'
                    }`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-8 pb-10 ml-14">
                          <div className="h-px w-full bg-linear-to-r from-blue-500/20 to-transparent mb-8" />
                          <p className="text-slate-400 text-base leading-relaxed font-medium">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Bottom Floating Decor */}
            <div className="mt-12 p-8 rounded-[2.5rem] bg-linear-to-br from-blue-600/10 to-transparent border border-blue-500/20 backdrop-blur-xl flex items-center justify-between group cursor-pointer hover:border-blue-500/40 transition-all duration-500">
               <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-[1.25rem] bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                   <HelpCircle size={28} className="text-[#2f55ff]" />
                 </div>
                 <div>
                   <h5 className="text-white font-black tracking-tight">Still have a specific query?</h5>
                   <p className="text-slate-500 text-sm font-semibold">Our engineers are standing by to assist.</p>
                 </div>
               </div>
               <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#020617] transition-all duration-500">
                 <Plus size={20} className="group-hover:rotate-45 transition-transform duration-500" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
