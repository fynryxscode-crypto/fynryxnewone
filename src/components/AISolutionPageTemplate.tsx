"use client";

import { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Bot, Database, Sparkles, Cog, ShieldCheck, Lightbulb, Users,
  Layout, Building2, DollarSign, Map, Package,
  ArrowRight, ChevronDown, Eye, Code2, Zap, Globe, Lock, Shield,
  RefreshCw, BarChart3, TrendingUp, Layers, Clock, Cpu, Search,
  MessageSquare, Rocket, Star, Phone, Mail, Settings,
  Smartphone, Truck, HeartPulse, CreditCard, ShoppingCart,
  GraduationCap, Factory, Landmark, Hotel, Bell, UserPlus,
  CheckCircle2, CloudLightning, FastForward, ScanLine,
} from "lucide-react";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import { getAIServiceBySlug } from "@/data/aiSolutionsData";

/* ─── Icon lookup map ─────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Bot, Database, Sparkles, Cog, ShieldCheck, Lightbulb, Users,
  Layout, Building2, DollarSign, Map, Package,
  ArrowRight, ChevronDown, Eye, Code2, Zap, Globe, Lock, Shield,
  RefreshCw, BarChart3, TrendingUp, Layers, Clock, Cpu, Search,
  MessageSquare, Rocket, Star, Phone, Mail, Settings,
  Smartphone, Truck, HeartPulse, CreditCard, ShoppingCart,
  GraduationCap, Factory, Landmark, Hotel, Bell, UserPlus,
  CheckCircle2, CloudLightning, FastForward, ScanLine,
  PhoneCall: Phone,
};
const getIcon = (name: string): React.ElementType => ICON_MAP[name] ?? Cpu;

/* ─── Animation presets ───────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function SectionTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
      {label}
    </span>
  );
}

/* ─── FAQ Item ────────────────────────────────────────────────────────────── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-blue-500 bg-blue-50 rounded-full w-7 h-7 flex items-center justify-center shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-slate-800 text-sm md:text-base">{q}</span>
        </div>
        <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 pt-0 border-t border-slate-100 bg-slate-50/50">
          <p className="text-slate-600 text-sm leading-relaxed pt-4">{a}</p>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
export default function AISolutionPageTemplate({ slug }: { slug: string }) {
  const service = getAIServiceBySlug(slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-900 text-xl">Service not found.</p>
      </main>
    );
  }

  const Icon = getIcon(service.iconName);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className={`relative pt-28 pb-24 bg-linear-to-br ${service.heroGradient} overflow-hidden`}>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        {/* Glow orb */}
        <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none" style={{ background: service.accentHex }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: service.accentHex }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              {/* Breadcrumb */}
              <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/50 text-xs font-medium mb-6">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="hover:text-white transition-colors cursor-default">AI Solutions</span>
                <span>/</span>
                <span className="text-white">{service.name}</span>
              </motion.div>

              {/* Category badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: service.accentHex }} />
                {service.category}
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl xl:text-[3.4rem] font-extrabold text-white leading-[1.08] mb-5">
                {service.name}
                <span className="block mt-2 text-2xl md:text-3xl font-bold text-white/50">AI-Powered Solutions</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg">
                {service.tagline}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-7 py-3.5 rounded-full hover:shadow-2xl hover:-translate-y-0.5 transition-all group text-sm">
                  Get Free Consultation
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all text-sm">
                  Talk to Experts
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-5">
                {[{ v: "500+", l: "Projects" }, { v: "120+", l: "Clients" }, { v: "98%", l: "Satisfaction" }, { v: "6+", l: "Years" }].map(s => (
                  <div key={s.l} className="text-center">
                    <div className="text-2xl font-black text-white">{s.v}</div>
                    <div className="text-white/40 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — AI Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <AIVisual
                Icon={Icon}
                accentFrom={service.accentFrom}
                accentTo={service.accentTo}
                accentHex={service.accentHex}
                highlights={service.heroHighlights}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT / DESCRIPTION ───────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp}>
                <SectionTag label="About This Service" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5">
                  What Is{" "}
                  <span className={`bg-linear-to-r ${service.accentFrom} ${service.accentTo} bg-clip-text text-transparent`}>
                    {service.name}?
                  </span>
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">{service.description}</p>
              </motion.div>
              <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, label: "Measurable ROI" },
                  { icon: Rocket, label: "Fast Delivery" },
                  { icon: Shield, label: "Secure by Design" },
                  { icon: Layers, label: "Scalable Architecture" },
                ].map(({ icon: IcoComp, label }) => (
                  <motion.div key={label} variants={fadeUp}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all text-center"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br ${service.accentFrom} ${service.accentTo}`}>
                      <IcoComp size={18} className="text-white" />
                    </div>
                    <span className="text-slate-800 text-sm font-semibold">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── 3. CAPABILITIES / DELIVERABLES ───────────────────────────────── */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionTag label="Our Capabilities" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Everything You Get with{" "}
                <span className={`bg-linear-to-r ${service.accentFrom} ${service.accentTo} bg-clip-text text-transparent`}>
                  {service.name}
                </span>
              </h2>
              <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm">
                End-to-end capabilities designed to drive real business outcomes — not just technology for its own sake.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.deliverables.map((d, i) => {
                const DIcon = getIcon(d.iconName);
                return (
                  <motion.div key={i} variants={fadeUp}
                    className="group relative bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-md transition-all overflow-hidden"
                  >
                    <span className="absolute top-4 right-5 text-7xl font-black text-slate-100 select-none leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${service.accentFrom} ${service.accentTo} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <DIcon size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-3">{d.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{d.desc}</p>
                    <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r ${service.accentFrom} ${service.accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* ── 4. KEY FEATURES ──────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionTag label="Key Features" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Built for{" "}
                <span className={`bg-linear-to-r ${service.accentFrom} ${service.accentTo} bg-clip-text text-transparent`}>
                  Production-Grade
                </span>{" "}Performance
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.features.map((f, i) => {
                const FIcon = getIcon(f.iconName);
                return (
                  <motion.div key={i} variants={fadeUp}
                    className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mt-0.5">
                      <FIcon size={18} style={{ color: service.accentHex }} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-semibold text-sm mb-1">{f.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* ── 5. USE CASES / INDUSTRIES ────────────────────────────────────── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <SectionTag label="Use Cases" />
              <h2 className="text-3xl font-extrabold text-slate-900">
                {service.name} Across Every Industry
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.useCases.map((uc, i) => {
                const UCIcon = getIcon(uc.iconName);
                return (
                  <motion.div key={i} variants={fadeUp}
                    className="group flex gap-4 p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${service.accentFrom} ${service.accentTo} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <UCIcon size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-base mb-1">{uc.industry}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{uc.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* ── 6. WHY FYNRYX ────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionTag label="Why Fynryx" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                The Fynryx{" "}
                <span className={`bg-linear-to-r ${service.accentFrom} ${service.accentTo} bg-clip-text text-transparent`}>
                  Difference
                </span>
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Brain, title: "Deep AI Expertise", desc: "Specialists with hands-on production experience — not demo-ware consultants." },
                { icon: Layers, title: "Scalable by Design", desc: "Architecture built from day one for 10x growth — no painful rewrites later." },
                { icon: Shield, title: "Secure Architecture", desc: "Security baked in at every layer — not bolted on as an afterthought." },
                { icon: Rocket, title: "Fast Time-to-Value", desc: "Working software in your hands within weeks — not months of planning decks." },
              ].map(({ icon: WIco, title, desc }) => (
                <motion.div key={title} variants={fadeUp}
                  className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-linear-to-br ${service.accentFrom} ${service.accentTo}`}>
                    <WIco size={20} className="text-white" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-base mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── 7. TECHNOLOGY STACK ──────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <SectionTag label="Technology Stack" />
              <h2 className="text-2xl font-extrabold text-slate-900">Tools That Power Our {service.name}</h2>
            </motion.div>
            <motion.div variants={stagger} className="flex flex-wrap justify-center gap-4">
              {service.techStack.map((t) => (
                <motion.div key={t.name} variants={fadeUp}
                  className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-3 rounded-2xl hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <img src={t.logo} alt={t.name} width={28} height={28} className="object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  <span className="text-slate-700 text-sm font-semibold">{t.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── 8. WORKFLOW / PROCESS ────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <SectionTag label="Our Process" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                How We Deliver{" "}
                <span className={`bg-linear-to-r ${service.accentFrom} ${service.accentTo} bg-clip-text text-transparent`}>
                  Excellence
                </span>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute top-10 left-0 right-0 h-[2px] bg-slate-200 mx-[10%]" />
              <div className={`hidden lg:block absolute top-10 left-0 h-[2px] bg-linear-to-r ${service.accentFrom} ${service.accentTo} mx-[10%]`} style={{ width: "60%" }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {service.process.map((step, i) => {
                  const SIcon = getIcon(step.iconName);
                  return (
                    <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center">
                      <div className={`relative w-20 h-20 rounded-full bg-linear-to-br ${service.accentFrom} ${service.accentTo} flex items-center justify-center mb-5 shadow-lg z-10`}>
                        <SIcon size={26} className="text-white" />
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500 flex items-center justify-center shadow-sm">
                          {step.step}
                        </span>
                      </div>
                      <h4 className="text-slate-900 font-bold text-sm mb-2">{step.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── 9. UI SHOWCASE / DEMO ────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionTag label="Dashboard Preview" />
              <h2 className="text-3xl font-extrabold text-slate-900">
                Premium Interfaces,{" "}
                <span className={`bg-linear-to-r ${service.accentFrom} ${service.accentTo} bg-clip-text text-transparent`}>
                  Built to Convert
                </span>
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
                Every product we ship is designed for clarity, speed, and measurable business impact.
              </p>
            </motion.div>
            <motion.div variants={stagger} className="grid lg:grid-cols-3 gap-5">
              <DashboardCard
                title="Real-time Analytics"
                accentHex={service.accentHex}
                accentFrom={service.accentFrom}
                accentTo={service.accentTo}
                type="chart"
              />
              <DashboardCard
                title="AI Action Centre"
                accentHex={service.accentHex}
                accentFrom={service.accentFrom}
                accentTo={service.accentTo}
                type="chat"
              />
              <DashboardCard
                title="Automation Flows"
                accentHex={service.accentHex}
                accentFrom={service.accentFrom}
                accentTo={service.accentTo}
                type="flow"
              />
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── 10. CTA ──────────────────────────────────────────────────────── */}
      <section className={`py-24 bg-linear-to-br ${service.heroGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Section>
              <motion.div variants={fadeUp}>
                <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                  Start Your AI Journey
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                  Ready to Build Your{" "}
                  <span className="text-white/60">{service.name} Solution?</span>
                </h2>
                <p className="text-white/65 text-lg mb-8 max-w-md leading-relaxed">
                  Tell us about your project and our {service.name} specialists will respond within 24 hours with a tailored proposal.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Phone size={15} className="text-white/40 shrink-0" />
                    <span>74166-46611 | 74166-46655</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Mail size={15} className="text-white/40 shrink-0" />
                    <span>hello@fynryx.com</span>
                  </div>
                </div>
              </motion.div>
            </Section>

            <Section>
              <QuickQuoteForm 
                accentFrom={service.accentFrom} 
                accentTo={service.accentTo} 
                serviceName={service.name} 
              />
            </Section>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#07090f]">
        <div className="max-w-3xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <SectionTag label="FAQ" />
              <h2 className="text-3xl font-extrabold text-white">
                Common Questions About {service.name}
              </h2>
            </motion.div>
            <div className="flex flex-col gap-3">
              {service.faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </Section>
        </div>
      </section>


      {/* Footer handled by RootLayout */}
    </main>
  );
}

/* ─── AI Hero Visual ──────────────────────────────────────────────────────── */
function AIVisual({
  Icon,
  accentFrom,
  accentTo,
  accentHex,
  highlights,
}: {
  Icon: React.ElementType;
  accentFrom: string;
  accentTo: string;
  accentHex: string;
  highlights: string[];
}) {
  return (
    <div className="relative w-[340px] h-[340px]">
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full border opacity-20 animate-spin"
        style={{ borderColor: accentHex, animationDuration: "20s" }}
      />
      {/* Mid ring */}
      <div
        className="absolute inset-8 rounded-full border opacity-15 animate-spin"
        style={{ borderColor: accentHex, animationDuration: "14s", animationDirection: "reverse" }}
      />
      {/* Center card */}
      <div
        className="absolute inset-16 rounded-3xl flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl"
        style={{ boxShadow: `0 0 60px ${accentHex}44` }}
      >
        <Icon size={64} style={{ color: accentHex }} strokeWidth={1.2} />
      </div>

      {/* Orbit chips */}
      {highlights.slice(0, 4).map((label, i) => {
        const angle = (i / 4) * 2 * Math.PI - Math.PI / 4;
        const r = 148;
        const x = Math.cos(angle) * r + 170;
        const y = Math.sin(angle) * r + 170;
        return (
          <motion.div
            key={label}
            animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d1525] border border-white/15 text-xs font-semibold text-white shadow-xl"
            style={{ left: x - 50, top: y - 14, transform: "translateX(-50%)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accentHex }} />
            {label}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Dashboard Card (CSS mockup) ────────────────────────────────────────── */
function DashboardCard({
  title,
  accentHex,
  accentFrom,
  accentTo,
  type,
}: {
  title: string;
  accentHex: string;
  accentFrom: string;
  accentTo: string;
  type: "chart" | "chat" | "flow";
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden hover:border-white/20 transition-all group"
    >
      {/* Header bar */}
      <div className="px-5 py-3.5 border-b border-white/10 flex items-center gap-3">
        <div className="flex gap-1.5">
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span className="text-slate-400 text-xs font-semibold">{title}</span>
      </div>

      {/* Body */}
      <div className="p-5 min-h-[180px] flex flex-col gap-3">
        {type === "chart" && (
          <>
            <div className="flex items-end gap-1.5 h-20">
              {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-md bg-linear-to-t ${accentFrom} ${accentTo} opacity-${i === 7 ? "100" : "60"} transition-all`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-slate-500 text-xs">This week</span>
              <span className="text-xs font-bold" style={{ color: accentHex }}>▲ 23.4%</span>
            </div>
          </>
        )}

        {type === "chat" && (
          <>
            {[
              { sender: "user", msg: "Analyse Q3 performance" },
              { sender: "ai", msg: "Revenue up 34%, churn down 12%. Top driver: new onboarding flow." },
              { sender: "user", msg: "What should we prioritise next?" },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${
                    m.sender === "user"
                      ? `bg-linear-to-r ${accentFrom} ${accentTo} text-white`
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  {m.msg}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-1 border border-white/10 rounded-lg px-3 py-1.5">
              <span className="text-slate-600 text-[10px] flex-1">Ask AI anything...</span>
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: accentHex }}>
                <ArrowRight size={10} className="text-white" />
              </div>
            </div>
          </>
        )}

        {type === "flow" && (
          <div className="flex flex-col gap-2">
            {[
              { label: "Data Ingestion", status: "done" },
              { label: "Model Processing", status: "active" },
              { label: "Output Validation", status: "pending" },
              { label: "Result Delivery", status: "pending" },
            ].map(({ label, status }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    background: status === "done" ? accentHex : status === "active" ? `${accentHex}55` : "rgba(255,255,255,0.08)",
                    boxShadow: status === "active" ? `0 0 8px ${accentHex}88` : "none",
                  }}
                >
                  {status === "done" && <CheckCircle2 size={10} className="text-white" />}
                  {status === "active" && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </div>
                {i < 3 && (
                  <div className="absolute" style={{ display: "none" }} />
                )}
                <span className={`text-xs font-medium ${status === "done" ? "text-white" : status === "active" ? "text-white" : "text-slate-600"}`}>
                  {label}
                </span>
                {status === "active" && (
                  <span className="ml-auto text-[10px] font-bold" style={{ color: accentHex }}>Running…</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
