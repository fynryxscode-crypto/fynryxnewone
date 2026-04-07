import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Cpu, Code2, Wifi } from 'lucide-react';
import NewsletterForm from '@/components/footer/NewsletterForm';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const footerLinks = {
  company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Our Projects', href: '/#projects' },
    { label: 'Trainings', href: '/trainings' },
    { label: 'Contact Us', href: '/#contact' },
  ],
  services: [
    { label: 'AI & ML Development', href: '/services/ai-ml-development' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Mobile App Development', href: '/services/android-app-development' },
    { label: 'UI/UX Design', href: '/services/ui-ux-development' },
    { label: 'Cloud Hosting', href: '/services/aws' },
  ],
  socials: [
    { Icon: FacebookIcon, href: 'https://facebook.com/fynryx', label: 'Facebook' },
    { Icon: TwitterIcon, href: 'https://twitter.com/fynryx', label: 'Twitter' },
    { Icon: InstagramIcon, href: 'https://instagram.com/fynryx', label: 'Instagram' },
    { Icon: LinkedinIcon, href: 'https://linkedin.com/company/fynryx', label: 'LinkedIn' },
  ],
};

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050d1a]">
      <div className="relative z-10 h-[2px] bg-gradient-to-r from-transparent via-[#2f55ff] to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:pr-8">
            <Link to="/" className="inline-flex items-center mb-6 group">
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2">
                <img
                  src="/logo.png"
                  alt="Fynryx Logo"
                  width={130}
                  height={36}
                  className="h-9 w-auto object-contain brightness-0 invert"
                />
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Shaping the future through intelligent technology — delivering world-class IT solutions for modern businesses.
            </p>

            {/* Client island: only the interactive form */}
            <NewsletterForm />

            <div className="flex gap-3">
              {footerLinks.socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center hover:bg-[#2f55ff] hover:border-[#2f55ff] hover:text-white transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="lg:pl-4">
            <div className="flex items-center gap-2 mb-7">
              <div className="w-6 h-[2px] bg-gradient-to-r from-[#2f55ff] to-[#00d4ff]" />
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase">Company</h4>
            </div>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="group flex items-center gap-2.5 text-slate-400 text-sm hover:text-[#2f55ff] transition-colors duration-200"
                  >
                    <ArrowRight size={13} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#2f55ff]" aria-hidden="true" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <div className="flex items-center gap-2 mb-7">
              <div className="w-6 h-[2px] bg-gradient-to-r from-[#2f55ff] to-[#00d4ff]" />
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase">IT Services</h4>
            </div>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.services.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="group flex items-center gap-2.5 text-slate-400 text-sm hover:text-[#2f55ff] transition-colors duration-200"
                  >
                    <ArrowRight size={13} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#2f55ff]" aria-hidden="true" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 mb-7">
              <div className="w-6 h-[2px] bg-gradient-to-r from-[#2f55ff] to-[#00d4ff]" />
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase">Contact Us</h4>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 items-start group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2f55ff]/20 transition-all">
                  <MapPin size={14} className="text-[#2f55ff]" aria-hidden="true" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">Madhapur, Hyderabad,<br />Telangana - 500081</p>
              </div>
              <div className="flex gap-3 items-start group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2f55ff]/20 transition-all">
                  <Phone size={14} className="text-[#2f55ff]" aria-hidden="true" />
                </div>
                <div className="text-sm">
                  <p className="text-slate-500 mb-1">Call Us</p>
                  <a href="tel:+917416646655" className="text-white hover:text-[#2f55ff] transition-colors font-medium">+91 74166 46655</a>
                </div>
              </div>
              <div className="flex gap-3 items-start group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2f55ff]/20 transition-all">
                  <Mail size={14} className="text-[#2f55ff]" aria-hidden="true" />
                </div>
                <div className="text-sm">
                  <p className="text-slate-500 mb-1">Email</p>
                  <a href="mailto:support@fynryx.com" className="text-white hover:text-[#2f55ff] transition-colors">support@fynryx.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap items-center gap-3 mb-12 pb-12 border-b border-white/[0.07]">
          {[
            { Icon: Cpu, label: 'AI & ML' },
            { Icon: Code2, label: 'Full Stack' },
            { Icon: Wifi, label: 'Cloud Native' },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium">
              <Icon size={13} className="text-[#2f55ff]" aria-hidden="true" />
              {label}
            </div>
          ))}
          <div className="ml-auto hidden md:flex items-center gap-2 text-xs text-slate-600">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            All systems operational
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {CURRENT_YEAR} <span className="text-slate-300 font-medium">Fynryx Technologies</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
