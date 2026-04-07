import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';

export default function ProjectsPage() {
  return (
    <main className="bg-white min-h-screen pt-20">
      
      <div className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins text-slate-900 mb-6">Our Work</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover how we have helped diverse businesses achieve their digital goals through custom technology solutions.
          </p>
        </div>
      </div>

      <PortfolioSection />
      
      <ContactSection />
    </main>
  );
}
