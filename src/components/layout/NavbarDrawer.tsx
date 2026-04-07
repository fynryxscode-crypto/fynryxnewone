'use client';

import React from 'react';
import { X, ArrowRight, Loader2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  form: any;
  setForm: (form: any) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  SERVICES_OPTIONS: { value: string; label: string }[];
  navItems: { label: string; href: string }[];
}

export default function NavbarDrawer({ 
  isOpen, 
  onClose, 
  form, 
  setForm, 
  handleFormSubmit, 
  isSubmitting, 
  SERVICES_OPTIONS,
  navItems
}: NavbarDrawerProps) {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-100 transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[550px] bg-black z-110 shadow-[0_0_100px_rgba(0,0,0,0.9)] transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="flex flex-col h-full bg-black relative">
          {/* Header with Close Button */}
          <div className="px-10 py-8 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isOpen ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <img 
                src="/logo.png" 
                alt="Fynryx Logo" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </motion.div>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/10 hover:scale-110 active:scale-95 transition-all group"
              aria-label="Close Menu"
            >
               <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
          
          {/* Main Content */}
          <div className="px-10 flex-1 overflow-y-auto relative z-10 custom-scrollbar pb-12">
             
             {/* Navigation Links (Mobile First) */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={isOpen ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: 0.3 }}
               className="mb-12"
             >
                <p className="text-[#2f55ff] text-[10px] font-black uppercase tracking-[0.4em] mb-8">Navigation</p>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isOpen ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + (idx * 0.05) }}
                      className="text-3xl font-black text-white hover:text-[#2f55ff] transition-colors uppercase italic flex items-center gap-4 group"
                    >
                      {item.label}
                      <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    </motion.a>
                  ))}
                </nav>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={isOpen ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: 0.6 }}
               className="mb-8 pt-10 border-t border-white/10"
             >
               <h3 className="text-4xl font-black tracking-tight text-white mb-4 uppercase italic">
                 Start a Project
               </h3>
               <div className="h-1 w-20 bg-[#2f55ff]" />
             </motion.div>
             
             <form className="flex flex-col gap-10" onSubmit={handleFormSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isOpen ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                   <label className="text-[10px] font-black text-[#2f55ff] uppercase tracking-[0.3em] mb-2 block">Full Name</label>
                   <input 
                      type="text" 
                      placeholder="Type your name here..." 
                      className="w-full py-4 border-b-2 border-white/10 focus:border-[#2f55ff] transition-all bg-transparent text-[18px] text-white placeholder-white/20 font-medium outline-none" 
                      required 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                   />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isOpen ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                   <label className="text-[10px] font-black text-[#2f55ff] uppercase tracking-[0.3em] mb-2 block">Email Address</label>
                   <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="w-full py-4 border-b-2 border-white/10 focus:border-[#2f55ff] transition-all bg-transparent text-[18px] text-white placeholder-white/20 font-medium outline-none" 
                      required 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                   />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isOpen ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                >
                   <label className="text-[10px] font-black text-[#2f55ff] uppercase tracking-[0.3em] mb-2 block">Phone Number</label>
                   <input 
                      type="tel" 
                      placeholder="+1 (000) 000-0000" 
                      className="w-full py-4 border-b-2 border-white/10 focus:border-[#2f55ff] transition-all bg-transparent text-[18px] text-white placeholder-white/20 font-medium outline-none" 
                      value={form.phone}
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                   />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isOpen ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.0 }}
                  className="relative"
                >
                    <label className="text-[10px] font-black text-[#2f55ff] uppercase tracking-[0.3em] mb-2 block">Interest In</label>
                    <select 
                      className="w-full py-4 border-b-2 border-white/10 focus:border-[#2f55ff] transition-all bg-transparent text-[18px] text-white appearance-none cursor-pointer [&>option]:bg-black font-medium outline-none" 
                      required
                      value={form.service}
                      onChange={(e) => setForm({...form, service: e.target.value})}
                    >
                       <option value="" disabled className="text-white/20">Select a service...</option>
                       {SERVICES_OPTIONS.map(opt => (
                         <option key={opt.value} value={opt.label}>{opt.label}</option>
                       ))}
                    </select>
                    <ChevronDown size={20} className="absolute right-0 bottom-4 text-white/40 pointer-events-none" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isOpen ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group w-full mt-8 py-5 border-2 border-white text-white font-black uppercase tracking-[0.3em] text-[13px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 relative overflow-hidden active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={18} className="animate-spin" /> Processing...</>
                    ) : (
                      <>
                        Submit Inquiry
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </motion.div>
             </form>

             <motion.div 
               className="mt-20 pt-10 border-t border-white/5"
               initial={{ opacity: 0 }}
               animate={isOpen ? { opacity: 1 } : {}}
               transition={{ delay: 1 }}
             >
                <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em] mb-4 text-center">
                  Innovating since 2018
                </p>
                <div className="flex justify-center gap-8">
                  {['Instagram', 'LinkedIn', 'Facebook'].map(s => (
                    <button key={s} className="text-[10px] text-white/40 hover:text-white font-black uppercase tracking-widest transition-colors">{s}</button>
                  ))}
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
