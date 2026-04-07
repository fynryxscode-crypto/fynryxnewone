"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  color: string;
}



// --- TEAM DATA CONFIGURATION ---
// You can easily edit names, roles, and images here.
const MANAGERS: TeamMember[] = [
  { name: "P. VISHNU VARDHAN REDDY", role: "FOUNDER", image: "/team/1.png", color: "border-orange-500" },
  { name: "K USHA RANI", role: "FOUNDER", image: "/team/2.png", color: "border-yellow-500" },
  { name: "P PRADEEP KUMAR REDDY", role: "CO-FOUNDER", image: "/team/5.png", color: "border-blue-500" },
  { name: "P VIJAY REDDY", role: "DIRECTOR", image: "/team/3.png", color: "border-rose-500" },
  { name: "P ANITHA", role: "DIRECTOR", image: "/team/4.png", color: "border-rose-500" },
];

const TEAM_MEMBERS: TeamMember[] = [
  { name: "REBBA SAILU", role: "PROJECT MANAGER", image: "/team/team-1.png", color: "border-slate-400" },
  { name: "S KAVYA REDDY", role: "ASSOCIATE COUNSELLOR", image: "/team/team-2.png", color: "border-slate-400" },
  { name: "P VENKATRAO", role: "SENIOR TECH LEAD", image: "/team/team-3.png", color: "border-slate-400" },
  { name: "G SAI KRISHNA", role: "HR MANAGER", image: "/team/team-4.png", color: "border-slate-400" },
  { name: "S JAYARAM", role: "ASSOCIATE COUNSELLOR", image: "/team/team-5.png", color: "border-slate-400" },
  { name: "K YUVA KISHORE", role: "ASSOCIATE ENGINEER", image: "/team/team-6.png", color: "border-slate-400" },
  { name: "S SHASHI REKHA", role: "OFFICE ASSISTANT", image: "/team/team-7.png", color: "border-slate-400" },
  { name: "SARDAR HUSSAIN", role: "SENIOR SOFTWARE ENGINEER", image: "/team/team-8.png", color: "border-slate-400" },
  { name: "B RAM KUMAR REDDY", role: "SENIOR SOFTWARE ENGINEER", image: "/team/team-9.png", color: "border-slate-400" },
  { name: "G MAHITHA", role: "ASSOCIATE ENGINEER", image: "/team/team-10.png", color: "border-slate-400" },
  { name: "M SHILPA", role: "ASSOCIATE ENGINEER", image: "/team/team-11.png", color: "border-slate-400" },
  { name: "M RAMAGIRIDHAR", role: "ASSOCIATE ENGINEER", image: "/team/team-12.png", color: "border-slate-400" },
  { name: "B CHARITHA", role: "ASSOCIATE COUNSELLOR", image: "/team/team-13.png", color: "border-slate-400" },
  
];
// --------------------------------

function TeamCard({ member, size = "large" }: { member: TeamMember; size?: "large" | "medium" | "small" }) {
  const sizeClasses = {
    large: "w-40 h-40 md:w-52 md:h-52",
    medium: "w-32 h-32 md:w-40 md:h-40",
    small: "w-24 h-24 md:w-32 md:h-32",
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center group relative w-full px-2"
    >
      {/* CARD BODY WITH GLASS EFFECT */}
      <div className="relative flex flex-col items-center w-full px-4 py-8  transition-all duration-500 hover:bg-white/3 hover:shadow-[0_20px_50px_rgba(47,85,255,0.1)] border border-transparent hover:border-white/10">
        
        {/* Avatar Container */}
        <div className={`relative ${sizeClasses[size]} mb-6`}>
          {/* Decorative Ring */}
          <div className={`absolute -inset-1 rounded-full bg-linear-to-tr from-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[2px]`} />
          
          {/* Progress Ring Style Border */}
          <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90 hidden md:block">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              className="fill-none stroke-white/5 stroke-1"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 0.75 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`fill-none stroke-2 ${member.color.replace('border-', 'stroke-')} opacity-60 group-hover:opacity-100 transition-all duration-500`}
              strokeLinecap="round"
            />
          </svg>

          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 relative z-10 bg-slate-900 shadow-2xl">
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
              loading="lazy"
            />
          </div>
          
          {/* Subtle Glow */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
        
        {/* Info Area */}
        <div className="text-center relative z-20">
          <h4 className="text-white font-black text-base md:text-lg tracking-tight leading-tight mb-2 uppercase wrap-break-word px-1">
            {member.name}
          </h4>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2f55ff] opacity-90">
              {member.role}
            </span>
            <div className="w-8 h-[2px] bg-white/10 rounded-full group-hover:w-16 group-hover:bg-[#2f55ff] transition-all duration-500" />
          </div>
          
          {/* Hover interactions */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-[120%] transition-all duration-300 flex gap-4 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
            <Linkedin size={14} className="text-white/60 hover:text-blue-400 cursor-pointer transition-colors" />
            <Twitter size={14} className="text-white/60 hover:text-blue-300 cursor-pointer transition-colors" />
            <Mail size={14} className="text-white/60 hover:text-rose-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamHierarchy() {
  return (
    <section className="py-24 lg:py-32 bg-[#020617] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(47,85,255,0.05)_0,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="inline-block bg-blue-50/5 border border-blue-500/10 text-blue-400 text-xs font-black px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            Organizational Structure
          </span>
          <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
            Our Elite <span className="text-[#2f55ff]">Squadron</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto italic">
            "A structured harmony where innovation meets execution at every tier."
          </p>
        </div>

        {/* TREE HIERARCHY */}
        <div className="flex flex-col items-center gap-20">
          
         
          

          {/* LEVEL 2: MANAGERS */}
          <div className="relative w-full">
             {/* Horizontal connector line */}
             <div className="absolute -top-10 left-[10%] right-[10%] h-px bg-slate-800 hidden md:block" />
             
             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-12 lg:gap-8">
               {MANAGERS.map((m, i) => (
                 <div key={i} className="relative">
                    {/* Vertical branches to horizontal line */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-slate-800 hidden md:block" />
                    <TeamCard member={m} size="medium" />
                 </div>
               ))}
             </div>
             
             {/* Main vertical connector to Team Level (center) */}
             <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-px h-14 bg-slate-800 hidden lg:block" />
          </div>

          {/* LEVEL 3: TEAM GRID */}
          <div className="relative w-full mt-10">
             {/* Horizontal team divider */}
             <div className="absolute -top-14 left-[10%] right-[10%] h-px bg-slate-800 hidden lg:block" />
             
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-12 md:gap-y-16 gap-x-4 md:gap-x-10">
                {TEAM_MEMBERS.map((m, i) => (
                  <div key={i} className="relative">
                     {/* Tiny vertical branch */}
                     <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-px h-14 bg-slate-800 hidden lg:block opacity-50" />
                     <TeamCard member={m} size="small" />
                  </div>
                ))}
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}
