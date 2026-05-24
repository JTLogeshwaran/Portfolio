import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Award, Zap, Shield, Wifi, Cpu } from 'lucide-react';
import Image from 'next/image';
import { gsap } from 'gsap';

const TYPING_STRINGS = [
  'ECE Student at Sona College',
  'Embedded Systems Enthusiast',
  'IoT & Smart Sensor Developer',
  'Aspiring Software Engineer',
  'Hardware & Software Builder',
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scanPos, setScanPos] = useState(0);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const currentString = TYPING_STRINGS[stringIndex];
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentString.slice(0, charIndex + 1));
        if (charIndex + 1 === currentString.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        } else {
          setCharIndex(c => c + 1);
        }
      } else {
        setDisplayText(currentString.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setCharIndex(0);
          setStringIndex(s => (s + 1) % TYPING_STRINGS.length);
        } else {
          setCharIndex(c => c - 1);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, stringIndex]);

  // Scan line animation
  useEffect(() => {
    const interval = setInterval(() => setScanPos(p => (p >= 100 ? 0 : p + 0.4)), 25);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    
    tl.fromTo(titleRef.current, 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.2 }
    );
    
    tl.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1 },
      '-=0.8'
    );
  }, []);

  // 3D Card Tilt Functionality
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.03,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  const stats = [
    { icon: <Award size={14} />, label: 'CGPA', value: '8.36' },
    { icon: <Shield size={14} />, label: 'Projects', value: '5+' },
    { icon: <Zap size={14} />, label: 'Certs', value: '3+' },
    { icon: <Wifi size={14} />, label: 'IoT Builds', value: '5' },
  ];

  return (
    <section id="home" className="min-h-screen relative flex items-center pt-20 pb-12 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full z-20">

        {/* LEFT: Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight font-heading uppercase text-white leading-[1.05]">
            <div className="text-blue-400 text-sm sm:text-base font-bold tracking-[0.25em] uppercase mb-3 flex items-center gap-2"><span className="w-6 h-[2px] bg-blue-400 rounded-full inline-block"></span> Hi, I am</div>
            <span ref={titleRef} className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              Logeshwaran J T
            </span>
          </h1>

          <div ref={subtitleRef} className="flex items-center gap-2 mb-8 h-8">
            <Cpu className="text-blue-500 animate-spin-slow" size={18} />
            <span className="text-lg sm:text-xl font-semibold text-slate-300 font-heading">{displayText}</span>
            <span className="w-0.5 h-6 bg-blue-400 animate-pulse rounded-full" />
          </div>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-body">
            Engineering smart embedded systems and IoT solutions. Bridging hardware and software to build real-world automated environments for a smarter future.
          </p>

          {/* Stats Panels */}
          <div className="flex flex-wrap gap-3 mb-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-md hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <span className="text-blue-400 bg-blue-500/5 p-1 rounded-lg border border-blue-500/10">{s.icon}</span>
                <span className="text-white font-black text-sm font-heading">{s.value}</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wide font-heading">{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center mb-10">
            <a href="#projects" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold flex items-center gap-2.5 transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1">
              View My Projects <ArrowRight size={16} />
            </a>
            <a href="#contact" className="px-8 py-4 rounded-full border border-slate-700 bg-slate-900/40 hover:bg-slate-800/60 text-white font-bold flex items-center gap-2 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 backdrop-blur-sm">
              Contact Me
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Connect</span>
            <div className="w-8 h-[1px] bg-slate-800" />
            <div className="flex gap-3">
              <a href="https://github.com/thelogeshwaran" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl border border-white/5 bg-slate-950/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/logeshwaranjt" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl border border-white/5 bg-slate-950/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300"><Linkedin size={18} /></a>
              <a href="mailto:logeshwaran.24ece@sonatech.ac.in" className="w-11 h-11 rounded-xl border border-white/5 bg-slate-950/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300"><Mail size={18} /></a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Cinematic 3D Tilting Photo Panel */}
        <motion.div
          className="hidden lg:flex lg:col-span-5 items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        >
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[340px] h-[480px] cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Outer glow rings */}
            <div className="absolute -inset-6 rounded-[44px] bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-purple-600/20 blur-2xl pointer-events-none" />
            <div className="absolute -inset-1 rounded-[38px] bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 pointer-events-none" />

            {/* Card Content Container */}
            <div 
              className="relative w-full h-full rounded-[32px] overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-500/10"
              style={{ transform: 'translateZ(50px)' }}
            >
              {/* Dark background behind photo */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#060b1a] via-[#080f24] to-[#03050c]" />

              {/* Left and right neon rim lights */}
              <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-blue-500/15 to-transparent z-0" />
              <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-purple-500/15 to-transparent z-0" />

              {/* Photo - Ghibli art style colorful portrait */}
              <div className="absolute inset-0 z-10" style={{ transform: 'translateZ(20px)' }}>
                <Image
                  src="/profile_avatar.png"
                  alt="Logeshwaran J T"
                  fill
                  priority
                  sizes="340px"
                  className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              {/* Subtle bottom vignette to fade photo into name block */}
              <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#03050c] to-transparent z-20" />

              {/* Neon rim light overlay */}
              <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-blue-400/8 to-transparent z-30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-purple-400/8 to-transparent z-30 pointer-events-none" />

              {/* Scan line */}
              <div
                className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none z-40"
                style={{ top: `${scanPos}%`, boxShadow: '0 0 10px #22d3ee' }}
              />

              {/* Top HUD badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50">
                <span className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-slate-950/90 text-green-400 border border-green-500/30 backdrop-blur-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />System Online
                </span>
                <span className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-slate-950/90 text-blue-400 border border-blue-500/30 backdrop-blur-md">
                  ECE · 2024–28
                </span>
              </div>

              {/* Bottom name label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-50" style={{ transform: 'translateZ(30px)' }}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-black mb-1">Logeshwaran J T</p>
                <p className="text-white font-bold text-sm font-heading leading-snug">Electronics &amp; Computer Engineering</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Sona College of Technology, Salem</p>
              </div>
            </div>

            {/* Floating chip - only CGPA */}
            <motion.div
              className="absolute -right-16 top-[40%] px-4 py-2.5 rounded-xl bg-slate-950/90 border border-blue-500/30 backdrop-blur-md text-center shadow-xl shadow-blue-500/10 z-50"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(70px)' }}
            >
              <p className="text-white font-black text-xl font-heading">8.36</p>
              <p className="text-[9px] text-blue-400 uppercase font-bold tracking-wide">CGPA</p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}


