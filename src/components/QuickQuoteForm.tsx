'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface QuickQuoteFormProps {
  accentFrom: string;
  accentTo: string;
  serviceName: string;
}

export default function QuickQuoteForm({ accentFrom, accentTo, serviceName }: QuickQuoteFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus('loading');
    try {
      // 1. Store Lead
      const { error: leadErr } = await supabase.from('leads').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        service: serviceName,
        message: `Budget: ${form.budget || 'N/A'}\n\n${form.message.trim()}`,
        status: 'New',
        type: 'quote',
        budget: form.budget || null,
      });
      if (leadErr) throw leadErr;

      // 2. Store Notification
      await supabase.from('notifications').insert({
        title: 'New Service Inquiry',
        message: `${form.name} requested a quote for ${serviceName}.`,
        type: 'lead',
        is_read: false,
      });

      setStatus('success');
      setForm({ name: '', email: '', phone: '', budget: '', message: '' });
    } catch (err) {
      console.error('Quote submit error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-10 shadow-2xl text-center border border-slate-100"
      >
        <div className={`w-20 h-20 rounded-full bg-linear-to-br ${accentFrom} ${accentTo} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
           <CheckCircle2 size={40} className="text-white" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Inquiry Received!</h3>
        <p className="text-slate-500 text-sm mb-8">
          Thank you for reaching out. Our solution architects are already reviewing your requirements.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className={`w-full py-4 rounded-xl font-bold bg-linear-to-r ${accentFrom} ${accentTo} text-white hover:shadow-lg transition-transform active:scale-95`}
        >
          Send Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative group">
      <div className={`h-1.5 w-16 rounded-full bg-linear-to-r ${accentFrom} ${accentTo} mb-8`} />
      <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Get a Free Quote</h3>
      <p className="text-slate-400 text-xs font-semibold mb-8 uppercase tracking-widest">Connect with our Lead Architects</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            required
            className="px-5 py-4 rounded-2xl border border-slate-100 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 bg-slate-50 transition-all font-medium"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Work Email" 
            required
            className="px-5 py-4 rounded-2xl border border-slate-100 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 bg-slate-50 transition-all font-medium"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input 
            type="tel" 
            placeholder="Phone (Optional)" 
            className="px-5 py-4 rounded-2xl border border-slate-100 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 bg-slate-50 transition-all font-medium"
            value={form.phone}
            onChange={(e) => setForm({...form, phone: e.target.value})}
          />
          <select 
            className="px-5 py-4 rounded-2xl border border-slate-100 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 bg-slate-50 text-slate-600 transition-all font-medium appearance-none cursor-pointer"
            value={form.budget}
            onChange={(e) => setForm({...form, budget: e.target.value})}
          >
            <option value="">Select Budget Range</option>
            <option>Under ₹1 Lakh</option>
            <option>₹1L – ₹5L</option>
            <option>₹5L – ₹15L</option>
            <option>₹15L+</option>
          </select>
        </div>

        <textarea 
          placeholder={`Describe your ${serviceName} requirements...`} 
          required
          rows={3} 
          className="w-full px-5 py-4 rounded-2xl border border-slate-100 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 bg-slate-50 resize-none transition-all font-medium"
          value={form.message}
          onChange={(e) => setForm({...form, message: e.target.value})}
        />

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className={`group w-full bg-linear-to-r ${accentFrom} ${accentTo} text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50`}
        >
          {status === 'loading' ? (
            <><Loader2 className="animate-spin" size={18} /> Processing...</>
          ) : (
            <>Initialize Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>

        {status === 'error' && (
          <p className="text-red-500 text-[10px] font-bold text-center mt-4">Failed to send inquiry. Please try again or email hello@fynryx.com</p>
        )}
      </form>
    </div>
  );
}
