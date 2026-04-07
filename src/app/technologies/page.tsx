import { Link } from "react-router-dom";
import { technologiesData } from "@/data/technologiesData";
import TechGrid from "@/components/TechGrid";
import { useEffect } from "react";

const CATEGORY_ORDER = [
  "Frontend Framework",
  "Mobile Development",
  "Backend Development",
  "Backend & AI/ML",
  "Cloud Infrastructure",
  "Database",
  "Data Engineering",
  "UI/UX Design",
  "Creative Design",
  "Full-Stack Development",
];

export default function TechnologiesPage() {
  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof technologiesData>>(
    (acc, cat) => {
      const items = technologiesData.filter((t) => t.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    },
    {}
  );

  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#05080f] via-[#0c1432] to-[#05080f] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Our Tech Stack
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Technologies We{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Master
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We employ the latest, battle-tested tech stacks to ensure your products are
            fast, secure, and built to scale — from frontend to cloud infrastructure.
          </p>
        </div>
      </section>

      {/* Tech Grid by Category — isolated in client component for onError handler */}
      <section className="py-20">
        <TechGrid grouped={grouped} />
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Not sure which technology fits your project?
          </h2>
          <p className="text-white/70 mb-8">
            Our architects will recommend the best tech stack for your specific goals, budget, and timeline.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Get a Free Tech Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
