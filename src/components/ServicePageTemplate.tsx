"use client";

import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Phone, Mail, Star, TrendingUp,
} from "lucide-react";
// Standard img tags for Vite
import QuickQuoteForm from "@/components/QuickQuoteForm";
import { getServiceBySlug } from "@/data/servicesData";
import type { ServiceData } from "@/data/servicesData";

/* ── animation presets ─────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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

/* ── FAQ accordion ─────────────────────────────────────────── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} className="border border-slate-200 rounded-2xl overflow-hidden">
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

/* ── Pricing Tier ──────────────────────────────────────────── */
function PricingTier({
  label, badge, features, highlighted, accentFrom, accentTo,
}: {
  label: string; badge: string; features: string[]; highlighted: boolean;
  accentFrom: string; accentTo: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative rounded-3xl p-8 border flex flex-col gap-6 transition-all ${
        highlighted
          ? `bg-linear-to-br ${accentFrom} ${accentTo} border-transparent shadow-2xl scale-[1.02]`
          : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-md"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-4 py-1 rounded-full shadow-md">
          Most Popular
        </div>
      )}
      <div>
        <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${highlighted ? "text-white/70" : "text-slate-400"}`}>{badge}</p>
        <h4 className={`text-2xl font-extrabold ${highlighted ? "text-white" : "text-slate-900"}`}>{label}</h4>
        <p className={`text-sm mt-1 ${highlighted ? "text-white/70" : "text-slate-400"}`}>Contact us for pricing</p>
      </div>
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm ${highlighted ? "text-white/90" : "text-slate-600"}`}>
            <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${highlighted ? "text-white" : "text-blue-500"}`} />
            {f}
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all group ${
          highlighted
            ? "bg-white text-slate-900 hover:shadow-lg hover:-translate-y-0.5"
            : `border-2 border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600`
        }`}
      >
        Get a Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */
