import { ArrowRight, CheckCircle2, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const clientsData = [
  { id: 1, name: "Cloudways", logoUrl: "/portfolio/1.jpg" },
  { id: 2, name: "Microsoft", logoUrl: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
  { id: 3, name: "HubSpot", logoUrl: "https://cdn.worldvectorlogo.com/logos/hubspot.svg" },
  { id: 4, name: "Walmart", logoUrl: "https://cdn.worldvectorlogo.com/logos/walmart.svg" },
  { id: 5, name: "Target", logoUrl: "https://cdn.worldvectorlogo.com/logos/target-7.svg" },
  { id: 6, name: "Amazon", logoUrl: "https://cdn.worldvectorlogo.com/logos/amazon-dark.svg" },
  { id: 7, name: "Intel", logoUrl: "https://cdn.worldvectorlogo.com/logos/intel-3.svg" },
  { id: 8, name: "IBM", logoUrl: "https://cdn.worldvectorlogo.com/logos/ibm.svg" },
  { id: 9, name: "Oracle", logoUrl: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg" },
  { id: 10, name: "Cisco", logoUrl: "https://cdn.worldvectorlogo.com/logos/cisco-2.svg" }
];

// Duplicate for seamless infinite scrolling
const marqueeClients = [...clientsData, ...clientsData, ...clientsData];

export default function AboutSection() {
  return (
    <section className="py-0 bg-white relative overflow-hidden" id="about">
      
      {/* INFINITE SCROLLING CLIENTS MARQUEE (Top) */}
      <div className="w-full bg-slate-50 border-y border-gray-100 py-12 mb-24 overflow-hidden flex relative">
        {/* Fading Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-20 items-center whitespace-nowrap px-4 animate-marquee">
          {marqueeClients.slice(0, 20).map((client, idx) => (
            <div key={`${client.id}-${idx}`} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 min-w-[140px] relative h-10">
                <img 
                  src={client.logoUrl} 
                  alt={`${client.name} Logo`} 
                  className="object-contain w-full h-full" 
                  draggable="false"
                  loading="lazy"
                />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        
        {/* LEFT COLUMN: Content */}
        <div className="order-2 lg:order-1 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#2f55ff] font-bold text-xs mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#2f55ff] animate-pulse" />
            ABOUT OUR COMPANY
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-8 tracking-tight">
            Offer The Latest Software And <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2f55ff] to-cyan-500">Solutions</span>
          </h2>

          <p className="text-gray-600 text-[17px] leading-relaxed mb-8">
            At Fynryx, we craft highly engaging, scalable, and performance-driven technological solutions tailored to meet the evolving demands of global enterprises.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-100">
               <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                 <CheckCircle2 size={24} />
               </div>
               <div>
                 <h4 className="font-bold text-slate-900 text-[16px] mb-1">Tailored Development</h4>
                 <p className="text-gray-500 text-sm leading-snug">Custom software built for scale.</p>
               </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-100">
               <div className="w-12 h-12 rounded-xl bg-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
                 <Award size={24} />
               </div>
               <div>
                 <h4 className="font-bold text-slate-900 text-[16px] mb-1">Award-Winning UI</h4>
                 <p className="text-gray-500 text-sm leading-snug">Interfaces that convert.</p>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="#services" className="group inline-flex items-center gap-3 px-8 py-4 bg-[#2f55ff] hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-1">
              Read More
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100">
                    <img src={`https://i.pravatar.cc/100?img=${i}`} alt={`Fynryx client profile ${i}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-sm">4.9/5 Rating</span>
                <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">500+ Clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Heavy Composed Images */}
        <div className="order-1 lg:order-2 relative animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10">
             <img 
               src="/about-main.jpeg" 
               alt="Fynryx Design Innovate Transform" 
               className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
               loading="lazy"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>

          <div className="absolute -bottom-10 -left-6 md:-left-16 w-48 md:w-64 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20 hidden sm:block bg-slate-100 animate-slide-up" style={{ animationDelay: '500ms' }}>
             <img 
               src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
               alt="Data analysis team meeting" 
               className="w-full h-full object-cover"
               loading="lazy"
             />
          </div>

          <div className="absolute top-10 -right-6 md:-right-10 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 flex flex-col items-center justify-center z-30 min-w-[140px]">
             <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-500/20">
                <Users size={22} />
             </div>
             <span className="text-3xl font-black text-slate-900 leading-none mb-1">10+</span>
             <span className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">Years Exp.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
