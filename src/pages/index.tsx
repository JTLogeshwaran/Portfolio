import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Resume from '../components/Resume';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Loader = dynamic(() => import('../components/Loader'), { ssr: false });
const CustomCursor = dynamic(() => import('../components/CustomCursor'), { ssr: false });
const CyberCanvas = dynamic(() => import('../components/CyberCanvas'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress(window.scrollY / total);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', onScroll);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [loading]);

  return (
    <>
      {/* Cinematic preloader */}
      <Loader onComplete={() => setLoading(false)} />

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="relative min-h-screen text-white overflow-x-hidden bg-[#020208]"
          >
            {/* Custom cursor */}
            <CustomCursor />

            {/* 3D WebGL particle background */}
            <CyberCanvas />

            {/* Cyber grid overlay */}
            <div className="cyber-grid" />
            <div className="cyber-overlay" />

            {/* Scroll progress bar */}
            <div
              className="fixed top-0 left-0 right-0 h-[2px] z-[9998] origin-left bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />

            {/* Navigation */}
            <Navbar />

            {/* All sections */}
            <main className="relative z-20">
              <Hero />
              <TechMarquee />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Resume />
              <Certificates />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
