"use client";

import { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Globe,
  Smartphone,
  Plug,
  Layers,
  ShieldCheck,
  Wrench,
  Users,
  Zap,
  DollarSign,
  Clock,
  Phone,
  Mail,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { TechData } from "@/data/technologiesData";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Reusable animated section wrapper ─── */
function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Services data ─── */
const getServices = (name: string) => [
  {
    icon: Globe,
    title: `${name} Web Development`,
    desc: `Custom, high-performance web applications built with ${name} — optimised for speed, SEO, and scalability.`,
  },
  {
    icon: Smartphone,
    title: `${name} App Development`,
    desc: `Native and cross-platform mobile applications powered by ${name} for flawless iOS and Android experiences.`,
  },
  {
    icon: Plug,
    title: "API Integration",
    desc: `Seamless REST and GraphQL API development and third-party integration using ${name} best practices.`,
  },
  {
    icon: Layers,
    title: "UI/UX Implementation",
    desc: `Pixel-perfect, accessible UI implementation in ${name} from Figma designs with smooth animations.`,
  },
  {
    icon: ShieldCheck,
    title: "Security & Performance",
    desc: `Vulnerability audits, performance profiling, and hardening to keep your ${name} application secure and fast.`,
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    desc: `Ongoing ${name} version upgrades, bug fixes, monitoring, and dedicated technical support SLAs.`,
  },
];

const whyFynryx = [
  {
    icon: Users,
    title: "Experienced Team",
    desc: "Senior engineers with 5+ years average experience and proven track records across 500+ delivered projects.",
  },
  {
    icon: Zap,
    title: "Agile Process",
    desc: "2-week sprint cycles with daily standups, live demos, and full Jira/Linear project transparency.",
  },
  {
    icon: DollarSign,
    title: "Cost-Effective",
    desc: "Competitive rates with no hidden costs. Flexible engagement models: fixed-price, retainer, or T&M.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "98% on-time delivery rate. We define realistic milestones and hold ourselves accountable to them.",
  },
];

/* ─── FAQ Accordion Item ─── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-blue-500 bg-blue-50 rounded-full w-7 h-7 flex items-center justify-center shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-slate-800 text-base">{q}</span>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
          <div className="pt-4">{a}</div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function TechnologyPageTemplate({ tech }: { tech: TechData }) {
  const services = getServices(tech.name);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={`relative pt-28 pb-20 bg-linear-to-br ${tech.heroGradient} overflow-hidden`}>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              {/* Breadcrumb */}
              <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/60 text-xs font-medium mb-6">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/technologies" className="hover:text-white transition-colors">Technologies</Link>
                <span>/</span>
                <span className="text-white">{tech.name}</span>
              </motion.div>

              {/* Category pill */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {tech.category}
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-[1.08] mb-5">
                {tech.name}{" "}
                <span className="block text-white/60 text-3xl md:text-4xl xl:text-5xl font-bold mt-1">
                  Development Services
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                {tech.tagline}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-7 py-3.5 rounded-full hover:shadow-2xl hover:-translate-y-0.5 transition-all group"
                >
                  Get Free Consultation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all"
                >
                  View Our Work
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
                {[
                  { value: "500+", label: "Projects" },
                  { value: "120+", label: "Clients" },
                  { value: "6+", label: "Years" },
                  { value: "98%", label: "On-time" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black text-white">{s.value}</div>
                    <div className="text-white/50 text-xs font-medium mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Tech Logo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex flex-col items-center justify-center"
            >
              <div className="relative">
                {/* Main logo card */}
                <div className="w-72 h-72 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                  <img
                    src={tech.logoUrl}
                    alt={tech.name}
                    width={144}
                    height={144}
                    className="object-contain drop-shadow-2xl"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                {/* Floating badge pills */}
                {tech.floatingBadges.map((badge, i) => {
                  const positions = [
                    "-top-4 -left-8",
                    "-top-4 -right-8",
                    "-bottom-4 -left-10",
                    "-bottom-4 -right-6",
                  ];
                  return (
                    <motion.div
                      key={badge}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                      className={`absolute ${positions[i] ?? ""} bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
                    >
                      {badge}
                    </motion.div>
                  );
                })}
                {/* Star ratings */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-white text-xs font-bold ml-1">5.0</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <AnimSection>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                About the Technology
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                What is{" "}
                <span className={`bg-linear-to-r ${tech.accentFrom} ${tech.accentTo} bg-clip-text text-transparent`}>
                  {tech.name}?
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 text-lg leading-relaxed mb-6">
                {tech.about}
              </motion.p>
              <motion.h3 variants={fadeUp} className="text-xl font-bold text-slate-800 mb-3">
                Why It Matters in Modern Development
              </motion.h3>
              <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed">
                {tech.importance}
              </motion.p>
            </AnimSection>

            {/* Right — stats cards */}
            <AnimSection className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Projects Delivered", sub: "across all tech stacks" },
                { value: "98%", label: "Client Satisfaction", sub: "based on post-project surveys" },
                { value: "6+", label: "Years of Expertise", sub: `in ${tech.name} development` },
                { value: "24/7", label: "Support Available", sub: "for critical production issues" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className={`text-3xl font-black bg-linear-to-r ${tech.accentFrom} ${tech.accentTo} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="font-bold text-slate-800 text-sm mb-1">{stat.label}</div>
                  <div className="text-slate-400 text-xs">{stat.sub}</div>
                </motion.div>
              ))}
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ─────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                Our Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                What We Excel at in{" "}
                <span className={`bg-linear-to-r ${tech.accentFrom} ${tech.accentTo} bg-clip-text text-transparent`}>
                  {tech.name}
                </span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tech.expertise.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <div className={`w-8 h-8 rounded-xl bg-linear-to-br ${tech.accentFrom} ${tech.accentTo} flex items-center justify-center shrink-0 mt-0.5`}>
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                Services We Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                End-to-End {tech.name} Solutions
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                From initial concept to production deployment — we cover every stage of your{" "}
                {tech.name} project lifecycle.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="group p-7 rounded-2xl border border-slate-100 hover:border-blue-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${tech.accentFrom} ${tech.accentTo} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-3 group-hover:text-blue-600 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{svc.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── WHY FYNRYX ────────────────────────────────────────── */}
      <section className="py-20 bg-[#05080f] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="inline-block bg-white/5 border border-white/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                Why Choose Fynryx
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                The Fynryx Advantage
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyFynryx.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${tech.accentFrom} ${tech.accentTo} flex items-center justify-center mb-5`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-3">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                Tech Stack & Tools
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Technologies We Use Alongside {tech.name}
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="flex flex-wrap justify-center gap-5">
              {/* Current tech — highlighted */}
              <motion.div
                variants={fadeUp}
                className={`flex items-center gap-3 bg-linear-to-r ${tech.accentFrom} ${tech.accentTo} text-white px-6 py-3 rounded-2xl shadow-lg`}
              >
                <img src={tech.logoUrl} alt={tech.name} width={28} height={28} className="object-contain brightness-0 invert" onError={() => {}} />
                <span className="font-bold text-sm">{tech.name}</span>
                <span className="text-white/70 text-xs bg-white/20 px-2 py-0.5 rounded-full">Primary</span>
              </motion.div>

              {/* Related tech */}
              {tech.relatedTech.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <img
                    src={t.logo}
                    alt={t.name}
                    width={28}
                    height={28}
                    className="object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <span className="font-semibold text-slate-700 text-sm">{t.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Common Questions About {tech.name}
              </h2>
            </motion.div>

            <div className="flex flex-col gap-3">
              {tech.faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className={`py-24 bg-linear-to-br ${tech.heroGradient} relative overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left copy */}
            <AnimSection>
              <motion.div variants={fadeUp}>
                <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                  Start Your Project
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                  Ready to Build with{" "}
                  <span className="text-white/70">{tech.name}?</span>
                </h2>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  Tell us about your project and get a free consultation from our{" "}
                  {tech.name} specialists within 24 hours.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <Phone size={16} className="text-white/60" />
                    <span>74166-46611 | 74166-46655</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <Mail size={16} className="text-white/60" />
                    <span>hello@fynryx.com</span>
                  </div>
                </div>
              </motion.div>
            </AnimSection>

            {/* Right — Contact Form */}
            <AnimSection>
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-3xl p-8 shadow-2xl"
              >
                <div className={`h-1 w-16 rounded-full bg-linear-to-r ${tech.accentFrom} ${tech.accentTo} mb-6`} />
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">Get Free Consultation</h3>
                <p className="text-slate-400 text-sm mb-6">Response within 24 hours, guaranteed.</p>

                <form className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 col-span-2 sm:col-span-1"
                    />
                    <input
                      type="email"
                      placeholder="Work Email"
                      className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 col-span-2 sm:col-span-1"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50"
                  />
                  <textarea
                    placeholder={`Describe your ${tech.name} project requirements...`}
                    rows={3}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 resize-none"
                  />
                  <button
                    type="button"
                    className={`group w-full bg-linear-to-r ${tech.accentFrom} ${tech.accentTo} text-white py-3.5 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2`}
                  >
                    Start Your Project Today
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </motion.div>
            </AnimSection>
          </div>
        </div>
      </section>


      {/* Footer is handled by RootLayout */}
    </main>
  );
}
