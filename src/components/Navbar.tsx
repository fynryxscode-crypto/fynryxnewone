import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Phone, ChevronDown, Home, Menu,
  BrainCircuit, Smartphone, MonitorUp, Megaphone, Layers, MapPin, Box, Users, PenTool, Globe,
  Code2, Cloud, CloudFog, Database, Brush, CloudLightning, Coffee, Braces, FastForward, Server, DatabaseBackup, Image as ImageIcon, FileCode, Terminal, Atom, Hexagon, Triangle, LayoutTemplate,
  Leaf, Link2, Stethoscope, ShoppingCart, GraduationCap, CircleDollarSign, Utensils, ShoppingBasket, HeartPulse, Bed, Wifi, Shirt, Video, Truck, Tv, Newspaper, Zap, Home as HomeIcon, ShieldCheck, MessageCircle, Car,
  Brain, Bot, Sparkles, Cog, Shield, Lightbulb, UserPlus, Layout, Building2, Wallet, Map, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

const NavbarDrawer = React.lazy(() => import('./layout/NavbarDrawer'));
const NavItem = React.memo(({ item, isActive }: { item: any, isActive: boolean }) => {
  return (
    <div className="relative group/nav text-center px-1">
      <Link 
        to={item.href} 
        className={`flex items-center gap-1.5 py-4.5 transition-all uppercase tracking-[0.15em] relative group/link whitespace-nowrap ${
          isActive ? 'text-[#2f55ff]' : 'hover:text-[#2f55ff] text-current/80'
        }`}
      >
        {item.label}
        {item.megaMenu && <ChevronDown size={11} className="opacity-40 group-hover/nav:rotate-180 transition-transform duration-300" />}
        
        {isActive && (
          <motion.span
            layoutId="activeNav"
            className="absolute bottom-[22px] left-0 right-0 h-[2px] bg-[#2f55ff] rounded-full"
            initial={false}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>

      {item.megaMenu && (
        <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all duration-300 z-50 transform translate-y-4 group-hover/nav:translate-y-0 hidden group-hover/nav:block">
          <div className={`bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 ${item.megaMenu.width} relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2f55ff] to-cyan-400" />
            
            {item.megaMenu.type === 'list' && (
              <div className={`grid gap-x-8 gap-y-4 ${item.megaMenu.columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {item.megaMenu.items?.map((sub: any, sIdx: number) => {
                  const Icon = sub.icon;
                  return (
                    <Link 
                      key={sIdx} 
                      to={sub.path} 
                      className="flex items-center gap-3 text-slate-700 hover:text-[#2f55ff] transition-all group/link"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover/link:bg-[#2f55ff] group-hover/link:text-white transition-all">
                        <Icon size={15} />
                      </div>
                      <span className="font-bold text-[12.5px] group-hover/link:translate-x-1 transition-transform">{sub.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {item.megaMenu.type === 'grouped' && (
              <div className="grid grid-cols-3 gap-10">
                {item.megaMenu.groups?.map((group: any, gIdx: number) => (
                  <div key={gIdx} className="flex flex-col">
                    <h4 className="font-black text-slate-900 border-b border-slate-100 pb-3 mb-5 text-[14px] tracking-widest uppercase">{group.title}</h4>
                    <div className="flex flex-col gap-4">
                      {group.items.map((sub: any, sIdx: number) => {
                        const Icon = sub.icon;
                        return (
                          <Link 
                            key={sIdx} 
                            to={sub.path} 
                            className="text-slate-600 font-bold hover:text-[#2f55ff] text-[12.5px] transition-all group/link flex items-center gap-3"
                          >
                            <div className="w-7 h-7 rounded-md bg-slate-50 text-slate-400 group-hover/link:bg-[#2f55ff] group-hover/link:text-white flex items-center justify-center transition-all">
                              <Icon size={14} />
                            </div>
                            <span className="group-hover/link:translate-x-1 transition-transform">{sub.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
NavItem.displayName = 'NavItem';

const SERVICES_OPTIONS = [
  { value: 'ux-ui', label: 'UX/UI Design' },
  { value: 'web-dev', label: 'Web Development' },
  { value: 'mobile-dev', label: 'Mobile Development' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'ai-chatbot', label: 'AI Chatbot Development' },
  { value: 'cyber-security', label: 'Cyber Security' },
  { value: 'training', label: 'Technical Training' },
  { value: 'other', label: 'Other Software Solutions' },
];

const generatePath = (category: string, name: string) => `/${category}/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true);
      else setScrolled(false);
    };
    // Initial check
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  // Handle hash changes for dynamic active state while avoiding hydration errors
  useEffect(() => {
    setActiveHash(window.location.hash);
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: leadErr } = await supabase.from('leads').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        service: form.service,
        message: 'Inquiry via Navbar Drawer Form',
        status: 'New',
      });

      if (leadErr) throw leadErr;

      await supabase.from('notifications').insert({
        title: 'New Quick Inquiry',
        message: `${form.name} sent an inquiry for ${form.service}.`,
        type: 'lead',
        is_read: false,
      });

      toast.success('Strategy request sent!');
      setForm({ name: '', email: '', phone: '', service: '' });
      setIsDrawerOpen(false);
    } catch (err) {
      console.error('Drawer form error:', err);
      toast.error('Failed to send request.');
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

  // Memoize nav items to prevent massive object recreation on every scroll-driven re-render
  const navItems = useMemo(() => [
    { label: 'About', href: '/about' },
    { 
      label: 'Services', 
      href: '/#services',
      megaMenu: {
        type: 'list',
        columns: 2,
        width: 'min-w-[600px]',
        items: [
          { name: 'AI & ML Development', icon: BrainCircuit },
          { name: 'Android App Development', icon: Smartphone },
          { name: 'Chrome Extension Development', icon: MonitorUp },
          { name: 'Digital Marketing', icon: Megaphone },
          { name: 'Flutter App Development', icon: Layers },
          { name: 'GPS Vehicle Tracking', icon: MapPin },
          { name: 'iOS App Development', icon: Box },
          { name: 'IT Staffing', icon: Users },
          { name: 'UI/UX Development', icon: PenTool },
          { name: 'Web Development', icon: Globe }
        ].map(item => ({ ...item, path: generatePath('services', item.name) }))
      }
    },
    { 
      label: 'Technologies', 
      href: '/#technologies',
      megaMenu: {
        type: 'list',
        columns: 3,
        width: 'min-w-[850px]',
        items: [
          { name: 'Adobe XD', icon: PenTool },
          { name: 'Angular JS', icon: Code2 },
          { name: 'AWS', icon: Cloud },
          { name: 'Azure', icon: CloudFog },
          { name: 'Database', icon: Database },
          { name: 'Figma', icon: Brush },
          { name: 'Flutter', icon: Layers },
          { name: 'Google Cloud', icon: CloudLightning },
          { name: 'Java', icon: Coffee },
          { name: 'Kotlin', icon: Braces },
          { name: 'Next JS', icon: FastForward },
          { name: 'Node JS', icon: Server },
          { name: 'NoSQL (Mongo DB)', icon: DatabaseBackup },
          { name: 'Photoshop', icon: ImageIcon },
          { name: 'PHP', icon: FileCode },
          { name: 'Python', icon: Terminal },
          { name: 'React Native', icon: Atom },
          { name: 'Swift iOS', icon: Hexagon },
          { name: 'VueJS', icon: Triangle },
          { name: 'Web Framework', icon: LayoutTemplate }
        ].map(item => ({ ...item, path: generatePath('technologies', item.name) }))
      }
    },
    { 
      label: 'Industries', 
      href: '/#industries',
      megaMenu: {
        type: 'list',
        columns: 3,
        width: 'min-w-[950px]',
        items: [
          { name: 'Agriculture & Farming App', icon: Leaf },
          { name: 'Blockchain Development', icon: Link2 },
          { name: 'CRM Development', icon: Users },
          { name: 'Dr. Consultation App', icon: Stethoscope },
          { name: 'E-Commerce App & Web', icon: ShoppingCart },
          { name: 'Education App', icon: GraduationCap },
          { name: 'Fintech App', icon: CircleDollarSign },
          { name: 'Food Delivery App', icon: Utensils },
          { name: 'GPS Tracking Devices', icon: MapPin },
          { name: 'Grocery Delivery App', icon: ShoppingBasket },
          { name: 'Healthcare and Fitness App', icon: HeartPulse },
          { name: 'Hotel Booking App & Website', icon: Bed },
          { name: 'IoT Development', icon: Wifi },
          { name: 'Laundry App Development', icon: Shirt },
          { name: 'Live Streaming App', icon: Video },
          { name: 'Logistic App', icon: Truck },
          { name: 'Media & Entertainment App', icon: Tv },
          { name: 'News App', icon: Newspaper },
          { name: 'On-Demand App', icon: Zap },
          { name: 'Real Estate Marketplace', icon: HomeIcon },
          { name: 'SaaS And PaaS', icon: Cloud },
          { name: 'Security Management App', icon: ShieldCheck },
          { name: 'Social Media App', icon: MessageCircle },
          { name: 'Taxi Booking App', icon: Car }
        ].map(item => ({ ...item, path: generatePath('industries', item.name) }))
      }
    },
    { 
      label: 'AI Solutions', 
      href: '/#ai-solutions',
      megaMenu: {
        type: 'grouped',
        width: 'min-w-[950px]',
        groups: [
          {
            title: 'AI & Data Services',
            items: [
              { name: 'AI Development Services', icon: Brain },
              { name: 'Chatbot Development', icon: Bot },
              { name: 'Data Engineering Service', icon: Database },
              { name: 'Generative AI', icon: Sparkles },
              { name: 'Robotic Process Automation', icon: Cog }
            ].map(item => ({ ...item, path: generatePath('ai-solutions', item.name) }))
          },
          {
            title: 'Digital Transformation',
            items: [
              { name: 'Business Protecting Services', icon: Shield },
              { name: 'Product Design & Ideation Services', icon: Lightbulb },
              { name: 'Resource Augmentation Services', icon: UserPlus }
            ].map(item => ({ ...item, path: generatePath('ai-solutions', item.name) }))
          },
          {
            title: 'Enterprise Solutions',
            items: [
              { name: 'CMS Development Services', icon: Layout },
              { name: 'ERP Software Development', icon: Building2 },
              { name: 'Financial Product Development', icon: Wallet },
              { name: 'GPS Tracking Software', icon: Map },
              { name: 'Inventory Management System', icon: Package }
            ].map(item => ({ ...item, path: generatePath('ai-solutions', item.name) }))
          }
        ]
      }
    },
    { label: 'Projects', href: '/#projects' },
    { label: 'Trainings', href: '/trainings' },
    { label: 'Contact Us', href: '/contact' },
  ], []);

  const isActive = useCallback((href: string) => {
    if (href.startsWith('/#')) {
      return pathname === '/' && activeHash === href.slice(1);
    }
    return pathname === href;
  }, [pathname, activeHash]);

  const headerClass = isHome
    ? (mounted && scrolled)
      ? 'bg-white shadow-md text-black py-2.5'
      : 'bg-transparent text-white py-4.5'
    : 'bg-[#051124] text-white shadow-lg py-2.5';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${headerClass}`}>
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center shrink-0 w-[180px]">
          <Link to="/" className="flex items-center group">
             <img 
               src="/logo.png" 
               alt="Fynryx Logo" 
               width={160}
               height={45}
               className={`h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                 isHome && (mounted && scrolled) ? 'brightness-0' : 'brightness-0 invert'
               }`}
             />
          </Link>
        </div>
        
        {/* Primary Nav */}
        <nav className="hidden xl:flex items-center gap-1.5 text-[11px] font-bold mx-auto justify-center whitespace-nowrap">
          <Link to="/" className="relative flex items-center justify-center p-2 group hover:text-[#2f55ff] transition-colors" aria-label="Home">
            <Home size={16} className="transform transition-all duration-300 group-hover:-translate-y-0.5" />
          </Link>

          {navItems.map((item, idx) => (
            <NavItem key={idx} item={item} isActive={isActive(item.href)} />
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden xl:flex items-center gap-5 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full border border-[#2f55ff]/30 flex items-center justify-center text-[#2f55ff] bg-blue-50/50">
                <Phone size={16} />
             </div>
             <div className="flex flex-col">
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#2f55ff]">Free Consultation</span>
               <div className="flex flex-col">
                 <a href="tel:+917416646611" className="text-[12px] font-black whitespace-nowrap hover:text-[#2f55ff] transition-colors">74166 46611</a>
                 <a href="tel:+917416646655" className="text-[12px] font-black whitespace-nowrap hover:text-[#2f55ff] transition-colors">74166 46655</a>
               </div>
             </div>
          </div>

          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="w-10 h-10 rounded-full bg-[#2f55ff] text-white flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
            aria-label="Open Menu"
          >
             <Menu size={18} />
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button className="xl:hidden p-2 text-current" onClick={() => setIsDrawerOpen(true)} aria-label="Open Mobile Menu">
           <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <NavbarDrawer 
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            form={form}
            setForm={setForm}
            handleFormSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            SERVICES_OPTIONS={SERVICES_OPTIONS}
            navItems={navItems}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
