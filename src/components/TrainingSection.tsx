'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, Users } from 'lucide-react';
import { trainingsData } from '@/data/trainingsData';
import { motion } from 'framer-motion';

import EnrollFormModal from './EnrollFormModal';

export default function TrainingSection() {
  const courses = trainingsData.slice(0, 3);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleEnrollClick = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setIsEnrollModalOpen(true);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="trainings">
      {/* Background visual flair */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#2f55ff] uppercase font-bold tracking-[0.2em] text-xs mb-4 block"
            >
              Skill Transformation
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4"
            >
              Unlock Your Potential with Our <span className="text-[#2f55ff]">Premium Bootcamps</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-lg leading-relaxed max-w-xl"
            >
              Hands-on training, expert mentorship, and industry-aligned curriculum to kickstart your tech career.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/trainings"
              className="group inline-flex items-center gap-3 bg-[#2f55ff] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
            >
              View All Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group h-full cursor-pointer"
                onClick={() => handleEnrollClick(course.title)}
              >
                <div className="bg-white rounded-4xl overflow-hidden shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-slate-100 group hover:shadow-[0_20px_60px_rgba(47,85,255,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative">
                  <div className="p-10 flex-1">
                    {/* Course Category Badge */}
                    <div className="flex justify-between items-center mb-10">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                        style={{ backgroundColor: `${course.color}15`, color: course.color }}
                      >
                        <Icon size={26} />
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="flex items-center gap-1 text-amber-400 mb-1">
                            {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.level} Level</span>
                      </div>
                    </div>

                    <span className="text-[#2f55ff] text-[11px] font-black uppercase tracking-[0.2em] mb-3 block">
                      {course.category} Certification
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-[#2f55ff] transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-slate-500 text-[15px] leading-relaxed mb-8 line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Quick Info */}
                  <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-5">
                       <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                          <Clock size={14} className="text-[#2f55ff]" />
                          {course.duration}
                       </div>
                       <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                          <Users size={14} className="text-[#2f55ff]" />
                          Live Batch
                       </div>
                    </div>
                    <ArrowRight size={18} className="text-[#2f55ff] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust bar */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.6 }}
           className="mt-20 py-8 border-y border-slate-100 flex flex-wrap justify-center items-center gap-x-16 gap-y-6"
        >
           <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mr-4">Trusted by Talent from</p>
           {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'].map(brand => (
             <span key={brand} className="text-slate-300 text-lg font-black tracking-tighter opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">{brand}</span>
           ))}
        </motion.div>

      </div>

      <EnrollFormModal 
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        courseTitle={selectedCourse}
      />
    </section>
  );
}
