'use client';

import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';

const INFO_CARDS = [
  {
    icon: <MapPin className="text-blue-500" />,
    title: 'HQ Location',
    label: 'Physical Presence',
    content: (
      <p className="text-slate-400 font-medium leading-relaxed">
        1st Floor, MSR-9 Building, Street No. 7,<br />
        Ayyappa Society, Madhapur, <br />
        Hyderabad — 500081
      </p>
    ),
    link: 'https://maps.google.com'
  },
  {
    icon: <Phone className="text-indigo-500" />,
    title: 'Global Response',
    label: 'Direct Lines',
    content: (
      <div className="space-y-2">
        <a href="tel:+917416646655" className="text-xl font-black text-white hover:text-blue-400 transition-colors flex items-center gap-2 group/link">
          +91 74166 46655 <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-all" />
        </a>
        <a href="tel:+917416659911" className="text-xl font-black text-white hover:text-blue-400 transition-colors flex items-center gap-2 group/link">
          +91 74166 59911 <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-all" />
        </a>
      </div>
    )
  },
  {
    icon: <Mail className="text-purple-500" />,
    title: 'Digital Support',
    label: 'Official Inbox',
    content: (
      <div className="space-y-2">
        <a href="mailto:support@fynryx.com" className="text-white font-bold hover:text-blue-400 transition-colors block">
          support@fynryx.com
        </a>
        <a href="mailto:info@fynryx.com" className="text-white font-bold hover:text-blue-400 transition-colors block">
          info@fynryx.com
        </a>
      </div>
    )
  }
];

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
        {INFO_CARDS.map((card, i) => (
          <motion.div 
            key={card.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
             <div className="absolute -inset-2 bg-linear-to-r from-blue-600/10 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
             
             <div className="relative bg-slate-900/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl group-hover:border-white/10 transition-colors">
                <div className="flex items-start gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600/10 transition-all duration-500">
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-slate-500 font-extrabold uppercase tracking-widest text-[10px] mb-2 block">{card.label}</span>
                    <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{card.title}</h4>
                    {card.content}
                  </div>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges Tier */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-10 rounded-[2.5rem] bg-linear-to-r from-blue-700 to-indigo-700 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 justify-between">
           <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                 <ShieldCheck size={28} className="text-white" />
              </div>
              <div>
                 <p className="text-white text-xl font-black mb-0.5">Under 2h Response</p>
                 <p className="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-80">Guaranteed Service Level</p>
              </div>
           </div>
           <Award size={40} className="text-white/20 hidden sm:block" />
        </div>
      </motion.div>
    </div>
  );
}
