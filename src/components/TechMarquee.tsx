import React from 'react';

export default function TechMarquee() {
  const techs = [
    "C Programming", "Basic Java", "JavaScript", "ESP32 IoT", "Arduino", 
    "HTML5", "CSS3", "Git & GitHub", "Embedded Systems", 
    "Digital Electronics", "Problem Solving"
  ];

  return (
    <div className="w-full py-6 border-y border-white/5 bg-[#03050c]/80 backdrop-blur-md overflow-hidden relative z-10 select-none">
      <div className="flex w-max gap-12 animate-scroll-left">
        {/* Render twice for a seamless infinite loop */}
        {[...techs, ...techs].map((tech, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-3.5 text-slate-400 font-heading font-semibold tracking-wider uppercase shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            <span className="text-xs sm:text-sm hover:text-white transition-colors duration-300 whitespace-nowrap">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
