'use client';

import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Activity, Zap, ShieldCheck, PieChart } from 'lucide-react';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

interface Props {
  title: string;
  categoryTitle: string;
  description: string;
  backgroundImage: string;
  category: string;
}

function getCategoryTheme(category: string) {
  switch (category) {
    case 'technologies': return { color: 'from-[#050b36] to-cyan-900', accent: '#22d3ee', stat: '99.9% Uptime', Icon: Zap };
    case 'industries': return { color: 'from-[#050b36] to-indigo-900', accent: '#818cf8', stat: '300% ROI', Icon: Activity };
    case 'ai-solutions': return { color: 'from-[#050b36] to-purple-900', accent: '#c084fc', stat: '10x Efficiency', Icon: PieChart };
    default: return { color: 'from-[#050b36] to-blue-900', accent: '#60a5fa', stat: '24/7 Support', Icon: ShieldCheck };
  }
}

export default function DynamicPageContent({ title, categoryTitle, description, backgroundImage, category }: Props) {
  const theme = getCategoryTheme(category);
  const { Icon } = theme;

  return (
    <main className="min-h-screen flex flex-col pt-[80px] bg-slate-50 overflow-hidden">
      {/* Hero */}
      <section className="py-20 px-6 text-center text-white relative overflow-hidden bg-slate-900">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 font-semibold text-xs mb-8 uppercase tracking-widest backdrop-blur-md">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} className="opacity-50" aria-hidden="true" />
              <span>{categoryTitle}</span>
              <ChevronRight size={14} className="opacity-50" aria-hidden="true" />
              <span style={{ color: theme.accent }}>{title}</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">
                {title}
              </span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-blue-100/90 leading-relaxed max-w-3xl mx-auto font-medium">
              {description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full relative z-20 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="lg:col-span-8 bg-white p-12 rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Icon size={28} className="text-[#2f55ff]" aria-hidden="true" />
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Leading {title} Strategies
              </h2>
            </motion.div>

            <motion.p variants={fadeIn} className="text-gray-600 text-lg mb-8 leading-relaxed">
              At Fynryx, we specialize in delivering cutting-edge <strong className="text-gray-900">{title}</strong> frameworks to top-tier organizations worldwide. Whether you are looking to scale your existing infrastructure or build complex digital products from the ground up, our globally recognized experts are fully equipped to bring your boldest vision to life.
            </motion.p>

            <motion.div variants={fadeIn} className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 border-l-4 border-l-[#2f55ff]">
                <div className="text-3xl font-black text-slate-900 mb-2">{theme.stat}</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Proven Results</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 border-l-4 border-l-[#2f55ff]">
                <div className="text-3xl font-black text-slate-900 mb-2">500+</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Projects Delivered</div>
              </div>
            </motion.div>

            <motion.p variants={fadeIn} className="text-gray-600 text-lg mb-10 leading-relaxed">
              We leverage the power of advanced {categoryTitle} methodologies to ensure high performance, security, and seamless user experiences across all devices and platforms.
            </motion.p>

            <motion.h3 variants={fadeIn} className="text-2xl font-bold text-slate-900 mb-6">Why Partner With Us?</motion.h3>
            <motion.ul variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {[
                'Industry-leading technological expertise',
                'Dedicated support and agile frameworks',
                'Highly scalable & secure infrastructure',
                'Cost-effective custom tailored solutions',
                'Seamless cross-platform integrations',
                'Continuous long-term maintenance',
              ].map((item, i) => (
                <motion.li variants={fadeIn} key={i} className="flex items-start gap-3 text-gray-800 font-medium">
                  <CheckCircle2 size={20} className="text-[#2f55ff] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-snug">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Sidebar Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-4 w-full sticky top-32"
          >
            <div className="bg-white rounded-[2rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2f55ff] to-cyan-400" />
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Technical Consultation</h3>
              <p className="text-gray-500 text-sm mb-8 font-medium">Get precise pricing and strategic insights within 24 hours.</p>
              <form className="flex flex-col gap-5">
                <input type="text" placeholder="Full Name" className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2f55ff] focus:ring-2 focus:ring-[#2f55ff]/20 transition-all bg-gray-50/50 text-[15px]" />
                <input type="email" placeholder="Work Email" className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2f55ff] focus:ring-2 focus:ring-[#2f55ff]/20 transition-all bg-gray-50/50 text-[15px]" />
                <textarea placeholder={`Describe your ${title} scope...`} rows={4} className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2f55ff] focus:ring-2 focus:ring-[#2f55ff]/20 transition-all bg-gray-50/50 resize-none text-[15px]" />
                <button type="button" className="group w-full bg-gradient-to-r from-[#2f55ff] to-blue-700 text-white py-4 rounded-xl font-bold hover:shadow-[0_10px_30px_-10px_rgba(47,85,255,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-2">
                  Submit Request
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
