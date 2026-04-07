'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form className="relative w-full max-w-sm mb-8" onSubmit={handleNewsletter}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full pl-5 pr-14 py-3.5 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#2f55ff] transition-all"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        aria-label="Subscribe to newsletter"
        className="absolute right-1.5 top-1.5 bottom-1.5 w-9 h-9 bg-gradient-to-br from-[#2f55ff] to-[#1a3fd4] text-white rounded-full flex items-center justify-center hover:from-[#4a6dff] hover:to-[#2f55ff] transition-all shadow-lg disabled:opacity-60"
      >
        <Send size={14} className="-ml-0.5 mt-0.5" />
      </button>
    </form>
  );
}
