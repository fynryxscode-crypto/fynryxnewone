"use client";

import { motion } from "framer-motion";
import { Circle, Sparkles, TrendingUp, Users, Target, Rocket, ShieldCheck } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
}

const MILESTONES: Milestone[] = [
  { year: "2015", title: "Genesis", icon: <Target size={18} />, desc: "Initial concept formulated by Arman Khan to revolutionize industrial digital interfaces." },
  { year: "2017", title: "First Impact", icon: <TrendingUp size={18} />, desc: "Successful deployment of our first high-performance fintech engine for a global partner." },
  { year: "2019", title: "Core Evolution", icon: <Users size={18} />, desc: "Expanded to 20+ elite engineers, establishing our dedicated Mumbai innovation hub." },
  { year: "2021", title: "Education Pivot", icon: <Sparkles size={18} />, desc: "Launched Fynryx Academy, integrating IT Training with industrial development expertise." },
  { year: "2023", title: "Centennial Goal", icon: <ShieldCheck size={18} />, desc: "Exceeded 100+ global project deliveries with a 98% client retention achievement." },
  { year: "2025", title: "The Standard", icon: <Rocket size={18} />, desc: "Fynryx Tech Private Limited established as a global benchmark for engineering excellence." },
];

export default function RoadmapTimeline() {
  return (
    <section className="py-24 lg:py-32 bg-[#020617] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <span className="inline-block bg-blue-50/5 border border-blue-500/10 text-blue-400 text-xs font-black px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase backdrop-blur-sm">
            Roadmap to Excellence
          </span>
          <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
            Our <span className="text-[#2f55ff]">Journey</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto italic">
            "A decade of engineering milestones that define our heritage."
          </p>
        </div>

        {/* ROADMAP TRACK */}
        <div className="relative">
          {/* Main Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 hidden lg:block -translate-y-1/2 opacity-50" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-6 relative">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative flex flex-col items-center text-center lg:text-left lg:items-start group"
              >
                {/* Year Bubble */}
                <div className={`mb-12 relative z-20 group-hover:scale-110 transition-transform duration-500`}>
                   <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:border-[#2f55ff]/50">
                      <span className="text-blue-500 font-black text-xs uppercase tracking-widest">{m.year}</span>
                   </div>
                   
                   {/* Connection Dot to Main Line (Desktop Only) */}
                   <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020617] border-2 border-slate-800 mt-10 hidden lg:block group-hover:border-[#2f55ff] transition-colors" />
                </div>

                <div className="lg:pt-14 space-y-4">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#2f55ff]">
                      {m.icon}
                    </div>
                    <h4 className="text-white font-black text-lg md:text-xl tracking-tight leading-none">{m.title}</h4>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[200px] mx-auto lg:mx-0 group-hover:text-slate-400 transition-colors">
                    {m.desc}
                  </p>
                </div>
                
                {/* Visual Branch Line to track (Desktop Only) */}
                <div className="absolute top-[64px] left-1/2 -translate-x-1/2 w-px h-10 bg-slate-800 hidden lg:block opacity-30 group-hover:opacity-100 group-hover:bg-[#2f55ff]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
