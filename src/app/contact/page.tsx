"use client";

import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="bg-[#020617] min-h-screen text-white overflow-hidden">
      
      <ContactHero />

      <section className="relative py-24 lg:py-32 overflow-visible">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-30">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Contact Detail & Strategy Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                  Nexus Headquarters
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                  Bridge the Gap Between <br />
                  <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic underline decoration-blue-500/30 underline-offset-8">
                    Vision & Execution.
                  </span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-xl">
                  Our strategic architects are ready to analyze your technical infrastructure and design a roadmap for global scalability. 
                </p>
              </div>

              <ContactInfo />

              {/* Status Badge */}
              <div className="p-8 rounded-4xl bg-white/5 border border-white/10 flex items-center gap-6">
                 <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                       <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                 </div>
                 <div>
                    <h5 className="text-white font-black text-lg mb-1">Status: Operational</h5>
                    <p className="text-slate-500 text-sm font-medium italic">Available for enterprise-level inquiries.</p>
                 </div>
              </div>
            </motion.div>

            {/* Right Column: High-End Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section with full-width transition */}
      <section className="relative bg-white/2 py-24 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Global Deployment Hub</h3>
            <p className="text-slate-400 font-medium">Madhapur, Hyderabad — The heart of our technical innovation studio.</p>
         </div>
         <div className="max-w-[1440px] mx-auto px-6">
            <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
               <ContactMap />
            </div>
         </div>
      </section>
    </main>
  );
}
