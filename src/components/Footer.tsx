import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-12 border-t border-white/5 bg-[#03050c]/80 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <p className="text-sm text-slate-400 font-medium font-heading">
            &copy; {new Date().getFullYear()} Logeshwaran J T. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-600 mt-1.5 uppercase tracking-widest font-extrabold font-body">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex gap-6 text-xs font-extrabold uppercase tracking-widest text-slate-400 font-heading">
          <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
          <a href="#skills" className="hover:text-white transition-colors duration-300">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors duration-300">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
        </div>

        {/* Back to top CTA */}
        <button
          onClick={handleScrollTop}
          className="w-10 h-10 rounded-xl border border-white/10 bg-slate-950 hover:bg-slate-900 hover:text-blue-400 hover:border-blue-500/40 flex items-center justify-center text-slate-400 transition-all duration-300 shadow-md group"
          title="Back to Top"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>

      </div>
    </footer>
  );
}
