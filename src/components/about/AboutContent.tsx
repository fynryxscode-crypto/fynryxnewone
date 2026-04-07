"use client";

import { motion, Variants } from "framer-motion";
import { 
  CheckCircle2, 
  Rocket, 
  Target, 
  Database, 
  GraduationCap 
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const FEATURES = [
  {
    icon: <Database className="text-blue-500" />,
    title: "IT Development",
    desc: "From enterprise-grade SaaS to sentient AI interfaces, we engineer scalable digital legacies.",
  },
  {
    icon: <GraduationCap className="text-indigo-500" />,
    title: "IT Training",
    desc: "Cultivating the next generation of global engineers through precision-led technical curricula.",
  },
];

const MISSION_VISION = [
  {
    icon: <Target className="text-rose-500" />,
    title: "Our Mission",
    desc: "Empower human potential via intelligent software systems that feel invisible yet powerful.",
  },
  {
    icon: <Rocket className="text-emerald-500" />,
    title: "Our Vision",
    desc: "Establishing the global standard for technical innovation and engineering education by 2030.",
  },
];

export default function AboutContent() {
  return (
    <section className="py-24 lg:py-32 bg-white/2 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-10"
          >
            <div>
              <span className="inline-block bg-blue-50/5 border border-blue-500/10 text-blue-400 text-xs font-black px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase backdrop-blur-sm">
                About Fynryx Tech
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8 tracking-tighter">
                Bridging the Gap Between <br />
                <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
                  Complex Engineering & Elegant UX.
                </span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Established in 2015, Fynryx Tech Private Limited has evolved from an elite Mumbai studio into a global force for digital migration. Our dual expertise in industrial development and high-end technical training defines our unique market position.
              </p>
            </div>

            {/* Core Sectors */}
            <div className="grid sm:grid-cols-2 gap-8">
              {FEATURES.map((f, i) => (
                <div key={i} className="group p-8 rounded-4xl bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all">
                  <div className="w-12 h-12 rounded-[1.25rem] bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {f.icon}
                  </div>
                  <h4 className="text-white text-xl font-black mb-3 tracking-tight">{f.title}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              {MISSION_VISION.map((mv, i) => (
                <div key={i} className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                    {mv.icon}
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-lg mb-2 tracking-tight">{mv.title}</h5>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{mv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image / Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-[4rem] overflow-hidden border border-white/10 group shadow-2xl">
              <img
                src="/fynryx.png"
                alt="Fynryx Engineering Culture"
                className="w-full h-auto object-cover transition-transform duration-[8s] hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#020617]/80 to-transparent opacity-60" />
              
              {/* Floating Overlay Card */}
              <div className="absolute bottom-10 left-10 p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 max-w-sm">
                <p className="text-white font-black text-4xl mb-2">100+</p>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">Elite Deployments Annually</p>
                <div className="mt-8 flex items-center gap-2">
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" />
                      ))}
                   </div>
                   <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest pl-2">50+ Domain Experts</span>
                </div>
              </div>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -z-10 -top-10 -right-10 w-full h-full border border-blue-500/20 rounded-[4rem] translate-x-4 translate-y-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
