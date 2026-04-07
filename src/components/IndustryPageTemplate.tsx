"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Leaf, CreditCard, GraduationCap, HeartPulse, ShoppingCart,
  Truck, Landmark, Hotel, Dumbbell, Zap, Scale, Factory,
  Building2, Car, Plane, Package, Home, Music, Gamepad2,
  ShieldCheck, Globe, Cpu, Users, BarChart3, Smartphone,
  CheckCircle2, ArrowRight, ChevronDown, ChevronUp,
  Star, Clock, Award, TrendingUp, Layers, Code2,
  Wrench, MessageCircle, Rocket, Database, Lock,
  CloudLightning, Wifi, Bot, LineChart, Map, Camera,
  DollarSign, Calendar, Search, Bell, Share2, Settings,
} from "lucide-react";
import { getIndustryBySlug } from "@/data/industriesData";
import QuickQuoteForm from "@/components/QuickQuoteForm";

const ICON_MAP: Record<string, React.ElementType> = {
  Leaf, CreditCard, GraduationCap, HeartPulse, ShoppingCart,
  Truck, Landmark, Hotel, Dumbbell, Zap, Scale, Factory,
  Building2, Car, Plane, Package, Home, Music, Gamepad2,
  ShieldCheck, Globe, Cpu, Users, BarChart3, Smartphone,
  CheckCircle2, ArrowRight, ChevronDown, ChevronUp,
  Star, Clock, Award, TrendingUp, Layers, Code2,
  Wrench, MessageCircle, Rocket, Database, Lock,
  CloudLightning, Wifi, Bot, LineChart, Map, Camera,
  DollarSign, Calendar, Search, Bell, Share2, Settings,
};

function getIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Cpu;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function useScrollInView(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

function SectionHeader({
  tag,
  title,
  subtitle,
  accentFrom,
  accentTo,
}: {
  tag: string;
  title: string;
  subtitle?: string;
  accentFrom: string;
  accentTo: string;
}) {
  return (
    <div className="text-center mb-14">
      <span className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
        {tag}
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">{title}</h2>
      {subtitle && (
        <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

export default function IndustryPageTemplate({ slug }: { slug: string }) {
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b14]">
        <p className="text-white text-xl">Industry not found.</p>
      </div>
    );
  }

  const {
    name, tagline, description, heroGradient,
    accentFrom, accentTo, accentHex,
    iconName, heroHighlights, stats,
    solutions, features, techStack, faqs,
  } = industry;

  const HeroIcon = getIcon(iconName);

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">
      {/* ─── 1. HERO ─────────────────────────────────────────────────── */}
      <HeroSection
        name={name}
        tagline={tagline}
        heroGradient={heroGradient}
        accentFrom={accentFrom}
        accentTo={accentTo}
        accentHex={accentHex}
        HeroIcon={HeroIcon}
        highlights={heroHighlights}
      />

      {/* ─── 2. INDUSTRY OVERVIEW ─────────────────────────────────────── */}
      <OverviewSection
        name={name}
        description={description}
        stats={stats}
        accentFrom={accentFrom}
        accentTo={accentTo}
        accentHex={accentHex}
      />

      {/* ─── 3. OUR SOLUTIONS ─────────────────────────────────────────── */}
      <SolutionsSection
        solutions={solutions}
        accentFrom={accentFrom}
        accentTo={accentTo}
        accentHex={accentHex}
      />

      {/* ─── 4. KEY FEATURES ─────────────────────────────────────────── */}
      <FeaturesSection
        features={features}
        accentFrom={accentFrom}
        accentTo={accentTo}
        accentHex={accentHex}
      />

      {/* ─── 5. WHY FYNRYX ───────────────────────────────────────────── */}
      <WhyFynryxSection accentFrom={accentFrom} accentTo={accentTo} accentHex={accentHex} />

      {/* ─── 6. TECHNOLOGY STACK ─────────────────────────────────────── */}
      <TechStackSection
        techStack={techStack}
        accentFrom={accentFrom}
        accentTo={accentTo}
        accentHex={accentHex}
      />

      {/* ─── 7. APP SCREENS SHOWCASE ─────────────────────────────────── */}
      <AppShowcaseSection
        name={name}
        accentFrom={accentFrom}
        accentTo={accentTo}
        accentHex={accentHex}
        heroGradient={heroGradient}
      />

      {/* ─── 8. DEVELOPMENT PROCESS ──────────────────────────────────── */}
      <ProcessSection accentFrom={accentFrom} accentTo={accentTo} accentHex={accentHex} />

      {/* ─── 9. CTA ──────────────────────────────────────────────────── */}
      <CTASection
        name={name}
        accentFrom={accentFrom}
        accentTo={accentTo}
        heroGradient={heroGradient}
      />

      {/* ─── 10. FAQ ─────────────────────────────────────────────────── */}
      <FAQSection
        faqs={faqs}
        accentFrom={accentFrom}
        accentTo={accentTo}
        accentHex={accentHex}
      />
      
      {/* Footer handles by RootLayout */}
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 1. HERO                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */
function HeroSection({
  name, tagline, heroGradient, accentFrom, accentTo, accentHex, HeroIcon, highlights,
}: {
  name: string; tagline: string; heroGradient: string;
  accentFrom: string; accentTo: string; accentHex: string;
  HeroIcon: React.ElementType; highlights: string[];
}) {
  return (
    <section className={`relative min-h-[88vh] flex items-center bg-linear-to-br ${heroGradient} overflow-hidden`}>
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${accentHex}55 1px, transparent 1px), linear-gradient(90deg, ${accentHex}55 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: accentHex }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: accentHex }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left copy */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeUp}>
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-linear-to-r ${accentFrom} ${accentTo} text-white`}
            >
              <HeroIcon size={14} />
              {name} Solutions
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-white"
          >
            {name}
            <span className={`block bg-linear-to-r ${accentFrom} ${accentTo} bg-clip-text text-transparent`}>
              App Development
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-slate-300 text-lg leading-relaxed max-w-xl">
            {tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-2">
            {highlights.map((h) => (
              <span
                key={h}
                className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-slate-300 bg-white/5 backdrop-blur-sm"
              >
                {h}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-2">
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-linear-to-r ${accentFrom} ${accentTo} hover:opacity-90 transition-all shadow-lg`}
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-all"
            >
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — animated icon card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative">
            <div
              className="w-72 h-72 rounded-3xl flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl"
              style={{ boxShadow: `0 0 80px ${accentHex}33` }}
            >
              <HeroIcon size={100} style={{ color: accentHex }} strokeWidth={1.2} />
            </div>
            {/* Floating chips */}
            {[
              { label: "Custom Build", Icon: Code2, pos: "-top-5 -right-5" },
              { label: "On-Time Delivery", Icon: Clock, pos: "-bottom-5 -left-5" },
              { label: "Scalable", Icon: TrendingUp, pos: "top-1/2 -right-14 -translate-y-1/2" },
            ].map(({ label, Icon, pos }) => (
              <div
                key={label}
                className={`absolute ${pos} flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0d1525] border border-white/10 text-xs font-medium text-white shadow-xl`}
              >
                <Icon size={12} style={{ color: accentHex }} />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 2. INDUSTRY OVERVIEW                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
function OverviewSection({
  name, description, stats, accentFrom, accentTo, accentHex,
}: {
  name: string; description: string;
  stats: { value: string; label: string }[];
  accentFrom: string; accentTo: string; accentHex: string;
}) {
  const { ref, inView } = useScrollInView();
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
              Industry Overview
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5">
              Why {name} Needs{" "}
              <span className={`bg-linear-to-r ${accentFrom} ${accentTo} bg-clip-text text-transparent`}>
                Digital Transformation
              </span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">{description}</p>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all text-center group"
              >
                <div
                  className={`text-4xl font-extrabold bg-linear-to-r ${accentFrom} ${accentTo} bg-clip-text text-transparent mb-2`}
                >
                  {s.value}
                </div>
                <div className="text-slate-500 text-sm font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 3. OUR SOLUTIONS                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */
function SolutionsSection({
  solutions, accentFrom, accentTo, accentHex,
}: {
  solutions: { iconName: string; title: string; desc: string }[];
  accentFrom: string; accentTo: string; accentHex: string;
}) {
  const { ref, inView } = useScrollInView();
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="What We Build"
          title="Our Industry Solutions"
          subtitle="End-to-end digital products tailored to your industry's unique workflows and user expectations."
          accentFrom={accentFrom}
          accentTo={accentTo}
        />
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((s) => {
            const Icon = getIcon(s.iconName);
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-linear-to-br ${accentFrom} ${accentTo} group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 4. KEY FEATURES                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */
function FeaturesSection({
  features, accentFrom, accentTo, accentHex,
}: {
  features: { iconName: string; title: string; desc: string }[];
  accentFrom: string; accentTo: string; accentHex: string;
}) {
  const { ref, inView } = useScrollInView();
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Capabilities"
          title="Key Features We Deliver"
          subtitle="Every product we ship is engineered with performance, security, and scalability at its core."
          accentFrom={accentFrom}
          accentTo={accentTo}
        />
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => {
            const Icon = getIcon(f.iconName);
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all group"
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-1 bg-blue-50"
                >
                  <Icon size={18} style={{ color: accentHex }} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold text-base mb-1">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 5. WHY FYNRYX                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */
const WHY_ITEMS = [
  { icon: Award, title: "Domain Expertise", desc: "Specialists who have shipped production apps in your vertical — not generalists learning on your dime." },
  { icon: Rocket, title: "Agile Delivery", desc: "2-week sprints with continuous demos ensure you see working software — not just status updates." },
  { icon: ShieldCheck, title: "Security-First", desc: "OWASP top-10 coverage, GDPR/HIPAA-ready architectures, and end-to-end encryption baked in from day one." },
  { icon: TrendingUp, title: "Scalable Architecture", desc: "Microservices, serverless, and cloud-native patterns that grow from MVP to millions of users." },
  { icon: Users, title: "Dedicated Team", desc: "A named pod — PM, lead dev, QA, and designer — who own your product outcomes, not just ticket velocity." },
  { icon: LineChart, title: "Post-Launch Support", desc: "12-month SLA, performance monitoring, and proactive updates so your app keeps delivering value." },
];

function WhyFynryxSection({
  accentFrom, accentTo, accentHex,
}: {
  accentFrom: string; accentTo: string; accentHex: string;
}) {
  const { ref, inView } = useScrollInView();
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Why Us"
          title="Why Choose Fynryx"
          subtitle="We don't just write code. We build digital products that move your business forward."
          accentFrom={accentFrom}
          accentTo={accentTo}
        />
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_ITEMS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group hover:-translate-y-1 duration-300"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-linear-to-br ${accentFrom} ${accentTo}`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 6. TECHNOLOGY STACK                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */
function TechStackSection({
  techStack, accentFrom, accentTo, accentHex,
}: {
  techStack: { name: string; logo: string }[];
  accentFrom: string; accentTo: string; accentHex: string;
}) {
  const { ref, inView } = useScrollInView();
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Tech Stack"
          title="Technologies We Use"
          subtitle="Battle-tested tools chosen for performance, community support, and long-term maintainability."
          accentFrom={accentFrom}
          accentTo={accentTo}
        />
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="flex flex-wrap justify-center gap-5"
        >
          {techStack.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="flex flex-col items-center gap-3 p-5 w-28 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm hover:-translate-y-1 transition-all duration-300 group"
            >
              <img
                src={t.logo}
                alt={t.name}
                width={40}
                height={40}
                className="object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-slate-700 text-xs font-medium text-center">{t.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 7. APP SCREENS SHOWCASE (CSS mockups)                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
const SCREEN_FEATURES = [
  { icon: Smartphone, label: "Intuitive UI/UX" },
  { icon: Layers, label: "Modular Architecture" },
  { icon: Lock, label: "Secure by Design" },
  { icon: Globe, label: "Cross-Platform" },
];

function PhoneMockup({
  accentHex,
  accentFrom,
  accentTo,
  heroGradient,
  offset = false,
}: {
  accentHex: string;
  accentFrom: string;
  accentTo: string;
  heroGradient: string;
  offset?: boolean;
}) {
  return (
    <div
      className={`relative w-[160px] shrink-0 rounded-[2.2rem] border-[6px] border-white/10 bg-[#0d1525] shadow-2xl ${offset ? "translate-y-8" : ""}`}
      style={{ boxShadow: `0 20px 60px ${accentHex}33` }}
    >
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black/60 z-10" />
      {/* Screen */}
      <div className={`rounded-[1.7rem] overflow-hidden bg-linear-to-br ${heroGradient} min-h-[300px] flex flex-col`}>
        {/* Status bar */}
        <div className="px-5 pt-9 pb-3 flex justify-between items-center">
          <span className="text-[9px] text-white/50 font-mono">9:41</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
            ))}
          </div>
        </div>
        {/* App content skeleton */}
        <div className="flex-1 px-4 pb-4 flex flex-col gap-3">
          <div
            className={`h-20 rounded-xl bg-linear-to-br ${accentFrom} ${accentTo} opacity-80 flex items-center justify-center`}
          >
            <div className="w-8 h-8 rounded-full bg-white/20" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div
                className="w-8 h-8 rounded-lg shrink-0"
                style={{ background: `${accentHex}33` }}
              />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-2 rounded-full bg-white/15 w-full" />
                <div className="h-1.5 rounded-full bg-white/8 w-3/4" />
              </div>
            </div>
          ))}
          <div
            className={`mt-2 h-8 rounded-xl bg-linear-to-r ${accentFrom} ${accentTo} flex items-center justify-center`}
          >
            <div className="w-16 h-1.5 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppShowcaseSection({
  name, accentFrom, accentTo, accentHex, heroGradient,
}: {
  name: string; accentFrom: string; accentTo: string; accentHex: string; heroGradient: string;
}) {
  const { ref, inView } = useScrollInView();
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="UI Showcase"
          title="Beautifully Crafted Interfaces"
          subtitle={`Every ${name} app we build is pixel-perfect, accessible, and built to convert.`}
          accentFrom={accentFrom}
          accentTo={accentTo}
        />
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Phones */}
          <motion.div
            variants={fadeUp}
            className="flex gap-5 items-end justify-center shrink-0"
          >
            <PhoneMockup accentHex={accentHex} accentFrom={accentFrom} accentTo={accentTo} heroGradient={heroGradient} />
            <PhoneMockup accentHex={accentHex} accentFrom={accentFrom} accentTo={accentTo} heroGradient={heroGradient} offset />
            <PhoneMockup accentHex={accentHex} accentFrom={accentFrom} accentTo={accentTo} heroGradient={heroGradient} />
          </motion.div>

          {/* Feature list */}
          <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-5 flex-1">
            {SCREEN_FEATURES.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon size={18} style={{ color: accentHex }} />
                </div>
                <span className="text-slate-800 font-medium text-sm">{label}</span>
              </motion.div>
            ))}
            <motion.div
              variants={fadeUp}
              className="sm:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <p className="text-slate-500 text-sm leading-relaxed">
                We conduct user research, prototype in Figma, and validate with real users before a single line of production code is written — ensuring every screen solves a real problem.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 8. DEVELOPMENT PROCESS                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */
const PROCESS_STEPS = [
  { step: "01", icon: Search, title: "Discovery & Strategy", desc: "Deep-dive workshops to map user journeys, define KPIs, and align on a product roadmap before design begins." },
  { step: "02", icon: Camera, title: "UI/UX Design", desc: "High-fidelity Figma prototypes validated with real users. Every interaction is intentional." },
  { step: "03", icon: Code2, title: "Agile Development", desc: "2-week sprints with continuous integration, automated testing, and live staging environments." },
  { step: "04", icon: ShieldCheck, title: "QA & Security Audit", desc: "Automated + manual testing, OWASP checks, performance profiling, and accessibility review." },
  { step: "05", icon: Rocket, title: "Launch & Deployment", desc: "Zero-downtime deploys to AWS / GCP / Azure with full monitoring, alerting, and rollback capability." },
  { step: "06", icon: TrendingUp, title: "Growth & Optimisation", desc: "Post-launch analytics, A/B testing, and iterative improvements tied to your business metrics." },
];

function ProcessSection({
  accentFrom, accentTo, accentHex,
}: {
  accentFrom: string; accentTo: string; accentHex: string;
}) {
  const { ref, inView } = useScrollInView();
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="How We Work"
          title="Our Development Process"
          subtitle="A proven methodology that eliminates surprises and delivers products you are proud to ship."
          accentFrom={accentFrom}
          accentTo={accentTo}
        />
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROCESS_STEPS.map(({ step, icon: Icon, title, desc }) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group hover:-translate-y-1 duration-300"
            >
              <div className="absolute top-5 right-5 text-4xl font-black text-slate-100 select-none">
                {step}
              </div>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-linear-to-br ${accentFrom} ${accentTo}`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 9. CTA                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */
function CTASection({
  name, accentFrom, accentTo, heroGradient,
}: {
  name: string; accentFrom: string; accentTo: string; heroGradient: string;
}) {
  return (
    <section className={`py-24 bg-linear-to-br ${heroGradient} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              Ready to Transform Your{" "}
              <span className={`bg-linear-to-r ${accentFrom} ${accentTo} bg-clip-text text-transparent`}>
                {name} Infrastructure?
              </span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-md">
              Let's build a digital product that solves your industry's toughest challenges. Schedule a free deep-dive session with our architects.
            </p>
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 text-white/70 text-sm">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span>Direct architectural consultation</span>
               </div>
               <div className="flex items-center gap-3 text-white/70 text-sm">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span>Tailored vertical-specific proposal</span>
               </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <QuickQuoteForm 
              accentFrom={accentFrom} 
              accentTo={accentTo} 
              serviceName={`${name} Solutions`} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* 10. FAQ                                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */
function FAQSection({
  faqs, accentFrom, accentTo, accentHex,
}: {
  faqs: { q: string; a: string }[];
  accentFrom: string; accentTo: string; accentHex: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, inView } = useScrollInView();
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader
          tag="FAQ"
          title="Frequently Asked Questions"
          accentFrom={accentFrom}
          accentTo={accentTo}
        />
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group hover:bg-slate-50 transition-colors"
              >
                <span className="text-slate-800 font-semibold text-base group-hover:text-slate-900 transition-colors">
                  {faq.q}
                </span>
                <span
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: open === i ? accentHex : "#f1f5f9" }}
                >
                  {open === i ? <ChevronUp size={14} className="text-white" /> : <ChevronDown size={14} className="text-slate-500" />}
                </span>
              </button>
              {open === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100"
                >
                  <div className="pt-4">{faq.a}</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
