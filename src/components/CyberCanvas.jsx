import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CyberCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020204, 0.015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x020208, 1);

    // 2. Setup Particles
    const count = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Widespread particle cloud coordinates
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 20;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      initialPositions[idx] = x;
      initialPositions[idx + 1] = y;
      initialPositions[idx + 2] = z;

      speeds[i] = 0.05 + Math.random() * 0.15;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Glow dot material
    const material = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.12,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Setup Concentric HUD Rings
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0, 0, -5);
    scene.add(ringGroup);

    const ringMat1 = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.06 });
    const ringGeom1 = new THREE.RingGeometry(12, 12.05, 64);
    const ring1 = new THREE.LineSegments(new THREE.EdgesGeometry(ringGeom1), ringMat1);
    ring1.rotation.x = Math.PI / 3.5;
    ringGroup.add(ring1);

    const ringMat2 = new THREE.LineBasicMaterial({ color: 0xbd00ff, transparent: true, opacity: 0.07 });
    const ringGeom2 = new THREE.RingGeometry(8, 8.04, 64);
    const ring2 = new THREE.LineSegments(new THREE.EdgesGeometry(ringGeom2), ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    const ringMat3 = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.04 });
    const ringGeom3 = new THREE.RingGeometry(4, 4.02, 32);
    const ring3 = new THREE.LineSegments(new THREE.EdgesGeometry(ringGeom3), ringMat3);
    ringGroup.add(ring3);

    // 4. Mouse Move Handler
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.015;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.015;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Slow scene rotation
      particles.rotation.y = time * 0.015;
      particles.rotation.x = time * 0.005;

      // Interactive particle distortion
      const posArray = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const x = initialPositions[idx];
        const y = initialPositions[idx + 1];

        // Animate position slightly using sine waves
        posArray[idx + 1] = y + Math.sin(time * speeds[i] + phases[i]) * 0.4;
        posArray[idx] = x + Math.cos(time * (speeds[i] * 0.5) + phases[i]) * 0.3;

        // Apply mouse warp force
        const dx = posArray[idx] - mouseX;
        const dy = posArray[idx + 1] - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 8) {
          const force = (8 - dist) * 0.025;
          posArray[idx] += (dx / dist) * force;
          posArray[idx + 1] += (dy / dist) * force;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Rotate rings
      ring1.rotation.z = time * 0.08;
      ring2.rotation.z = -time * 0.12;
      ring3.rotation.z = time * 0.05;

      // Shift camera slightly based on mouse
      camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose WebGL resources
      geometry.dispose();
      material.dispose();
      ringGeom1.dispose();
      ringGeom2.dispose();
      ringGeom3.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      ringMat3.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#020204]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Film grain overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

