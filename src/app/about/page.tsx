import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AboutHero from '@/components/about/AboutHero';
import AboutContent from '@/components/about/AboutContent';
import AboutClientSections from '@/components/about/AboutClientSections';



export default function AboutPage() {
  return (
    <main className="bg-[#020617] min-h-screen overflow-hidden font-sans">
      <AboutHero />
      <AboutContent />

      {/* ssr:false sections isolated in a client component */}
      <AboutClientSections />

      {/* Static CTA — no client JS needed */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative p-16 lg:p-24 rounded-[4rem] bg-linear-to-r from-[#2f55ff] to-blue-700 overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
                Let&apos;s Build the <br />
                <span className="opacity-60 text-black">Future</span> Together.
              </h2>
              <p className="text-blue-100 text-lg lg:text-xl font-medium">
                Join a global ecosystem of innovators and creators. Whether you&apos;re an enterprise client or a visionary engineer, our squad is ready to integrate.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-6 shrink-0">
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-700 rounded-3xl font-black text-[15px] transition-all hover:bg-slate-50 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] active:scale-95"
              >
                Connect Today
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
