'use client';

import { motion } from 'framer-motion';

export default function AppointmentSection() {
  return (
    <section className="relative bg-[#0a1f44] text-white overflow-hidden py-32 border-t-[8px] border-teal-600 rounded-tl-[100px] -mt-10 z-10">
      
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] border border-teal-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Text Side */}
        <div className="w-full md:w-1/2">
           <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 tracking-tight">
             Book Appointment <br/><span className="text-cyan-400">for free</span>
           </h2>
           
           <p className="text-teal-300 font-semibold mb-6 flex items-center gap-2">
             <span className="w-8 h-[2px] bg-teal-500 inline-block"></span>
             Schedule a meeting with our expert team.
           </p>
           
           <p className="text-slate-300 leading-relaxed max-w-lg mb-10 text-sm">
             Are you looking to enhance your digital presence? We offer customized tech solutions tailored to your unique business needs.
             Book a free consultation today, and let's explore how we can drive your success together.
           </p>
        </div>

        {/* Graphic Side */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
           whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="w-full md:w-1/2 flex justify-center"
        >
           {/* Mock calendar graphical representation */}
           <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl relative">
              <div className="text-center font-bold text-slate-800 text-xl font-poppins mb-4 border-b pb-4">September 2026</div>
              <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-slate-500 font-semibold">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-slate-700">
                 {[...Array(30)].map((_, i) => (
                    <div key={i} className={`p-2 rounded-lg cursor-pointer transition-colors ${i === 14 ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-teal-50'}`}>
                      {i + 1}
                    </div>
                 ))}
              </div>
              
              {/* Badge */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-teal-500 rounded-full flex flex-col items-center justify-center text-white shadow-xl transform rotate-12 border-4 border-[#0a1f44]">
                 <span className="font-bold font-poppins text-lg leading-none">FREE</span>
                 <span className="text-[10px] font-semibold uppercase tracking-widest">Consult</span>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
