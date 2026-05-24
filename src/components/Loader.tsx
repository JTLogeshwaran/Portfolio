import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps { onComplete: () => void; }

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const gi = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 100); }, 800);
    let prog = 0;
    const timer = setInterval(() => {
      prog += Math.random() * 18 + 8;
      if (prog >= 100) { prog = 100; clearInterval(timer); }
      setProgress(Math.round(prog));
    }, 180);
    const done = setTimeout(() => {
      clearInterval(gi);
      setVisible(false);
      setTimeout(onComplete, 650);
    }, 1800);
    return () => { clearInterval(gi); clearInterval(timer); clearTimeout(done); };
  }, [onComplete]);

  const phases = ['LOADING PORTFOLIO SYSTEM...','MOUNTING IoT MODULES...','INITIALIZING CORE ENGINE...','LAUNCHING LOGESHWARAN J T...'];
  const line = phases[Math.min(Math.floor((progress / 100) * phases.length), phases.length - 1)];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020208] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(0,240,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.025) 1px,transparent 1px)',
            backgroundSize: '40px 40px'}} />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px]" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex flex-col items-center mb-12 z-10">
            <div className="relative mb-5">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none" className="relative z-10">
                <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6"/><stop offset="50%" stopColor="#6366f1"/><stop offset="100%" stopColor="#a855f7"/>
                </linearGradient></defs>
                <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" stroke="url(#lg)" strokeWidth="5" fill="none" strokeLinejoin="round"/>
                <path d="M 35 28 L 35 70 L 62 70" stroke="url(#lg)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="35" cy="28" r="5" fill="#6366f1"/><circle cx="62" cy="70" r="5" fill="#a855f7"/>
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-[0.2em] uppercase font-mono"
              style={{ color: glitch ? '#22d3ee' : '#fff', textShadow: glitch ? '2px 0 #a855f7, -2px 0 #3b82f6' : 'none', transition: 'color 0.05s' }}>
              Logeshwaran J T
            </h1>
            <p className="text-[11px] text-slate-500 tracking-[0.4em] uppercase mt-1 font-mono">ECE Engineer · Builder · Creator</p>
          </motion.div>
          <div className="w-[280px] sm:w-[360px] z-10">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[10px] font-mono text-blue-400 tracking-widest truncate pr-4">{line}</p>
              <span className="text-[11px] font-black font-mono text-white shrink-0">{progress}%</span>
            </div>
            <div className="h-[3px] w-full bg-slate-800/60 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-center gap-2 mt-5">
              {[0,1,2].map(i => (
                <motion.span key={i} className="w-1 h-1 rounded-full bg-blue-500"
                  animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
