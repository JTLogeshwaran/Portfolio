import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Timeline", href: "#experience" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#020204]/90 shadow-lg shadow-blue-500/5 border-b border-white/5' : 'bg-transparent'} backdrop-blur-lg`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center relative overflow-hidden group-hover:border-blue-500/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
              <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="url(#logo-grad)" strokeWidth="6" strokeLinejoin="round" fill="none" />
                <path d="M 38 32 L 38 68 L 62 68" stroke="url(#logo-grad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="38" cy="32" r="5" fill="#6366f1" />
                <circle cx="62" cy="68" r="5" fill="#a855f7" />
              </svg>
            </div>
            <span className="text-white font-black text-sm tracking-[0.12em] uppercase font-heading group-hover:text-blue-400 transition-colors duration-300">
              Logeshwaran J T
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-heading"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a 
              href="#contact" 
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden w-10 h-10 rounded-xl border border-white/10 bg-slate-900/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/30 transition-all duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#020208]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-blue-500/5"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3.5 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-heading border border-transparent hover:border-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
              <a 
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm uppercase tracking-widest text-center transition-all duration-300 shadow-lg shadow-blue-500/20"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
