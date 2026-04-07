import {
  Globe,
  MonitorSmartphone,
  BrainCircuit,
  Palette,
  Megaphone,
  Puzzle,
  MapPin,
  Users,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Globe,
    number: "01",
    title: "Web Development",
    desc: "High-performance websites and web apps built with React, Next.js, Node.js, and Laravel — optimized for speed, SEO, and conversions.",
    tags: ["React", "Next.js", "Node.js"],
    href: "/services/web-development",
    gradient: "from-blue-500 to-cyan-400",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: MonitorSmartphone,
    number: "02",
    title: "Mobile App Development",
    desc: "Native iOS, Android, and cross-platform Flutter apps with intuitive UX and scalable architecture.",
    tags: ["Flutter", "iOS", "Android"],
    href: "/services/flutter-app-development",
    gradient: "from-violet-500 to-purple-400",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: BrainCircuit,
    number: "03",
    title: "AI & ML Development",
    desc: "Intelligent automation, NLP, computer vision, predictive analytics, and LLM-powered product integrations.",
    tags: ["LLM", "NLP", "Automation"],
    href: "/services/ai-ml-development",
    gradient: "from-emerald-500 to-teal-400",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: Palette,
    number: "04",
    title: "UI/UX Design",
    desc: "Research-driven design systems, wireframes, and pixel-perfect prototypes built in Figma and Adobe XD.",
    tags: ["Figma", "Prototyping", "Design System"],
    href: "/services/ui-ux-development",
    gradient: "from-pink-500 to-rose-400",
    glow: "group-hover:shadow-pink-500/20",
  },
  {
    icon: Megaphone,
    number: "05",
    title: "Digital Marketing",
    desc: "Data-driven SEO, PPC, social media campaigns, and content strategies that drive qualified traffic and leads.",
    tags: ["SEO", "PPC", "Social Media"],
    href: "/services/digital-marketing",
    gradient: "from-orange-500 to-amber-400",
    glow: "group-hover:shadow-orange-500/20",
  },
  {
    icon: Puzzle,
    number: "06",
    title: "Chrome Extension Dev",
    desc: "Custom browser extensions for productivity, automation, web scraping, and CRM integrations.",
    tags: ["Browser API", "Automation"],
    href: "/services/chrome-extension-development",
    gradient: "from-sky-500 to-blue-400",
    glow: "group-hover:shadow-sky-500/20",
  },
  {
    icon: MapPin,
    number: "07",
    title: "GPS Vehicle Tracking",
    desc: "Real-time fleet management systems with live tracking, route optimization, and driver analytics.",
    tags: ["Real-time", "Fleet", "Maps"],
    href: "/services/gps-vehicle-tracking",
    gradient: "from-lime-500 to-green-400",
    glow: "group-hover:shadow-lime-500/20",
  },
  {
    icon: Users,
    number: "08",
    title: "IT Staffing",
    desc: "Dedicated developers, QA engineers, and tech talent on demand — onboarded in days, not months.",
    tags: ["Dedicated Teams", "Remote"],
    href: "/services/it-staffing",
    gradient: "from-indigo-500 to-blue-400",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    icon: ShieldCheck,
    number: "09",
    title: "Cybersecurity",
    desc: "Penetration testing, vulnerability assessments, and secure architecture reviews to protect your infrastructure.",
    tags: ["Pen Testing", "Security Audit"],
    href: "/services",
    gradient: "from-red-500 to-rose-400",
    glow: "group-hover:shadow-red-500/20",
  },
  {
    icon: LayoutDashboard,
    number: "10",
    title: "CRM / HRM Systems",
    desc: "Custom enterprise platforms for sales pipelines, HR workflows, and operations built to scale with your business.",
    tags: ["CRM", "HRM", "Enterprise"],
    href: "/services",
    gradient: "from-fuchsia-500 to-pink-400",
    glow: "group-hover:shadow-fuchsia-500/20",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-28 bg-[#05080f] overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
                What We Do
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Services Built for{" "}
              <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Real Impact
              </span>
            </h2>
            <p className="mt-4 text-slate-400 text-base max-w-xl leading-relaxed">
              From concept to deployment — we deliver end-to-end technology
              solutions that drive growth, efficiency, and competitive advantage.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              View All Services
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <Link
                  to={service.href}
                  className={`group relative flex flex-col h-full p-7 bg-[#080c18] hover:bg-[#0c1120] transition-all duration-300 overflow-hidden ${service.glow} hover:shadow-2xl`}
                >
                  <span className="absolute top-4 right-4 text-7xl font-black text-white/3 select-none leading-none">
                    {service.number}
                  </span>

                  <div
                    className={`w-12 h-12 rounded-2xl bg-linear-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>

                  <span className="text-[11px] font-bold text-slate-500 tracking-widest mb-2">
                    {service.number}
                  </span>

                  <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 text-[13px] leading-relaxed flex-1">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5 group-hover:border-white/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-slate-600 group-hover:text-blue-400 transition-colors text-xs font-semibold">
                    Learn more
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats Strip */}
        <div className="mt-16 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {[
            { value: "500+", label: "Projects Delivered" },
            { value: "120+", label: "Happy Clients" },
            { value: "10+", label: "Services Offered" },
            { value: "6+", label: "Years of Excellence" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#080c18] px-8 py-6 flex flex-col items-center text-center"
            >
              <span className="text-3xl font-black bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-slate-500 text-xs font-medium mt-1 tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
