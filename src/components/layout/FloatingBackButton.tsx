import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingBackButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Don't show on home page or admin pages
  if (pathname === '/' || pathname.startsWith('/admin')) return null;

  const isAdmin = pathname.startsWith('/admin');

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
        className={`fixed top-24 z-50 flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white font-bold text-sm shadow-2xl hover:bg-white/20 transition-all group overflow-hidden ${
          isAdmin ? 'left-72' : 'left-6'
        }`}
      >
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform relative z-10" />
        <span className="relative z-10 tracking-widest uppercase text-[10px]">Back</span>
      </motion.button>
    </AnimatePresence>
  );
}
