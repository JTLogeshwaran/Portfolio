import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const enter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!el.closest('a, button, [role="button"], input, textarea'));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', enter);

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', enter);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:block"
        style={{ width: 10, height: 10 }}>
        <div className="w-full h-full rounded-full transition-all duration-100"
          style={{
            background: hovered ? '#a855f7' : '#3b82f6',
            transform: clicked ? 'scale(0.5)' : hovered ? 'scale(1.8)' : 'scale(1)',
            boxShadow: `0 0 ${hovered ? 14 : 8}px ${hovered ? '#a855f7' : '#3b82f6'}`,
            transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s'
          }} />
      </div>
      {/* Ring */}
      <div ref={ringRef} className="fixed top-0 left-0 z-[99998] pointer-events-none hidden md:block"
        style={{ width: 40, height: 40 }}>
        <div className="w-full h-full rounded-full border transition-all duration-200"
          style={{
            borderColor: hovered ? 'rgba(168,85,247,0.6)' : 'rgba(59,130,246,0.4)',
            transform: clicked ? 'scale(0.8)' : hovered ? 'scale(1.5)' : 'scale(1)',
            transition: 'border-color 0.2s, transform 0.2s'
          }} />
      </div>
    </>
  );
}
