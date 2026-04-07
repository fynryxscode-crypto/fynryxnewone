'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trainingsData } from '@/data/trainingsData';
import { Calendar, Clock, ArrowRight, Star, CheckCircle2, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

import EnrollFormModal from '@/components/EnrollFormModal';

export default function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleEnrollClick = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setIsEnrollModalOpen(true);
  };

  const categories = ['All', 'Design', 'Development', 'Marketing', 'Cloud', 'Security'];

  const filtered = trainingsData.filter((course) => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#050b14] w-full overflow-x-hidden font-sans">
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[5%] w-96 h-96 bg-[#2f55ff]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-[5%] w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] opacity-10 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-[#2f55ff] text-sm font-bold uppercase tracking-[0.3em] mb-6 px-6 py-2 rounded-full border border-[#2f55ff]/30 bg-[#2f55ff]/10 backdrop-blur-md"
            >
              Fynryx Tech Academy
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight"
            >
              Master the <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-[#2f55ff] to-cyan-400">
                Future of Tech
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
            >
              Industry-led immersive bootcamps designed to transform beginners into 
              world-class professionals. Start your transformation journey today.
            </motion.p>

            {/* Global Search */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className="relative max-w-2xl mx-auto mb-16"
            >
              <div className="absolute inset-0 bg-[#2f55ff]/20 blur-2xl rounded-3xl" />
              <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-2xl">
                <Search size={22} className="ml-6 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Search for a course (e.g. UX/UI, Cyber Security...)"
                  className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-5 py-5 text-lg font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="hidden sm:block bg-[#2f55ff] text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all mr-1 shadow-lg shadow-blue-500/20 active:scale-95">
                  Search
                </button>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="flex flex-wrap justify-center gap-3"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 border backdrop-blur-sm ${
                    activeCategory === cat
                      ? 'bg-[#2f55ff] border-[#2f55ff] text-white shadow-xl shadow-blue-500/20 scale-105'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((course, idx) => {
                const Icon = course.icon;
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative"
                  >
                    {/* Glowing Backlight */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#2f55ff]/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 hover:border-[#2f55ff]/30 transition-all duration-500 flex flex-col group-hover:bg-white/[0.07]">
                      {/* Course Icon Header */}
                      <div className="flex justify-between items-start mb-10">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                          style={{ 
                            backgroundColor: `${course.color}20`,
                            border: `1px solid ${course.color}40`,
                            boxShadow: `0 8px 24px -6px ${course.color}40`
                          }}
                        >
                          <Icon size={30} style={{ color: course.color }} />
                        </div>
                        <span className="bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-300">
                          {course.level}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                         <span className="text-[#2f55ff] text-[10px] font-black uppercase tracking-[0.2em] mb-3 block">
                            {course.category} Certification
                         </span>
                         <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#2f55ff] transition-colors">
                            {course.title}
                         </h3>
                         <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                            {course.description}
                         </p>
                      </div>

                      {/* Footer Details */}
                      <div className="pt-8 mt-auto border-t border-white/10 flex items-center justify-between">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Duration</span>
                            <div className="flex items-center gap-2 text-white font-bold text-sm">
                               <Clock size={14} className="text-[#2f55ff]" />
                               {course.duration}
                            </div>
                         </div>
                         
                         <button 
                           onClick={() => handleEnrollClick(course.title)}
                           className="w-12 h-12 rounded-full bg-[#2f55ff] text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-blue-500/20 active:scale-95 group/btn"
                         >
                            <ArrowRight size={20} className="group-hover/btn:translate-x-0.5 transition-transform" />
                         </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-40 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-sm">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No courses found matching your criteria.</h3>
              <p className="text-gray-400 mb-10">Try a different search term or explore all categories.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="bg-[#2f55ff] text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-linear-to-b from-transparent to-[#0a1628]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="relative rounded-[3rem] overflow-hidden bg-linear-to-r from-[#2f55ff] to-cyan-500 p-16 md:p-24 text-center border border-white/20">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to Elevate Your Career?</h2>
                  <p className="text-blue-50 text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto">
                    Enroll now and get 25% off on your first course. Join over 5,000+ students already mastering the tech world.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                     <button 
                        onClick={() => handleEnrollClick('General Inquiry')}
                        className="w-full sm:w-auto bg-white text-[#2f55ff] px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl active:scale-95"
                     >
                        Enroll Now
                     </button>
                     <button className="w-full sm:w-auto bg-black/20 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-black/30 transition-all active:scale-95">
                        Download Syllabus
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <EnrollFormModal 
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        courseTitle={selectedCourse}
      />
    </main>
  );
}
