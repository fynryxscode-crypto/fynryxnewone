"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Sparkles } from "lucide-react";
import QuickQuoteForm from "@/components/QuickQuoteForm";

const CONTACT_INFO = [
  { icon: <MapPin size={20} />, label: "Global HQ", value: "Mumbai, Maharashtra, India", color: "text-blue-500" },
  { icon: <Phone size={20} />, label: "Direct Line", value: "+91 91705 38555", color: "text-emerald-500" },
  { icon: <Mail size={20} />, label: "Strategy Email", value: "hello@fynryx.com", color: "text-rose-500" },
  { icon: <Clock size={20} />, label: "Operating Hours", value: "Mon - Sat: 9 AM - 7 PM", color: "text-indigo-500" },
];

export default function AboutContact() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-[#2f55ff] border border-blue-500/20 mb-6 backdrop-blur-sm">
                <Sparkles size={14} className="animate-pulse" />
                <span className="uppercase font-black tracking-[0.2em] text-[10px]">Transmission Channel</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
                Start Your <br />
                <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">
                  Digital Migration.
                </span>
              </h2>
              <p className="text-slate-500 text-lg font-medium max-w-md">
                Our engineering architects are ready to convert your complex ideas into world-class digital logic. Connect today.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {CONTACT_INFO.map((info, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className={`shrink-0 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 ${info.color}`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{info.label}</p>
                    <p className="text-slate-900 font-bold text-sm">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <QuickQuoteForm 
              accentFrom="from-blue-600" 
              accentTo="to-indigo-600" 
              serviceName="Global Partnership" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
