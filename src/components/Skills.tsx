import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Laptop, ShieldCheck, Sparkles, Orbit } from 'lucide-react';
import { skillCategories } from '../data/skills';

const categoryIcons = [
  <Terminal size={18} key="0" />,
  <Cpu size={18} key="1" />,
  <Laptop size={18} key="2" />,
  <ShieldCheck size={18} key="3" />
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 400;
    let height = 400;

    const handleResize = () => {
      if (!canvas || !canvas.parentNode) return;
      const rect = (canvas.parentNode as HTMLElement).getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = Math.max(320, rect.height);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const nodes = [
      { id: 0, label: "Programming", radius: 65,  speed: 0.015, phase: 0,              color: "#3b82f6" },
      { id: 1, label: "Embedded & IoT", radius: 95,  speed: 0.010, phase: Math.PI / 2,   color: "#a855f7" },
      { id: 2, label: "Web & Tools",  radius: 128, speed: 0.007, phase: Math.PI,        color: "#10b981" },
      { id: 3, label: "Core Skills",  radius: 158, speed: 0.005, phase: Math.PI * 1.5,  color: "#f59e0b" }
    ];

    let angleY = 0;
    let angleX = 0.3;
    let mouseX = 0;
    let mouseY = 0;
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - width / 2;
      mouseY = e.clientY - rect.top - height / 2;
      isHovered = true;
    };

    const handleMouseLeave = () => { isHovered = false; };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left - width / 2;
      const clickY = e.clientY - rect.top - height / 2;
      let clickedNodeId = -1;
      let minDistance = 30;

      projectedCache.forEach((node) => {
        const dx = clickX - node.x2d;
        const dy = clickY - node.y2d;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) {
          minDistance = dist;
          clickedNodeId = node.id;
        }
      });

      if (clickedNodeId !== -1) {
        setActiveCategory(clickedNodeId);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    let projectedCache: Array<{ id: number; x2d: number; y2d: number; scale: number; zRot: number; label: string; color: string; radius: number }> = [];

    const drawLabel = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      color: string,
      isSelected: boolean,
      canvasW: number,
      canvasH: number
    ) => {
      ctx.save();
      ctx.font = `bold ${isSelected ? '11px' : '9px'} 'Space Mono', monospace`;
      const textW = ctx.measureText(text).width;
      const padX = 8;
      const padY = 4;
      const boxW = textW + padX * 2;
      const boxH = (isSelected ? 18 : 14) + padY;

      // Ensure label stays within canvas bounds with 12px margin
      let lx = x + 14;
      let ly = y - boxH / 2;
      const margin = 12;
      if (lx + boxW > canvasW / 2 - margin) lx = x - boxW - 14;
      if (lx < -canvasW / 2 + margin) lx = -canvasW / 2 + margin;
      if (ly < -canvasH / 2 + margin) ly = -canvasH / 2 + margin;
      if (ly + boxH > canvasH / 2 - margin) ly = canvasH / 2 - margin - boxH;

      // Background pill
      ctx.globalAlpha = isSelected ? 0.95 : 0.6;
      ctx.fillStyle = isSelected ? color : 'rgba(5,8,20,0.85)';
      ctx.beginPath();
      const r = 6;
      ctx.moveTo(lx + r, ly);
      ctx.lineTo(lx + boxW - r, ly);
      ctx.arcTo(lx + boxW, ly, lx + boxW, ly + r, r);
      ctx.lineTo(lx + boxW, ly + boxH - r);
      ctx.arcTo(lx + boxW, ly + boxH, lx + boxW - r, ly + boxH, r);
      ctx.lineTo(lx + r, ly + boxH);
      ctx.arcTo(lx, ly + boxH, lx, ly + boxH - r, r);
      ctx.lineTo(lx, ly + r);
      ctx.arcTo(lx, ly, lx + r, ly, r);
      ctx.closePath();
      ctx.fill();

      // Border
      ctx.globalAlpha = isSelected ? 1.0 : 0.4;
      ctx.strokeStyle = color;
      ctx.lineWidth = isSelected ? 1.5 : 0.8;
      ctx.stroke();

      // Text
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = isSelected ? '#ffffff' : color;
      ctx.fillText(text, lx + padX, ly + boxH / 2 + (isSelected ? 4 : 3));

      ctx.restore();
    };

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      const time = performance.now();

      if (isHovered) {
        angleX += (mouseY * 0.0008 - angleX) * 0.05;
        angleY += (mouseX * 0.0008 - angleY) * 0.05;
      } else {
        angleX += (0.3 - angleX) * 0.03;
        angleY += (0 - angleY) * 0.03;
      }

      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Draw orbit rings
      nodes.forEach((node) => {
        const isSelected = activeCategory === node.id;
        ctx.save();
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = isSelected ? 0.18 : 0.06;
        ctx.lineWidth = isSelected ? 1.5 : 0.8;
        ctx.setLineDash(isSelected ? [] : [4, 8]);
        ctx.beginPath();
        const rx = Math.abs(node.radius * Math.cos(angleY));
        const ry = Math.abs(node.radius * Math.cos(angleX));
        if (rx > 0 && ry > 0) {
          ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // Draw center core
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 14);
      coreGrad.addColorStop(0, 'rgba(99,102,241,1)');
      coreGrad.addColorStop(0.5, 'rgba(59,130,246,0.6)');
      coreGrad.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#6366f1';
      ctx.fillStyle = coreGrad;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      projectedCache = nodes.map((node) => {
        const t = time * node.speed * 0.1 + node.phase;
        const x3d = Math.cos(t) * node.radius;
        const z3d = Math.sin(t) * node.radius;
        const y3d = Math.sin(time * 0.002 + node.phase) * 8;

        const xRot = x3d * Math.cos(angleY) - z3d * Math.sin(angleY);
        let zRot = x3d * Math.sin(angleY) + z3d * Math.cos(angleY);
        const yRot = y3d * Math.cos(angleX) - zRot * Math.sin(angleX);
        zRot = y3d * Math.sin(angleX) + zRot * Math.cos(angleX);

        const scale = 220 / (220 + zRot);
        const x2d = xRot * scale;
        const y2d = yRot * scale;

        return { ...node, x2d, y2d, scale, zRot };
      });

      projectedCache.sort((a, b) => b.zRot - a.zRot);

      // Draw connector lines (behind dots)
      ctx.save();
      ctx.translate(width / 2, height / 2);
      projectedCache.forEach((node) => {
        const isSelected = activeCategory === node.id;
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = isSelected ? 0.25 : 0.05;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(node.x2d, node.y2d);
        ctx.stroke();
      });
      ctx.restore();

      // Draw dots (translated to center)
      ctx.save();
      ctx.translate(width / 2, height / 2);
      projectedCache.forEach((node) => {
        const isSelected = activeCategory === node.id;
        const dotRadius = (isSelected ? 9 : 6) * node.scale;

        // Glow
        ctx.shadowBlur = isSelected ? 24 : 8;
        ctx.shadowColor = node.color;
        ctx.fillStyle = node.color;
        ctx.globalAlpha = isSelected ? 1.0 : 0.6;
        ctx.beginPath();
        ctx.arc(node.x2d, node.y2d, dotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner white dot
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = isSelected ? 0.9 : 0.35;
        ctx.beginPath();
        ctx.arc(node.x2d, node.y2d, dotRadius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Draw labels LAST (on top of everything, clamped to bounds)
      // Work in canvas space directly (not translated)
      ctx.save();
      projectedCache.forEach((node) => {
        const isSelected = activeCategory === node.id;
        // We need to draw in absolute canvas coords but drawLabel clamps within [-w/2, w/2]
        // So pass center-relative coords and let drawLabel handle the clamping in center-space
        ctx.save();
        ctx.translate(width / 2, height / 2);
        drawLabel(ctx, node.label, node.x2d, node.y2d, node.color, isSelected, width, height);
        ctx.restore();
      });
      ctx.restore();
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [activeCategory]);

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 z-20 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10 flex items-center gap-3 font-heading uppercase tracking-wide text-white">
              <Cpu className="text-blue-500 animate-pulse" size={30} /> Skills Spectrum
            </h2>
            <div className="h-[3px] w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: 3D Galaxy Canvas */}
          <div ref={containerRef} className="lg:col-span-5 w-full glassmorphism rounded-[32px] overflow-hidden border border-white/5 bg-slate-950/20 backdrop-blur-md relative flex flex-col justify-center items-center">
            <div className="w-full h-[380px] relative">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-slate-500 bg-slate-950/60 border border-white/5 px-2.5 py-1 rounded-md">
                <Orbit size={10} className="animate-spin-slow text-blue-400" />
                <span>SKILLS_ORBIT: ACTIVE</span>
              </div>
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-pointer" />
            </div>
            
            <div className="p-4 w-full border-t border-white/5 bg-slate-950/30 text-center text-[10px] text-slate-500 font-mono tracking-wider">
              CLICK ORBITING NODES TO EXPLORE CATEGORIES
            </div>
          </div>

          {/* RIGHT: Selected Category Skills Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex flex-wrap gap-2.5">
              {skillCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold font-heading tracking-wide uppercase transition-all duration-300 border backdrop-blur-sm ${
                    activeCategory === idx
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500/30 shadow-lg shadow-blue-500/20 translate-y-[-1px]'
                      : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-white hover:border-blue-500/20'
                  }`}
                >
                  <span className={activeCategory === idx ? 'text-white' : 'text-blue-500/70'}>
                    {categoryIcons[idx]}
                  </span>
                  {cat.title}
                </button>
              ))}
            </div>

            <div className="glassmorphism p-8 sm:p-10 rounded-[32px] border border-white/5 bg-slate-950/10 backdrop-blur-md relative min-h-[300px] flex flex-col justify-center">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] text-slate-600">
                <Sparkles size={10} className="text-yellow-500 animate-pulse" />
                <span>SKILL_MATRIX</span>
              </div>

              <div className="space-y-7">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <div key={index} className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base font-bold text-white font-heading tracking-wide">
                        {skill.name}
                      </span>
                      <span className="text-xs font-black font-mono text-blue-400">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-slate-950 border border-white/5 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}


