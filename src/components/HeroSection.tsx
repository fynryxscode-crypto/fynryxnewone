'use client';

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, Smartphone, Globe, TrendingUp, Monitor, 
  ShieldCheck, Bot, Users, Gamepad2, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { name: "UI/UX DESIGN", icon: Monitor, desc: "Crafting beautiful, user-centered designs that drive engagement and retention.", color: "from-blue-400 to-cyan-300" },
  { name: "WEB DEVELOPMENT", icon: Globe, desc: "Building lightning-fast, scalable, and secure web applications.", color: "from-blue-500 to-[#2f55ff]" },
  { name: "MOBILE APP DEV", icon: Smartphone, desc: "Creating native and cross-platform mobile experiences.", color: "from-purple-400 to-indigo-500" },
  { name: "DIGITAL MARKETING", icon: TrendingUp, desc: "Data-driven marketing strategies to exponential growth.", color: "from-pink-400 to-rose-500" },
  { name: "CUSTOM SOFTWARE", icon: Code, desc: "Tailor-made software solutions to fit your exact business needs.", color: "from-teal-400 to-emerald-500" },
  { name: "CYBER SECURITY", icon: ShieldCheck, desc: "Robust protection for your enterprise data and digital assets.", color: "from-red-400 to-orange-500" },
  { name: "AI CHATBOT", icon: Bot, desc: "Automate your customer support with intelligent conversational bots.", color: "from-yellow-400 to-amber-500" },
  { name: "CRM & HRM", icon: Users, desc: "Streamline your operations with powerful management platforms.", color: "from-cyan-400 to-blue-500" },
  { name: "GAMING APPS", icon: Gamepad2, desc: "Immersive games built with modern engaging 3D architectures.", color: "from-fuchsia-400 to-purple-600" }
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Memoize orbit items to avoid re-renders
  const orbitItems = useMemo(() => services.map((item, index) => {
    const angle = (index * (360 / services.length)) * (Math.PI / 180);
    return { ...item, angle, index };
  }), []);

  return (
    <section className="relative w-full min-h-[800px] sm:h-[750px] flex items-center overflow-hidden bg-[#050b36]">
      
      {/* VIDEO BACKGROUND — poster shown immediately for fast LCP */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.jpg"
          preload="none"          // Don't preload video bytes; poster handles LCP
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          {/* Prefer WebM (smaller) if available, fallback to MP4 */}
          <source src="/space.webm" type="video/webm" />
          <source src="/space.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b36]/60 via-[#050b36]/50 to-[#050b36]"></div>

        {/* Glow Orbs - Hardware Accelerated */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2f55ff]/10 blur-[150px] rounded-full will-change-transform"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full will-change-transform"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center text-left pt-32 sm:pt-40 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 font-semibold text-sm mb-6 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2f55ff]"></span>
              </span>
              Digital Innovation
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] mb-6 min-h-[100px] sm:min-h-[140px]">
              We Provide <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${services[active].color}`}
                >
                  {services[active].name}
                </motion.span>
              </AnimatePresence>
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-base sm:text-lg text-blue-100/70 mb-8 sm:mb-10 max-w-lg leading-relaxed min-h-[50px] sm:h-[60px]"
              >
                {services[active].desc} We deliver high-quality solutions with modern technologies.
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-col gap-10 mt-2">
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <Link to="/services" className="inline-flex items-center gap-3 px-8 py-4 bg-[#2f55ff] hover:bg-blue-600 text-white rounded-full font-bold text-[15px] shadow-[0_0_20px_rgba(47,85,255,0.4)] hover:shadow-[0_0_30px_rgba(47,85,255,0.6)] hover:-translate-y-1 transition-all duration-300">
                  Explore More
                  <ArrowRight size={18} />
                </Link>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((num, i) => (
                      <div key={i} className="relative w-10 sm:w-11 h-10 sm:h-11 rounded-full border-2 border-[#050b36] shadow-lg overflow-hidden bg-slate-800" style={{ zIndex: 30 - (i * 10) }}>
                        <img
                          src={`https://ui-avatars.com/api/?name=Client+${num}&background=random&color=fff`}
                          alt={`Happy client ${i + 1}`}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-[15px] flex items-center gap-1">
                       4.5/5 Rating 
                       <span className="text-yellow-400 text-lg">★</span>
                    </span>
                    <span className="text-blue-100/60 text-xs font-semibold uppercase tracking-widest mt-0.5">500+ Reviews</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-white/10 w-fit pr-10">
                <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mr-3">Follow Us:</span>
                {[
                  { id: 'fb', d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", label: "Facebook" },
                  { id: 'tw', d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z", label: "Twitter" },
                  { id: 'ig', d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01", isRect: true, label: "Instagram" },
                  { id: 'li', d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z", label: "LinkedIn" }
                ].map((social) => (
                  <motion.a 
                    key={social.id}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center justify-center hover:bg-[#2f55ff] hover:text-white transition-all"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {social.isRect && <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>}
                      <path d={social.d}></path>
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT ORBIT CIRCLE - PERFORMANCE OPTIMIZED */}
        <div className="flex items-center justify-center relative h-[600px] w-full transform scale-75 sm:scale-90 md:scale-100">
          <div className="relative w-[450px] h-[450px] rounded-full border border-white/10 flex items-center justify-center">

            <div className="absolute inset-0 rounded-full border border-blue-500/20 scale-110"></div>
            <div className="absolute inset-0 rounded-full border border-cyan-400/10 scale-125 border-dashed animate-[spin_60s_linear_infinite]"></div>

            {/* Center Logo — priority + fetchPriority for best LCP */}
            <div className="relative z-20 w-28 h-28 rounded-full bg-[#050b36] border-2 border-[#2f55ff] shadow-[0_0_30px_rgba(47,85,255,0.5)] flex items-center justify-center overflow-hidden">
               <img
                 src="/f-logo.png"
                 alt="Fynryx"
                 width={90}
                 height={90}
                 className="object-contain p-2 brightness-0 invert"
               />
            </div>

            {/* Orbiting Items - Optimized with memoized angles */}
            {orbitItems.map((item) => {
              const currentAngle = (item.angle - (active * (2 * Math.PI / services.length)));
              const radius = 225;
              const x = radius * Math.cos(currentAngle);
              const y = radius * Math.sin(currentAngle);
              const isActive = item.index === active;
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.index}
                  className="absolute top-1/2 left-1/2 z-30 cursor-pointer group"
                  animate={{
                    x: `calc(-50% + ${x}px)`,
                    y: `calc(-50% + ${y}px)`,
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  onClick={() => setActive(item.index)}
                >
                  <div
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-700 ease-in-out border ${
                      isActive
                        ? "bg-[#2f55ff] text-white border-blue-400 shadow-[0_0_20px_rgba(47,85,255,0.8)]"
                        : "bg-[#09104f]/80 backdrop-blur-md text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <Icon size={isActive ? 16 : 14} className={isActive ? "text-white" : "text-blue-400"} />
                    <span className={`text-xs md:text-sm font-bold tracking-wide ${isActive ? "" : "hidden md:block"}`}>
                      {item.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>

      </div>

      {/* DOTS */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-40">
        {services.map((s, i) => (
          <Link
            key={i}
            to={`/services/${s.name.toLowerCase().replace(/ /g, '-').replace('app-dev', 'app-development')}`}
            className="group/hero-dot relative"
            onMouseEnter={() => setActive(i)}
            aria-label={`Go to ${s.name} page`}
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                active === i ? "bg-[#2f55ff] w-8 h-2.5 shadow-[0_0_10px_rgba(47,85,255,0.8)]" : "bg-white/20 hover:bg-white/40 w-2.5 h-2.5"
              }`}
            />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full opacity-0 group-hover/hero-dot:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl z-50">
               {s.name} Page
            </span>
          </Link>
        ))}
      </div>
      
    </section>
  );
}
