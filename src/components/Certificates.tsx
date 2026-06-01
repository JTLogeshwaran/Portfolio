import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Cpu, Code2, Calendar, FileBadge, X, Brain, Eye } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: 'development' | 'iot' | 'ai';
  credentialId?: string;
  skills: string[];
  description: string;
  link: string;
  color: string;
  icon: React.ReactNode;
  image?: string;
}

export default function Certificates() {
  const [activeTab, setActiveTab] = useState<'all' | 'development' | 'iot' | 'ai'>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Full Stack Development",
      issuer: "NxtWave Academy",
      date: "August 2024",
      category: "development",
      credentialId: "NXT-FSD-2024-819",
      skills: ["React.js", "Node.js", "Express.js", "SQL", "HTML & CSS", "Git", "REST APIs"],
      description: "Completed intensive practical training on modern web architectures, backend API designing, database modeling, and deploying responsive full-stack applications.",
      link: "https://www.nxtwave.in/",
      color: "from-blue-500 to-cyan-500",
      icon: <Code2 className="text-blue-400" size={24} />,
      image: "/certificates/nxtwave_cert.png"
    },
    {
      id: 2,
      title: "C & Java Programming Fundamentals",
      issuer: "NxtWave / NASSCOM",
      date: "September 2024",
      category: "development",
      credentialId: "NXT-NASS-PROG-305",
      skills: ["C Programming", "Java Core", "Data Structures", "Algorithms", "Object-Oriented Programming (OOP)"],
      description: "Certified program covering foundational computer science concepts, algorithm development, memory addressing in C, and Java object-oriented programming paradigms.",
      link: "https://nasscom.in/",
      color: "from-indigo-500 to-purple-500",
      icon: <FileBadge className="text-indigo-400" size={24} />
    },
    {
      id: 3,
      title: "Deep Learning Onramp",
      issuer: "MathWorks (MATLAB)",
      date: "October 3, 2025",
      category: "ai",
      credentialId: "MATH-DL-ONRAMP",
      skills: ["Deep Learning", "Neural Networks", "MATLAB", "AI/ML Basics", "Pattern Recognition"],
      description: "Certified by MathWorks for completing core Deep Learning workflows, including building, training, and evaluating deep neural networks for classification tasks in MATLAB.",
      link: "https://www.mathworks.com/",
      color: "from-pink-500 to-rose-500",
      icon: <Brain className="text-pink-400" size={24} />,
      image: "/certificates/matlab_deep_learning.jpg"
    },
    {
      id: 4,
      title: "Image Processing Onramp",
      issuer: "MathWorks (MATLAB)",
      date: "October 3, 2025",
      category: "ai",
      credentialId: "MATH-IP-ONRAMP",
      skills: ["Image Processing", "Computer Vision", "MATLAB", "Contrast Adjustment", "Object Detection"],
      description: "Certified by MathWorks for mastering essential image processing techniques, including segmenting objects, adjusting image contrast, and batch processing visual data.",
      link: "https://www.mathworks.com/",
      color: "from-amber-500 to-orange-500",
      icon: <Eye className="text-amber-400" size={24} />,
      image: "/certificates/matlab_image_processing.jpg"
    },
    {
      id: 5,
      title: "IoT Foundations & Embedded Systems",
      issuer: "Online Certification",
      date: "February 2025",
      category: "iot",
      credentialId: "CERT-IOT-EMB-947",
      skills: ["ESP32 & Arduino", "C/C++ Programming", "Sensor Integration", "Blynk IoT", "MQTT Protocol", "Circuit Design"],
      description: "Focused training on designing sensor-driven hardware systems, automating actuator behaviors, and streaming live data telemetry to cloud endpoints.",
      link: "#",
      color: "from-purple-500 to-pink-500",
      icon: <Cpu className="text-purple-400" size={24} />
    }
  ];

  const filteredCerts = activeTab === 'all' 
    ? certificates 
    : certificates.filter(c => c.category === activeTab);

  return (
    <section id="certifications" className="py-28 relative overflow-hidden bg-transparent">
      {/* Background radial glow */}
      <div className="absolute top-[30%] right-[10%] w-[380px] h-[380px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[320px] h-[320px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
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
              Verified Credentials
              <span className="w-6 h-[2px] bg-blue-400 rounded-full" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-heading uppercase tracking-wide text-white">
              Certifications Gallery
            </h2>
            <div className="h-[3px] w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto" />
          </motion.div>
        </div>

        {/* Filters Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {(['all', 'development', 'iot', 'ai'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-heading uppercase tracking-wider transition-all duration-300 border ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg shadow-blue-500/10'
                  : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-white hover:border-white/15'
              }`}
            >
              {tab === 'all' ? 'All Credentials' : tab === 'development' ? 'Software Dev' : tab === 'iot' ? 'IoT & Hardware' : 'AI & Deep Learning'}
            </button>
          ))}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                layout
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedCert(cert)}
                className="glassmorphism rounded-[24px] border border-white/5 bg-slate-950/20 backdrop-blur-md relative overflow-hidden flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300 group cursor-pointer h-full"
              >
                {/* Visual Accent Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
                
                {/* Certificate Image Top */}
                {cert.image ? (
                  <div className="relative h-48 w-full overflow-hidden bg-[#020204]/60 border-b border-white/5">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020204]/80 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900 border-b border-white/5 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all duration-300">
                      {cert.icon}
                    </div>
                  </div>
                )}

                {/* Card Info Area */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Icon and badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        {cert.icon}
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-md font-bold font-heading bg-slate-950/80 border border-white/5 text-slate-400 flex items-center gap-1 group-hover:border-blue-500/20 transition-colors">
                        <ShieldCheck size={10} className="text-green-400" /> VERIFIED
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-heading tracking-wide mb-1.5 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-blue-400/90 font-heading mb-3">{cert.issuer} • {cert.date}</p>
                    
                    <p className="text-slate-400 text-xs font-body leading-relaxed line-clamp-2 mb-4">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills & Action */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[75%]">
                      {cert.skills.slice(0, 2).map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-slate-950/50 border border-white/5 text-slate-400">
                          {s}
                        </span>
                      ))}
                      {cert.skills.length > 2 && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-slate-950/50 border border-white/5 text-slate-400">
                          +{cert.skills.length - 2}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-black font-heading text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                      Details <ExternalLink size={10} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Certificate Details Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-[#020205]/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative w-full max-w-lg glassmorphism p-6 sm:p-8 rounded-[32px] border border-white/10 bg-slate-950/90 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                {/* Background ambient lighting */}
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${selectedCert.color} opacity-10 rounded-full blur-3xl pointer-events-none`} />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-20"
                >
                  <X size={15} />
                </button>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center shrink-0">
                    {selectedCert.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading tracking-wide pr-6">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-heading mt-1">
                      Issued by <span className="text-blue-400 font-semibold">{selectedCert.issuer}</span>
                    </p>
                  </div>
                </div>

                {/* Certificate Image Preview */}
                {selectedCert.image && (
                  <div className="mb-6 rounded-2xl overflow-hidden border border-white/5 relative aspect-[1.33/1] bg-slate-950/40">
                    <img 
                      src={selectedCert.image} 
                      alt={`${selectedCert.title} Certificate`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="space-y-5 text-slate-300 text-xs sm:text-sm font-body">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading mb-1.5">Description</h4>
                    <p className="leading-relaxed text-slate-300">{selectedCert.description}</p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading mb-1.5">Skills Verified</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-900 border border-white/5 text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading mb-1">Issue Date</h4>
                      <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{selectedCert.date}</span>
                      </div>
                    </div>
                    {selectedCert.credentialId && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading mb-1">Credential ID</h4>
                        <span className="font-mono text-slate-300 font-bold bg-slate-900 px-2 py-1 rounded-md border border-white/5 text-[11px] select-all">
                          {selectedCert.credentialId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="flex-1 py-3 px-5 rounded-xl border border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-wider transition-colors font-heading"
                  >
                    Close
                  </button>
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 font-heading"
                  >
                    Verify Credential <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