export default function ServicePageTemplate({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug) as ServiceData | undefined;
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Service Not Found</h1>
          <p className="text-slate-500 mb-8">The service you are looking for does not exist or has been moved.</p>
          <Link to="/#services" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.Icon;

  const pricingTiers = [
    {
      label: "Starter",
      badge: "For small projects",
      highlighted: false,
      features: [
        "Core feature development",
        "1 platform / channel",
        "Basic integrations (1–2)",
        "QA & bug fixing",
        "30-day post-launch support",
        "Weekly progress updates",
      ],
    },
    {
      label: "Professional",
      badge: "Most popular",
      highlighted: true,
      features: [
        "Full-feature development",
        "Multi-platform delivery",
        "Advanced integrations (up to 5)",
        "Performance optimisation",
        "60-day post-launch support",
        "Dedicated project manager",
        "Source code ownership",
        "Priority bug resolution",
      ],
    },
    {
      label: "Enterprise",
      badge: "For scale",
      highlighted: false,
      features: [
        "Custom scope & architecture",
        "Unlimited integrations",
        "Dedicated team assignment",
        "SLA-backed support (24/7)",
        "Security & compliance audit",
        "Custom reporting & analytics",
        "Quarterly strategy reviews",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className={`relative pt-28 pb-24 bg-linear-to-br ${service.heroGradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/50 text-xs font-medium mb-6">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                <span>/</span>
                <span className="text-white">{service.name}</span>
              </motion.div>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {service.category}
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl xl:text-[3.4rem] font-extrabold text-white leading-[1.08] mb-5">
                {service.name}
                <span className="block mt-2 text-2xl md:text-3xl font-bold text-white/50">Development Services</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg">
                {service.tagline}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-7 py-3.5 rounded-full hover:shadow-2xl hover:-translate-y-0.5 transition-all group text-sm">
                  Get Free Consultation
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/projects" className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all text-sm">
                  View Portfolio
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-5">
                {[{ v: "500+", l: "Projects" }, { v: "120+", l: "Clients" }, { v: "98%", l: "Satisfaction" }, { v: "6+", l: "Years" }].map(s => (
                  <div key={s.l} className="text-center">
                    <div className="text-2xl font-black text-white">{s.v}</div>
                    <div className="text-white/40 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Animated deliverable mosaic */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-3"
            >
              <div className="col-span-2 flex justify-center mb-2">
                <div className={`w-20 h-20 rounded-3xl bg-linear-to-br ${service.accentFrom} ${service.accentTo} flex items-center justify-center shadow-2xl`}>
                  <Icon size={38} className="text-white" />
                </div>
              </div>
              {service.heroHighlights.map((hl, i) => (
                <motion.div
                  key={hl}
                  animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                  transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3 ${i === 4 ? "col-span-2" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-xl bg-linear-to-br ${service.accentFrom} ${service.accentTo} flex items-center justify-center shrink-0`}>
                    <Star size={13} className="text-white fill-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">{hl}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionTag label="What's Included" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Everything You Get with{" "}
                <span className={`bg-linear-to-r ${service.accentFrom} ${service.accentTo} bg-clip-text text-transparent`}>
                  {service.name}
                </span>
              </h2>
              <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm">{service.description}</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.deliverables.map((d, i) => {
                const DIcon = d.icon;
                return (
                  <motion.div key={i} variants={fadeUp}
                    className="group relative bg-white border border-slate-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-md transition-all overflow-hidden"
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

      {/* ── OUR PROCESS ───────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <SectionTag label="Our Process" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                How We Deliver <span className={`bg-linear-to-r ${service.accentFrom} ${service.accentTo} bg-clip-text text-transparent`}>Excellence</span>
              </h2>
            </motion.div>
            <div className="relative">
              <div className="hidden lg:block absolute top-10 left-0 right-0 h-[2px] bg-slate-200 mx-[10%]" />
              <div className={`hidden lg:block absolute top-10 left-0 h-[2px] bg-linear-to-r ${service.accentFrom} ${service.accentTo} mx-[10%]`} style={{ width: "60%" }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {service.process.map((step, i) => {
                  const SIcon = step.icon;
                  return (
                    <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center lg:items-center">
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

      {/* ── INDUSTRIES WE SERVE ───────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <SectionTag label="Industries We Serve" />
              <h2 className="text-3xl font-extrabold text-slate-900">
                {service.name} Across Every Vertical
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {service.industries.map((ind, i) => {
                const IndIcon = ind.icon;
                return (
                  <motion.div key={i} variants={fadeUp}
                    className="group flex flex-col items-center gap-3 p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all cursor-default"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${service.accentFrom} ${service.accentTo} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IndIcon size={22} className="text-white" />
                    </div>
                    <span className="text-slate-700 text-sm font-semibold text-center">{ind.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────── */}
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
                  <img
                    src={t.logo}
                    alt={t.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                  <span className="text-slate-700 text-sm font-semibold">{t.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ─────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <SectionTag label="Portfolio" />
                <h2 className="text-3xl font-extrabold text-slate-900">Projects We've Delivered</h2>
              </div>
              <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors group shrink-0">
                View All Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {service.portfolio.map((p, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="group bg-white border border-slate-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full bg-linear-to-r ${service.accentFrom} ${service.accentTo} text-white mb-5`}>
                    {p.tag}
                  </span>
                  <h3 className="text-slate-900 font-bold text-base mb-4">{p.title}</h3>
                  <div className={`flex items-center gap-3 bg-linear-to-r ${service.accentFrom} ${service.accentTo} rounded-xl p-4 mb-5`}>
                    <TrendingUp size={20} className="text-white shrink-0" />
                    <div>
                      <div className="text-2xl font-black text-white leading-none">{p.metric}</div>
                      <div className="text-white/70 text-xs mt-0.5">{p.metricLabel}</div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── PRICING TIERS ─────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionTag label="Pricing" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Transparent, Flexible Pricing
              </h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                All engagements are custom-quoted. Contact us for an exact estimate tailored to your project scope.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {pricingTiers.map((tier) => (
                <PricingTier key={tier.label} {...tier} accentFrom={service.accentFrom} accentTo={service.accentTo} />
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <SectionTag label="FAQ" />
              <h2 className="text-3xl font-extrabold text-slate-900">
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

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className={`py-24 bg-linear-to-br ${service.heroGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Section>
              <motion.div variants={fadeUp}>
                <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                  Start Your Project
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                  Ready to Build Your{" "}
                  <span className="text-white/60">{service.name} Solution?</span>
                </h2>
                <p className="text-white/65 text-lg mb-8 max-w-md leading-relaxed">
                  Tell us about your project and our {service.name} specialists will get back to you within 24 hours with a tailored proposal.
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


      {/* Footer is handled by RootLayout */}
    </main>
  );
}
