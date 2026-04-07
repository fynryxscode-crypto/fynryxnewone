import { ArrowRight, Star } from 'lucide-react';

export default function WhyUsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background shape for the left side */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-[#f4f7fe] -z-10 hidden lg:block rounded-br-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
          <span className="text-[#2f55ff] uppercase font-bold tracking-widest text-xs mb-3 block">
            PROOF OF FACT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.2] mb-6">
            Trusted by 5,000+ <br /> Happy Customers
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Our commitment is to leverage technology for tangible robust results.
            Our proven track record showcases excellence that continues to 
            power modern businesses around the globe today.
          </p>

          <div className="flex items-center gap-10 mb-10">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10k+</div>
              <div className="text-sm font-semibold text-gray-400">Successful Works</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">99%</div>
              <div className="text-sm font-semibold text-gray-400">Happy Clients</div>
            </div>
          </div>

          <button className="px-8 py-3.5 bg-[#2f55ff] hover:bg-blue-600 text-white rounded-md font-semibold text-[15px] shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
            View All Customers
          </button>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div 
            className="w-full h-[550px] bg-cover bg-center rounded-lg shadow-xl"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80")' }}
          ></div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] hidden sm:block border border-gray-100 border-t-4 border-t-[#2f55ff]">
            <div className="flex items-center gap-4">
               <div>
                  <div className="text-4xl font-bold text-[#2f55ff]">875<span className="text-xl">+</span></div>
                  <div className="text-sm text-gray-500 font-medium">Happy Customers</div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
