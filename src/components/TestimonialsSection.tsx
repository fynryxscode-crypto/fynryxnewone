'use client';

import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, Award, Calendar, Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TESTIMONIALS = [
  {
    name: 'Arman Khan',
    role: 'CTO, TechFlow Systems',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    quote: "Fynryx's engineering team is unparalleled. They didn't just build our platform; they architected a scalable ecosystem that handled a 400% traffic surge within weeks of launch.",
    rating: 5,
    featured: true
  },
  {
    name: 'Elena Rodriguez',
    role: 'Product Head, GlobalLink',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    quote: "The UI/UX precision combined with their deep learning integrations helped us reduce user churn by 35%. A truly visionary partner for any enterprise.",
    rating: 5
  },
  {
    name: 'David Chen',
    role: 'Founder, CloudScale AI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote: "Exceptional architecture documentation and clean code standards. It's rare to find a team that balances speed and quality as effectively as Fynryx.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#020617]" id="testimonials">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#2f55ff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-[#2f55ff] border border-blue-500/20 mb-6 backdrop-blur-sm">
              <Award size={14} className="animate-pulse" />
              <span className="uppercase font-black tracking-[0.2em] text-[10px]">Client Success</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Voices of <br />
              <span className="bg-linear-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent italic">Innovation</span>
            </h2>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 pb-2">
            <div className="text-right">
              <p className="text-slate-400 text-sm font-semibold mb-1">Trusted by world-class teams</p>
              <div className="flex items-center gap-2 justify-end">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-white font-black text-lg">5.0</span>
              </div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-white/10 overflow-hidden relative">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="client" className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative p-8 lg:p-10 rounded-[2.5rem] bg-white/5 border border-white/5 backdrop-blur-3xl transition-all duration-500 overflow-hidden ${
                t.featured ? 'md:col-span-2 lg:col-span-1 shadow-[0_20px_60px_-15px_rgba(47,85,255,0.15)] ring-1 ring-blue-500/20' : ''
              }`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote size={80} className="text-white rotate-180" />
              </div>

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-8 animate-in fade-in slide-in-from-left-4 duration-1000">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#2f55ff]" fill="currentColor" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white text-lg lg:text-xl font-medium leading-relaxed mb-10 italic">
                  "{t.quote}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#2f55ff]/50 transition-colors duration-500 relative">
                      <img src={t.avatar} alt={t.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-[#020617]">
                      <CheckCircle2 size={12} className="text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-black tracking-tight">{t.name}</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>

                {/* Featured Badge */}
                {t.featured && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                    Project Highlight
                  </div>
                )}
              </div>

              {/* Hover Accent Glow */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-2xl flex flex-col lg:flex-row items-center justify-between gap-12 group"
        >
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              Ready to create your <br />
              own <span className="text-[#2f55ff]">success story</span>?
            </h3>
            <p className="text-slate-400 text-lg font-medium">
              Join the elite group of visionary companies that have transformed their digital presence with Fynryx.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 shrink-0">
            <Link 
              to="/contact"
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#020617] rounded-3xl font-black text-[15px] transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(255,255,255,0.3)] active:scale-95"
            >
              <Calendar size={18} />
              Book a Consultation
            </Link>
            
            <Link 
              to="/portfolio"
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-blue-600/10 border border-blue-600/20 text-white rounded-3xl font-black text-[15px] transition-all hover:bg-blue-600/20 hover:-translate-y-2 active:scale-95"
            >
              <Sparkles size={18} className="text-[#2f55ff]" />
              View Case Studies
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Bottom Stat Decoration */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 lg:gap-24 opacity-40">
           <div className="text-center">
             <p className="text-white text-3xl font-black mb-1 leading-none tracking-tighter">98%</p>
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Client Retention</p>
           </div>
           <div className="text-center">
             <p className="text-white text-3xl font-black mb-1 leading-none tracking-tighter">150+</p>
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Projects Shipped</p>
           </div>
           <div className="text-center">
             <p className="text-white text-3xl font-black mb-1 leading-none tracking-tighter">12</p>
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Industry Awards</p>
           </div>
        </div>

      </div>
    </section>
  );
}
