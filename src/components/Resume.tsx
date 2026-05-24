import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Check, RefreshCw, ExternalLink, Award, Code2, Cpu, Globe } from 'lucide-react';

type DownloadState = 'idle' | 'loading' | 'done';

export default function Resume() {
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');

  const handleDownload = () => {
    setDownloadState('loading');
    setTimeout(() => {
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 3000);
    }, 1200);
  };

  const highlights = [
    { icon: <Award className="text-yellow-400" size={18} />, title: "Academic Excellence", value: "8.36 CGPA", desc: "B.E. ECE at Sona College of Technology" },
    { icon: <Cpu className="text-blue-400" size={18} />, title: "Engineering Projects", value: "5+ Builds", desc: "IoT, embedded systems & hardware prototypes" },
    { icon: <Code2 className="text-indigo-400" size={18} />, title: "Certifications", value: "3+ Certs", desc: "C & Java Programming — NxtWave / NASSCOM" },
    { icon: <Globe className="text-purple-400" size={18} />, title: "Sports Achievements", value: "3 Awards", desc: "Chess 1st & 2nd · Athletics 100m 1st Prize" },
  ];

  const skills = [
    "Embedded C / C++", "ESP32 & Arduino", "IoT Protocols", "HTML & CSS",
    "Java Basics", "Digital Electronics", "Sensor Integration", "Circuit Design"
  ];

  return (
    <section id="resume" className="py-28 relative overflow-hidden bg-transparent">
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-blue-600/5 blur-[90px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-400 text-xs font-bold tracking-[0.35em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-[2px] bg-blue-400 rounded-full" />
              My Resume
              <span className="w-6 h-[2px] bg-blue-400 rounded-full" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-heading uppercase tracking-wide text-white">
              Resume & Credentials
            </h2>
            <div className="h-[3px] w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel */}
          <motion.div
            className="lg:col-span-7 glassmorphism p-8 sm:p-10 rounded-[32px] border border-white/5 bg-slate-950/20 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FileText className="text-blue-500" size={20} />
                <span className="text-white font-bold text-lg font-heading">Logeshwaran J T</span>
                <span className="ml-auto text-[9px] px-2 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 font-mono font-bold">AVAILABLE</span>
              </div>

              <h3 className="text-xl font-bold text-white font-heading tracking-wide mb-3 leading-snug">
                B.E. Electronics & Computer Engineering
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-body mb-7">
                A focused engineering student with hands-on experience in embedded systems, IoT development, and hardware prototyping. My resume showcases real projects, academic achievements, and technical competencies built over 1+ year of active engineering study.
              </p>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {skills.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-950/70 border border-white/5 text-slate-300 font-body hover:border-blue-500/20 transition-colors duration-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Download CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                disabled={downloadState === 'loading'}
                className="flex-1 px-7 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 disabled:opacity-80 text-sm"
              >
                {downloadState === 'idle' && <><Download size={17} /> Download Resume</>}
                {downloadState === 'loading' && <><RefreshCw className="animate-spin" size={17} /> Preparing...</>}
                {downloadState === 'done' && <><Check size={17} className="text-green-300" /> Downloaded!</>}
              </button>
              <a
                href="https://www.linkedin.com/in/logeshwaranjt"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/10 bg-slate-950/30 hover:bg-blue-500/5 hover:border-blue-500/30 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
              >
                <ExternalLink size={15} /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right Panel: Highlights */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                className="glassmorphism p-5 sm:p-6 rounded-2xl border border-white/5 bg-slate-950/20 backdrop-blur-md hover:border-blue-500/20 transition-all duration-300 flex items-start gap-4 group hover:-translate-y-0.5"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">{item.title}</span>
                  </div>
                  <p className="text-white font-black text-lg font-heading">{item.value}</p>
                  <p className="text-slate-400 text-xs font-body leading-snug mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

