import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Mail, Phone, MapPin, Github, Linkedin, Loader2 } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1800);
  };

  const contactInfo = [
    { icon: <Mail size={18} />, label: "Email", value: "logeshwaran.24ece@sonatech.ac.in", href: "mailto:logeshwaran.24ece@sonatech.ac.in" },
    { icon: <Phone size={18} />, label: "Phone", value: "+91 94894 73577", href: "tel:+919489473577" },
    { icon: <MapPin size={18} />, label: "Location", value: "Salem, Tamil Nadu, India", href: "#" },
  ];

  return (
    <section id="contact" className="py-28 relative overflow-hidden bg-transparent">
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-blue-600/5 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-400 text-xs font-bold tracking-[0.35em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-[2px] bg-blue-400 rounded-full" />
              Get In Touch
              <span className="w-6 h-[2px] bg-blue-400 rounded-full" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-heading uppercase tracking-wide text-white">
              Contact Me
            </h2>
            <div className="h-[3px] w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto mb-5" />
            <p className="text-slate-400 max-w-lg text-sm leading-relaxed font-body">
              Whether you have a project idea, a collaboration opportunity, or just want to say hello — I would love to hear from you.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: Contact Info */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glassmorphism p-8 rounded-3xl border border-white/5 bg-slate-950/20 backdrop-blur-md hover:border-blue-500/15 transition-all duration-500">
              <h3 className="text-xl font-bold text-white font-heading mb-2">Let's Work Together</h3>
              <p className="text-slate-400 text-sm font-body leading-relaxed mb-8">
                I am currently open to internships, research collaborations, and freelance hardware/software projects. Feel free to reach out through any of the channels below.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <a
                    key={i}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-blue-500/20 hover:bg-blue-500/3 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shrink-0">
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-heading">{info.label}</p>
                      <p className="text-white text-xs sm:text-sm font-bold font-body truncate">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-white/5">
                <a href="https://github.com/thelogeshwaran" target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 bg-slate-950/40 text-slate-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 text-xs font-bold font-heading">
                  <Github size={15} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/logeshwaranjt" target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 bg-slate-950/40 text-slate-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 text-xs font-bold font-heading">
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glassmorphism rounded-3xl overflow-hidden border border-white/5 bg-slate-950/20 backdrop-blur-md hover:border-blue-500/15 transition-all duration-500">
              
              {/* Form header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-slate-950/20">
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-blue-400" />
                  <span className="text-sm font-bold text-white font-heading">Send a Message</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="e.g. John Smith"
                      required
                      className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="e.g. john@email.com"
                      required
                      className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 font-body"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Message</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or how I can help..."
                    required
                    rows={5}
                    className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 resize-none font-body"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-blue-500/15 hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:opacity-80 text-sm tracking-wide"
                >
                  {status === 'idle' && <><Send size={16} /> Send Message</>}
                  {status === 'sending' && <><Loader2 size={16} className="animate-spin" /> Sending...</>}
                  {status === 'success' && <><Check size={16} className="text-green-300" /> Message Sent Successfully!</>}
                </button>

                <p className="text-center text-[10px] text-slate-600 font-body">
                  I typically respond within 24 hours
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
