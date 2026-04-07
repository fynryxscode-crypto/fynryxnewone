import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogsData } from '@/data/blogsData';

export default function BlogSection() {
  const blogs = blogsData.slice(0, 3);

  return (
    <section className="py-24 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between max-w-full mx-auto mb-16 gap-6">
          <div>
            <span className="text-[#2f55ff] uppercase font-bold tracking-widest text-xs mb-3 block">
              OUR BLOG
            </span>
            <h2 className="text-4xl font-bold text-slate-900">
              Latest From Our Blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-[#2f55ff] font-bold text-sm hover:gap-3 transition-all whitespace-nowrap"
          >
            View All Articles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <Link
              key={b.id}
              to={`/blog/${b.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_30px_rgb(0,0,0,0.04)] border border-gray-100 group hover:shadow-[0_12px_40px_rgba(47,85,255,0.10)] hover:-translate-y-1 transition-all duration-300 block"
            >
              <div className="h-60 w-full overflow-hidden relative">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#2f55ff] text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {b.category}
                </span>
              </div>
              <div className="p-8 pb-10 relative bg-white z-10">
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4 pb-4 border-b border-gray-50">
                  <div className="flex items-center gap-1.5"><Calendar size={13} /> {b.date}</div>
                  <div className="flex items-center gap-1.5"><Clock size={13} /> {b.readTime}</div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-[1.4] group-hover:text-[#2f55ff] transition-colors line-clamp-2">
                  {b.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {b.excerpt}
                </p>

                <span className="flex items-center gap-1.5 text-[#2f55ff] font-bold text-sm group-hover:gap-2.5 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
