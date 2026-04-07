
const projects = [
  {
    title: 'Fintech Mobile Bank',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Eco E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Health Tracking SaaS',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'AI Dashboard Suite',
    category: 'Software Solution',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
  }
];

export default function PortfolioSection() {
  return (
    <section className="w-full py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">Our Work</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
              Featured Projects
            </h3>
            <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
              Explore our recent case studies and see how we help businesses transform their digital presence.
            </p>
          </div>
          <div>
            <button className="px-6 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
              View All Projects
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative w-full overflow-hidden rounded-2xl bg-gray-50 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 cursor-pointer">
              {/* Image Container with fixed aspect ratio */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                />
              </div>
              
              {/* Content overlay area below image */}
              <div className="p-6 md:p-8 bg-white border-t border-gray-100">
                <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2 block">
                  {project.category}
                </span>
                <h4 className="text-2xl font-bold text-gray-900 font-poppins mb-2 group-hover:text-teal-600 transition-colors">
                  {project.title}
                </h4>
                <div className="mt-4 flex items-center text-sm font-semibold text-gray-500 group-hover:text-teal-600 transition-colors">
                  View Case Study <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
