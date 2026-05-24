import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Star, Trophy, BookOpen, Briefcase, Award } from 'lucide-react';

interface Achievement {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

interface Education {
  stage: string;
  institution: string;
  details: string;
  year: string;
}

export default function Experience() {
  const achievements: Achievement[] = [
    {
      title: "Certifications",
      icon: <Award className="text-blue-400" size={20} />,
      items: [
        "Full Stack Development — NxtWave Academy",
        "C & Java Programming Fundamentals — NxtWave / NASSCOM",
        "IoT Foundations & Embedded Systems — Online Certification"
      ]
    },
    {
      title: "Sports & Games",
      icon: <Trophy className="text-yellow-400" size={20} />,
      items: [
        "1st Place - Chess Sona College Competition (1st Year)",
        "2nd Place - Chess Sona College Competition (2nd Year)",
        "1st Prize - 100m Athletics Running Sprint"
      ]
    },
    {
      title: "Relevant Coursework",
      icon: <BookOpen className="text-pink-400" size={20} />,
      items: [
        "Digital Electronics & Logic Design",
        "Programming Fundamentals & OOP Basics",
        "Embedded Systems & Data Structures",
        "Computer Networks Fundamentals"
      ]
    },
    {
      title: "Activities & Leadership",
      icon: <Briefcase className="text-purple-400" size={20} />,
      items: [
        "Active participant in technical competitions and hardware hackathons",
        "Organized peer study sessions on digital logic systems",
        "Team lead in embedded automation product design"
      ]
    }
  ];

  const education: Education[] = [
    {
      stage: "B.E. Electronics & Computer Engineering",
      institution: "Sona College of Technology, Salem",
      details: "Academic CGPA: 8.36/10 · Active in technical clubs, IoT project teams, and inter-department competitions.",
      year: "2024 - 2028"
    },
    {
      stage: "12th Standard (HSC)",
      institution: "SRV Boys Higher Secondary School",
      details: "Higher secondary education completed with a score of 512 marks.",
      year: "Completed"
    },
    {
      stage: "10th Standard (SSLC)",
      institution: "Jayarani Matric Higher Secondary School",
      details: "Secondary education completed successfully with an All Pass result.",
      year: "Completed"
    }
  ];

  return (
    <section id="experience" className="py-28 relative overflow-hidden bg-transparent">
      {/* Ambient glowing circles */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-blue-600/5 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-[95px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10 flex items-center gap-3 font-heading uppercase tracking-wide text-white">
              <GraduationCap className="text-blue-500 animate-pulse" size={30} /> Experience & Education
            </h2>
            <div className="h-[3px] w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto" />
          </motion.div>
        </div>

        {/* Parallel Grid: Education Timeline & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Glowing Education Timeline (span 5) */}
          <div className="lg:col-span-5 space-y-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Star size={18} />
              </div>
              <h3 className="text-xl font-bold font-heading text-white tracking-wide uppercase">Education Journey</h3>
            </div>

            {/* Glowing circuit line */}
            <div className="relative border-l border-white/5 ml-3 pl-8 space-y-10">
              {/* Virtual circuit glowing trace path overlay */}
              <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-30 pointer-events-none" />
              
              {education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline bullet nodes */}
                  <span className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#020204] border border-blue-500/50 flex items-center justify-center shadow-lg shadow-blue-500/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500/80 animate-pulse" />
                  </span>
                  
                  <div className="glassmorphism p-6 sm:p-7 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    
                    <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
                      {edu.year}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white font-heading mb-1 group-hover:text-blue-400 transition-colors duration-300">
                      {edu.stage}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-400 mb-3 font-heading">
                      {edu.institution}
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-body">
                      {edu.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Key Achievements & Leadership (span 7) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Trophy size={18} />
              </div>
              <h3 className="text-xl font-bold font-heading text-white tracking-wide uppercase">Core Achievements</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {achievements.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glassmorphism p-6 sm:p-7 rounded-3xl relative overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Decorative background flare */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

                  <div>
                    <div className="flex items-center gap-3 mb-5 relative z-10">
                      <div className="w-9 h-9 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-purple-500/30 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white font-heading">
                        {item.title}
                      </h3>
                    </div>

                    <ul className="space-y-3 relative z-10">
                      {item.items.map((line, lineIdx) => (
                        <li key={lineIdx} className="flex gap-2 text-xs text-slate-400 leading-relaxed font-body">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0 mt-2 group-hover:bg-purple-400 transition-colors duration-300" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}





