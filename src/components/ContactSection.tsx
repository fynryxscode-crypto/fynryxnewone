'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ChevronDown, 
  ArrowUpRight, 
  Clock 
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const SERVICES = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'AI & ML Solutions',
  'Cloud Hosting',
  'IT Staffing',
  'Cybersecurity',
  'Digital Marketing',
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', phone: '', service: '', message: '' };

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      // 1. Store Lead
      const { error: leadErr } = await supabase.from('leads').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        service: form.service || 'Other',
        message: form.message.trim(),
        status: 'New',
        type: 'contact',
      });
      if (leadErr) throw leadErr;

      // 2. Store Notification for Admin
      await supabase.from('notifications').insert({
        title: 'New Lead Generated',
        message: `${form.name} reached out regarding ${form.service || 'General Inquiry'}.`,
        type: 'lead',
        is_read: false,
      });

      // 3. Store Payments automatically
      await supabase.from('payments').insert({
        client_name: form.name.trim(),
        amount: 0,
        status: 'Pending',
        method: 'On-Consultation',
        payment_date: new Date().toISOString().split('T')[0],
      });

      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus('error');
    }
  };

  // Modern input styles with refined glass effects
  const inputBase =
    'w-full px-5 py-4 bg-white/40 dark:bg-slate-950/20 backdrop-blur-xl border border-blue-100 dark:border-white/10 rounded-2xl text-[15px] font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none transition-all duration-500 shadow-sm';
  const inputOk = 'focus:border-blue-500/50 focus:ring-[6px] focus:ring-blue-500/5 focus:bg-white dark:focus:bg-slate-900 focus:shadow-xl focus:shadow-blue-500/5';
  const inputErr = 'border-red-400/50 bg-red-50/20 focus:border-red-500 focus:bg-red-50/40 text-red-900';

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#020617]" id="contact">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#2f55ff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* ── Left Content: Form ── */}
        <div className="relative">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#2f55ff] border border-blue-100 dark:border-blue-500/20 mb-6 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              <span className="uppercase font-extrabold tracking-[0.2em] text-[10px]">Technical Consultation</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1]">
               Let's Build Something <br />
               <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent italic">Extraordinary</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg max-w-lg">
              Have a visionary project? Our engineering architects are ready to convert your complex ideas into world-class digital logic.
            </p>
          </div>

          {status === 'success' ? (
            <div className="p-12 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2xl text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-base mb-10 leading-relaxed max-w-xs mx-auto">
                Thank you for your trust. Our lead architect will analyze your inquiry and respond within 24 hours.
              </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="w-full py-4.5 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-black uppercase tracking-widest text-[13px] hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1 active:scale-95"
                  >
                    Send Another Mission
                  </button>
                </div>
              ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={set('name')}
                    className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold mt-2 ml-4 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-500" />{errors.name}</p>}
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={set('email')}
                    className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold mt-2 ml-4 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-500" />{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder="Phone (Optional)"
                  value={form.phone}
                  onChange={set('phone')}
                  className={`${inputBase} ${inputOk}`}
                />
                <div className="relative group">
                  <select
                    value={form.service}
                    onChange={set('service')}
                    className={`${inputBase} ${inputOk} appearance-none pr-10 cursor-pointer font-bold text-slate-600 dark:text-slate-400 [&>option]:bg-white dark:[&>option]:bg-slate-900`}
                  >
                    <option value="" disabled>Inquiry Type</option>
                    {SERVICES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 opacity-50 transition-transform group-focus-within:rotate-180" />
                </div>
              </div>

              <div className="relative">
                <textarea
                  placeholder="Describe your roadmap or project goal... *"
                  value={form.message}
                  onChange={set('message')}
                  className={`${inputBase} h-40 resize-none ${errors.message ? inputErr : inputOk} pt-5`}
                />
                {errors.message && <p className="text-red-500 text-[10px] font-bold mt-2 ml-4 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-500" />{errors.message}</p>}
              </div>

              {status === 'error' && (
                <p className="text-red-600 dark:text-red-400 text-xs font-bold bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl px-5 py-4 flex items-center gap-3 animate-in slide-in-from-top-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                  Connection failed. Pulse check: hello@fynryx.com
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5.5 bg-linear-to-r from-blue-700 via-blue-600 to-indigo-600 hover:hue-rotate-15 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-2xl font-black uppercase tracking-[0.15em] text-[14px] shadow-2xl shadow-blue-500/30 transition-all duration-500 hover:-translate-y-1.5 active:scale-95 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {status === 'loading' ? (
                  <><Loader2 size={18} className="animate-spin" /> Synchronizing...</>
                ) : (
                  <><Send size={18} className="group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300" /> Initialize Contact</>
                )}
              </button>
            </form>
          )}
        </div>

        {/* ── Right Content: Contact Info ── */}
        <div className="flex flex-col gap-8">
            <div className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] p-12 border border-blue-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-3 h-full bg-linear-to-r from-[#2f55ff] to-transparent opacity-20" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl -translate-y-12 translate-x-12" />
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">Our Nerve Centers</h3>

                <div className="space-y-12">
                    {[
                    {
                        icon: MapPin,
                        title: 'HQ Location',
                        color: 'blue',
                        content: (
                        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-semibold">
                            1st Floor, MSR-9 Building, Street No. 7,<br />
                            Ayyappa Society, Madhapur, <br />
                            Hyderabad — 500081
                        </p>
                        ),
                    },
                    {
                        icon: Phone,
                        title: 'Direct Response Line',
                        color: 'indigo',
                        content: (
                        <div className="flex flex-col gap-2">
                            <a href="tel:+917416646655" className="text-slate-900 dark:text-slate-100 text-[18px] font-black hover:text-[#2f55ff] transition-colors flex items-center gap-2 group/link">
                              +91 74166 46655 <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-all font-bold" />
                            </a>
                            <a href="tel:+917416659911" className="text-slate-900 dark:text-slate-100 text-[18px] font-black hover:text-[#2f55ff] transition-colors flex items-center gap-2 group/link">
                              +91 74166 59911 <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-all font-bold" />
                            </a>
                        </div>
                        ),
                    },
                    {
                        icon: Mail,
                        title: 'Official Correspondence',
                        color: 'purple',
                        content: (
                        <div className="flex flex-col gap-2">
                            <a href="mailto:support@fynryx.com" className="text-slate-900 dark:text-slate-100 text-[16px] font-bold hover:text-[#2f55ff] transition-colors">
                               support@fynryx.com
                            </a>
                            <a href="mailto:info@fynryx.com" className="text-slate-900 dark:text-slate-100 text-[16px] font-bold hover:text-[#2f55ff] transition-colors">
                               info@fynryx.com
                            </a>
                        </div>
                        ),
                    },
                    ].map(({ icon: Icon, title, content, color }) => (
                    <div key={title} className="flex items-start gap-8">
                        <div className="w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none flex items-center justify-center transition-transform hover:-rotate-3 border border-slate-100 dark:border-white/5">
                            <Icon size={22} className={
                                color === 'blue' ? 'text-blue-500' : 
                                color === 'indigo' ? 'text-indigo-500' : 'text-purple-500'
                            } strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[10px] mb-3">{title}</h4>
                            {content}
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Sub-badge Card */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-600 dark:to-indigo-600 rounded-[2.5rem] p-8 flex items-center justify-between shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-white/10 translate-x-32 group-hover:translate-x-0 transition-transform duration-700 opacity-20" />
                <div className="relative z-10">
                    <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest mb-1">Response Time</p>
                    <h5 className="text-white text-xl font-black">Under 2 Hours</h5>
                </div>
                <div className="relative z-10 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
                   <Clock size={24} className="text-white" />
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
