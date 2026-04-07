import { Link } from "react-router-dom";
import { servicesData } from "@/data/servicesData";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Our Services | Fynryx";
  }, []);
  return (
    <main className="bg-[#05080f] min-h-screen overflow-x-hidden">
      

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            What We Do
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Services Built for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Real Impact
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From concept to deployment — end-to-end digital services engineered to drive growth, efficiency, and competitive advantage for businesses worldwide.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesData.map((service) => {
              const Icon = service.Icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Gradient accent on hover */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.accentFrom} ${service.accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accentFrom} ${service.accentTo} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon size={26} className="text-white" />
                  </div>

                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{service.category}</span>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-blue-300 transition-colors">{service.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{service.tagline}</p>

                  <div className="flex items-center gap-2 mt-6 text-slate-500 group-hover:text-blue-400 transition-colors text-sm font-semibold">
                    Learn more
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Not sure which service fits your project?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Our consultants will recommend the right solution for your goals, budget, and timeline — completely free.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all group"
          >
            Get a Free Consultation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
