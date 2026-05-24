import React from 'react';
import { motion } from 'framer-motion';
import { User, Layers, Cpu, ShieldAlert, Terminal, MapPin, Mail, Phone } from 'lucide-react';

export default function About() {
  const stats = [
    { label: "Current CGPA", value: "8.36", color: "from-cyan-400 to-blue-500" },
    { label: "Projects Built", value: "5+", color: "from-blue-500 to-indigo-500" },
    { label: "Sports Awards", value: "3×", color: "from-indigo-500 to-purple-500" },
    { label: "Tech Skills", value: "10+", color: "from-purple-500 to-pink-500" }
  ];

  const traits = [
    { icon: <Cpu size={16} />, label: "Embedded Systems", sub: "ESP32, Arduino & Sensors" },
    { icon: <Layers size={16} />, label: "Core Stack", sub: "C, HTML, CSS, Java" },
    { icon: <Terminal size={16} />, label: "IoT Architecture", sub: "Blynk, ThingSpeak, MQTT" },
    { icon: <ShieldAlert size={16} />, label: "Research Focus", sub: "Automation & Circuit Design" },
  ];

  const logs = [
    { text: "ACADEMIC AFFILIATION: SONA ECE (2024–2028)", color: "text-slate-400" },
    { text: "ACTIVE PROJECTS: 5 PROTOTYPES DEPLOYED", color: "text-blue-400" },
    { text: "RESEARCH DOMAIN: INTEGRATED CIRCUIT AUTOMATION", color: "text-indigo-400" },
    { text: "SPORTS: CHESS 1st & 2nd PLACE · 100M SPRINT 1st", color: "text-purple-400" },
    { text: "SYSTEM STATUS: HIGH PERFORMANCE · READY TO BUILD", color: "text-green-400" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 z-20 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-400 text-xs font-bold tracking-[0.35em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-[2px] bg-blue-400 rounded-full" />
              Who I Am
              <span className="w-6 h-[2px] bg-blue-400 rounded-full" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-heading uppercase tracking-wide text-white">
              About Me
            </h2>
            <div className="h-[3px] w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Bio Card */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glassmorphism p-8 rounded-3xl border border-white/5 bg-slate-950/20 backdrop-blur-md relative overflow-hidden flex-grow hover:border-blue-500/20 transition-all duration-500">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/30 rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/30 rounded-bl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/30 rounded-br-3xl pointer-events-none" />

              <div className="space-y-5 text-slate-300 leading-relaxed">
                <p className="font-bold text-white text-xl sm:text-2xl font-heading leading-snug">
                  Electronics & Computer Engineering undergraduate at Sona College of Technology, Salem.
                </p>
                <p className="font-body text-slate-400 text-base leading-relaxed">
                  I am a passionate engineering student specializing in <span className="text-blue-400 font-semibold">embedded systems</span>, <span className="text-indigo-400 font-semibold">IoT architecture</span>, and <span className="text-purple-400 font-semibold">software development</span>. I build sensor-driven monitoring systems, program microcontrollers, and engineer responsive UI portals that interface with hardware networks.
                </p>
                <p className="font-body text-slate-400 text-base leading-relaxed">
                  My coursework spans Digital Electronics, Embedded Systems, Computer Networks, and Data Structures. I am driven by research, innovation, and designing real-world engineering solutions for smart environments and automated safety systems.
                </p>
              </div>

              {/* Trait chips */}
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {traits.map((t, i) => (
                  <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-blue-500/20 transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors duration-300">
                      {t.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs font-heading uppercase tracking-wide">{t.label}</h4>
                      <p className="text-slate-400 text-[11px] font-body">{t.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Stats + Diagnostic Terminal */}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="glassmorphism p-6 rounded-3xl flex flex-col justify-center text-center hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 font-heading tracking-tight`}>
                    {stat.value}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest leading-snug font-heading">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* SYS_DIAGNOSTIC_STREAM Terminal */}
            <div className="glassmorphism p-7 rounded-3xl border border-white/5 bg-slate-950/20 backdrop-blur-md relative overflow-hidden flex-grow flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500/30 rounded-tl-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-500/30 rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-500/30 rounded-bl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500/30 rounded-br-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert size={14} className="text-yellow-400 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-heading">SYS_DIAGNOSTIC_STREAM</span>
                </div>
                <span className="text-[9px] text-green-400 font-bold font-mono bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  LIVE
                </span>
              </div>

              <div className="font-mono text-xs text-slate-500 space-y-3 leading-relaxed flex-grow">
                {logs.map((log, i) => (
                  <p key={i} className={`flex gap-2 items-start ${log.color}`}>
                    <span className="text-slate-600 shrink-0">&gt;</span>
                    <span>{log.text}</span>
                  </p>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-600 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  BUFFER: STABLE
                </span>
                <span>CPU TEMP: 42°C</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
