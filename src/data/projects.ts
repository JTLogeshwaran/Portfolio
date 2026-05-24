export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
  category: string;
  highlights: string[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Solvania IQ — Smart Solar Optimization",
    description: "IoT-based smart energy optimization system using sensor-driven monitoring and automated workflows. Tracks real-time parameters and distributes power efficiently via ESP32 microcontrollers.",
    tech: ["ESP32", "C Programming", "Solar Sensors", "IoT"],
    image: "/projects/solvania_iq.png",
    github: "https://github.com/thelogeshwaran",
    demo: "#",
    category: "IoT / Embedded",
    highlights: ["Real-time power monitoring", "Automated load balancing", "ESP32 microcontroller"]
  },
  {
    id: 2,
    title: "AIFS — Automated IV Failsafe System",
    description: "Healthcare safety system for automated IV flow monitoring with real-time alerts. Built around sensor-driven safety checkpoints and embedded design patterns to prevent medical errors.",
    tech: ["Arduino", "C Programming", "Flow Sensors", "Embedded Systems"],
    image: "/projects/aifs.png",
    github: "https://github.com/thelogeshwaran",
    demo: "#",
    category: "Healthcare Tech",
    highlights: ["Real-time IV flow alerts", "Emergency failsafe logic", "Patient safety system"]
  },
  {
    id: 3,
    title: "Smart Plant Monitor",
    description: "IoT system that monitors soil moisture, temperature, and humidity in real time, transmitting live data to cloud dashboards for remote agricultural management.",
    tech: ["ESP32", "DHT22", "ThingSpeak API", "C Programming"],
    image: "/projects/smart_plant.png",
    github: "https://github.com/thelogeshwaran",
    demo: "#",
    category: "Smart Agriculture",
    highlights: ["Live cloud dashboard", "Multi-sensor integration", "Remote monitoring"]
  },
  {
    id: 4,
    title: "Home Automation System",
    description: "Controls home appliances remotely using digital relay interfaces with real-time feedback, manual overrides, and a mobile-accessible control panel via Blynk IoT.",
    tech: ["ESP8266", "Relay Control", "Blynk IoT", "C++"],
    image: "/projects/home_automation.png",
    github: "https://github.com/thelogeshwaran",
    demo: "#",
    category: "Smart Home",
    highlights: ["Mobile remote control", "Real-time feedback", "Manual override system"]
  },
  {
    id: 5,
    title: "Health Tracker Wearable",
    description: "Wearable band that tracks real-time heart rate and body temperature, displaying live readings on a micro OLED panel — built for continuous health monitoring.",
    tech: ["MAX30100", "OLED Display", "Arduino", "Sensors"],
    image: "/projects/health_tracker.png",
    github: "https://github.com/thelogeshwaran",
    demo: "#",
    category: "Wearable Tech",
    highlights: ["Real-time heart rate tracking", "OLED live display", "Wearable form factor"]
  }
];
