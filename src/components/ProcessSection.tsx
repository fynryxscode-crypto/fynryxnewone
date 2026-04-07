import { PenTool, Code, CheckCircle, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <PenTool className="w-6 h-6 text-teal-600" />,
    title: '1. Strategy & Design',
    desc: 'We define the architecture, UI/UX, and technical blueprint for your digital product.',
  },
  {
    icon: <Code className="w-6 h-6 text-teal-600" />,
    title: '2. Agile Development',
    desc: 'Our engineers build robust, scalable applications using modern frameworks in rapid sprints.',
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-teal-600" />,
    title: '3. Quality Assurance',
    desc: 'Rigorous testing is performed to guarantee security, performance, and flawless deployment.',
  },
  {
    icon: <Rocket className="w-6 h-6 text-teal-600" />,
    title: '4. Launch & Scale',
    desc: 'We deploy the application and provide ongoing maintenance to ensure long-term success.',
  }
];

export default function ProcessSection() {
  return (
    <section className="w-full py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Subtle background decorative pattern */}
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 z-0 select-none pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">Workflow</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
            How We Bring Ideas to Life
          </h3>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A proven, transparent step-by-step approach ensuring high-quality delivery on time, every time.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
               {/* Connecting Line (hidden on mobile, visible on lg) */}
               {idx !== steps.length - 1 && (
                 <div className="hidden lg:block absolute top-[2.5rem] left-[5rem] w-full h-[2px] bg-gray-100 z-0">
                    <div className="h-full bg-teal-600 w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                 </div>
               )}

               <div className="relative z-10 bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-shadow duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-6 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 [&>svg]:group-hover:text-white">
                     {step.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 font-poppins mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-base leading-relaxed flex-grow">
                    {step.desc}
                  </p>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
