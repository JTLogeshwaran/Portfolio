import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { projectsData, Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  idx: number;
}

function ProjectCard({ project, idx }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((rect.height / 2 - y) / rect.height / 2) * 6;
    const rotateY = ((x - rect.width / 2) / rect.width / 2) * 6;
    gsap.to(card, { rotateX, rotateY, duration: 0.35, ease: 'power2.out', transformPerspective: 900 });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.08 }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        style={{ transformStyle: 'preserve-3d' }}
        className="glassmorphism rounded-3xl overflow-hidden group hover:border-blue-500/30 transition-all duration-300 flex flex-col shadow-2xl relative cursor-pointer h-full"
      >
        {/* Project Image */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#020204]/60 border-b border-white/5" style={{ transform: 'translateZ(15px)' }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04] opacity-75 group-hover:opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-xl text-[10px] uppercase font-black bg-slate-950/90 text-blue-400 border border-blue-500/30 backdrop-blur-md tracking-widest font-heading flex items-center gap-1.5">
              <Zap size={9} className="text-blue-400" />
              {project.category}
            </span>
          </div>

          {/* GitHub icon on hover */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            title="View on GitHub"
          >
            <Github size={14} />
          </motion.a>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 flex flex-col flex-grow" style={{ transform: 'translateZ(25px)' }}>
          <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors duration-300 font-heading leading-snug">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm mb-5 flex-grow leading-relaxed font-body">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="space-y-1.5 mb-5">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-500 font-body">
                <span className="w-1 h-1 rounded-full bg-blue-500/60 shrink-0" />
                {h}
              </div>
            ))}
          </div>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-950/60 text-slate-300 border border-white/5 font-body">
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors duration-200 font-heading"
            >
              <Github size={14} /> GitHub
            </a>
            {project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors duration-200 ml-auto font-heading"
              >
                Live Demo <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden bg-transparent">
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
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
              What I've Built
              <span className="w-6 h-[2px] bg-blue-400 rounded-full" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-heading uppercase tracking-wide text-white">
              Featured Projects
            </h2>
            <div className="h-[3px] w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto mb-6" />
            <p className="text-slate-400 max-w-xl text-sm leading-relaxed font-body">
              Real-world embedded systems and IoT projects — built, tested, and deployed during my engineering studies.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://github.com/thelogeshwaran"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-slate-950/40 hover:bg-blue-500/5 hover:border-blue-500/30 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 group backdrop-blur-sm"
          >
            <Github size={18} />
            View All Projects on GitHub
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
