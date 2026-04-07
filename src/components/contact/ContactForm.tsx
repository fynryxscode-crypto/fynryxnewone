'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const SERVICES = [
  'Mobile App Development',
  'Web Platform Engineering',
  'AI & Machine Learning',
  'UI/UX Product Design',
  'Cloud Infrastructure',
  'Blockchain Solutions',
  'IT Staff Augmentation',
  'Digital Transformation'
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full identity required';
    if (!form.email.trim()) e.email = 'Secure email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid protocol format';
    if (!form.message.trim()) e.message = 'Project roadmap required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      // Direct integration with Supabase Leads table
      const { error: leadErr } = await supabase.from('leads').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        service: form.service || 'General Inquiry',
        message: form.message.trim(),
        status: 'New'
      });

      if (leadErr) throw leadErr;

      // Real-time notification log
      await supabase.from('notifications').insert({
        title: 'New Enterprise Lead',
        message: `${form.name} initiated contact for ${form.service || 'General Consultation'}.`,
        type: 'lead',
        is_read: false
      });

      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error('Submission failure:', err);
      setStatus('error');
    }
  };

  const inputClasses = (key: string) => `
    w-full bg-white/5 border px-6 py-4 rounded-2xl text-white font-medium placeholder:text-slate-500
    transition-all duration-500 outline-none backdrop-blur-xl group
    ${errors[key] ? 'border-red-500/50 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(37,99,235,0.1)]'}
  `;

  return (
    <div className="relative group">
       {/* Decorative Glow */}
       <div className="absolute -inset-4 bg-linear-to-r from-blue-600/20 to-indigo-600/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
       
       <div className="relative bg-slate-900/50 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                 <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                    <CheckCircle2 size={48} className="text-blue-400" />
                 </div>
                 <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Mission Initialized</h3>
                 <p className="text-slate-400 text-lg mb-10 max-w-xs mx-auto italic">
                   "We have received your transmissions. Our architectural team will analyze your roadmap and reach out within 12 hours."
                 </p>
                 <button 
                   onClick={() => setStatus('idle')}
                   className="px-10 py-4 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform active:scale-95"
                 >
                   Send Another Transmission
                 </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                       <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                       <input 
                         type="text" 
                         placeholder="Full Name Name" 
                         className={`${inputClasses('name')} pl-14`}
                         value={form.name}
                         onChange={(e) => { setForm({...form, name: e.target.value}); setErrors({...errors, name: ''}); }}
                       />
                       {errors.name && <span className="text-[10px] text-red-400 font-bold ml-4 mt-1 block">{errors.name}</span>}
                    </div>
                    <div className="relative">
                       <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                       <input 
                         type="email" 
                         placeholder="Business Email" 
                         className={`${inputClasses('email')} pl-14`}
                         value={form.email}
                         onChange={(e) => { setForm({...form, email: e.target.value}); setErrors({...errors, email: ''}); }}
                       />
                       {errors.email && <span className="text-[10px] text-red-400 font-bold ml-4 mt-1 block">{errors.email}</span>}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                       <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                       <input 
                         type="tel" 
                         placeholder="Phone Number (Optional)" 
                         className={`${inputClasses('phone')} pl-14`}
                         value={form.phone}
                         onChange={(e) => setForm({...form, phone: e.target.value})}
                       />
                    </div>
                    <div className="relative group/sel">
                       <Sparkles size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                       <select 
                         className={`${inputClasses('service')} pl-14 appearance-none cursor-pointer text-slate-400 font-bold`}
                         value={form.service}
                         onChange={(e) => setForm({...form, service: e.target.value})}
                       >
                          <option value="" disabled>Select Expertise Area</option>
                          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                       <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-focus-within/sel:rotate-180 transition-transform" />
                    </div>
                 </div>

                 <div className="relative">
                    <MessageSquare size={18} className="absolute left-6 top-6 text-slate-500 pointer-events-none" />
                    <textarea 
                      placeholder="Tell us about your digital legacy..." 
                      className={`${inputClasses('message')} pl-14 min-h-[160px] pt-6 resize-none`}
                      value={form.message}
                      onChange={(e) => { setForm({...form, message: e.target.value}); setErrors({...errors, message: ''}); }}
                    />
                    {errors.message && <span className="text-[10px] text-red-400 font-bold ml-4 mt-1 block">{errors.message}</span>}
                 </div>

                 {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-red-500/10 border border-red-500/20 p-4 rounded-4xl flex items-center gap-3"
                    >
                       <XCircle size={18} className="text-red-400" />
                       <span className="text-red-400 text-sm font-bold">Transmission Interrupted. Check your network or contact support.</span>
                    </motion.div>
                 )}

                 <button 
                   type="submit"
                   disabled={status === 'loading'}
                   className="w-full relative group/btn overflow-hidden rounded-[2rem] bg-linear-to-r from-blue-700 via-blue-600 to-indigo-600 disabled:opacity-50"
                 >
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    <div className="relative px-8 py-5.5 flex items-center justify-center gap-4 text-white font-black uppercase tracking-[0.2em] text-[13px]">
                       {status === 'loading' ? (
                          <><Loader2 className="animate-spin" size={20} /> Synchronizing...</>
                       ) : (
                          <><Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /> Launch Your Project</>
                       )}
                    </div>
                 </button>
              </motion.form>
            )}
          </AnimatePresence>
       </div>
    </div>
  );
}
