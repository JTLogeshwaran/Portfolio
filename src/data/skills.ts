export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "C Programming", level: 90 },
      { name: "Basic Java", level: 75 },
      { name: "JavaScript", level: 80 }
    ]
  },
  {
    title: "Embedded & IoT",
    skills: [
      { name: "ESP32 Basics", level: 85 },
      { name: "Arduino Basics", level: 88 },
      { name: "IoT Fundamentals", level: 85 }
    ]
  },
  {
    title: "Web & Tools",
    skills: [
      { name: "HTML & CSS", level: 90 },
      { name: "Git & GitHub Basics", level: 80 }
    ]
  },
  {
    title: "Core Competencies",
    skills: [
      { name: "Problem Solving", level: 85 },
      { name: "Embedded Development", level: 80 },
      { name: "Technical Research", level: 85 }
    ]
  }
];
