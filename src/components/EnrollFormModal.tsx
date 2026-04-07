'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

interface EnrollFormModalProps {
  courseTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollFormModal({ courseTitle, isOpen, onClose }: EnrollFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use the generic 'leads' table but specifically set the service/type for filtering
      const { error } = await supabase.from('leads').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: `Enrollment: ${courseTitle}`, // Special prefix to filter training leads
        message: formData.message || `Interested in enrolling for ${courseTitle}.`,
        status: 'New',
        type: 'training', // Added for better filtering
      });

      if (error) throw error;

      // Also create a notification for the admin
      await supabase.from('notifications').insert({
        title: 'New Training Lead',
        message: `${formData.name} wants to enroll in ${courseTitle}.`,
        type: 'lead',
        is_read: false
      });

      setIsSuccess(true);
      toast.success('Enrollment request sent successfully!');
      
      // Delay closing on success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);

    } catch (err) {
      console.error('Enrollment error:', err);
      toast.error('Failed to submit enrollment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-100"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-[#09104f] border border-white/10 rounded-4xl overflow-hidden shadow-2xl relative pointer-events-auto"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div>
                   <span className="text-[#2f55ff] text-[10px] font-black uppercase tracking-[0.2em] mb-1 block">Course Enrollment</span>
                   <h3 className="text-2xl font-black text-white">{courseTitle}</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all border border-white/5"
                >
                   <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {isSuccess ? (
                  <div className="py-12 text-center">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                       <CheckCircle size={40} />
                    </div>
                    <h4 className="text-3xl font-black text-white mb-4">Application Sent!</h4>
                    <p className="text-slate-400 max-w-sm mx-auto text-lg">
                      Thank you for your interest. Our academic advisor will contact you within 24 hours to finalize your seat.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Name *</label>
                         <input 
                           type="text" 
                           required 
                           placeholder="John Doe"
                           className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#2f55ff] transition-all"
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Email Address *</label>
                         <input 
                           type="email" 
                           required 
                           placeholder="johndoe@email.com"
                           className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#2f55ff] transition-all"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                         />
                      </div>
                    </div>

                    <div>
                       <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Contact Number</label>
                       <input 
                         type="tel" 
                         placeholder="+91 XXXXX XXXXX"
                         className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#2f55ff] transition-all"
                         value={formData.phone}
                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       />
                    </div>

                    <div>
                       <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Additional Inquiry</label>
                       <textarea 
                         rows={3} 
                         placeholder="Any specific goals or current technical background..."
                         className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#2f55ff] transition-all resize-none"
                         value={formData.message}
                         onChange={(e) => setFormData({...formData, message: e.target.value})}
                       />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full bg-[#2f55ff] text-white py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-sm shadow-[0_20px_40px_-5px_rgba(47,85,255,0.3)] hover:shadow-[0_25px_45px_-5px_rgba(47,85,255,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-slate-700"
                    >
                      {isSubmitting ? (
                        <> <Loader2 size={20} className="animate-spin" /> Processing...</>
                      ) : (
                        <> Secure Spot <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> </>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                       Clicking submit agrees to our student intake policy.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
