import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 3;
      mouse.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 3;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.08;
    }
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.22;
      ring1.current.rotation.y -= delta * 0.14;
    }
    if (ring2.current) {
      ring2.current.rotation.y += delta * 0.28;
      ring2.current.rotation.z -= delta * 0.1;
    }
    if (lightRef.current) {
      lightRef.current.position.x += (mouse.current.x - lightRef.current.position.x) * 0.08;
      lightRef.current.position.y += (mouse.current.y - lightRef.current.position.y) * 0.08;
    }
  });

  return (
    <>
      <pointLight ref={lightRef} position={[0, 0, 3]} intensity={8} color="#00f0ff" distance={10} decay={1.8} />
      <directionalLight position={[3, 3, 2]} intensity={2.5} color="#bd00ff" />
      <directionalLight position={[-3, -3, -2]} intensity={1.5} color="#00f0ff" />
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[0.9, 0.28, 120, 16]} />
          <MeshDistortMaterial color="#080811" roughness={0.15} metalness={0.9} distort={0.4} speed={2.2} emissive="#110d29" />
        </mesh>
        <mesh ref={ring1}>
          <torusGeometry args={[1.7, 0.018, 16, 100]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} wireframe />
        </mesh>
        <mesh ref={ring2}>
          <torusGeometry args={[2.1, 0.012, 16, 100]} />
          <meshBasicMaterial color="#bd00ff" transparent opacity={0.3} wireframe />
        </mesh>
      </Float>
    </>
  );
};

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[520px] flex items-center justify-center select-none">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }} gl={{ antialias: true }} className="w-full h-full">
        <ambientLight intensity={0.2} />
        <InteractiveMesh />
      </Canvas>
    </div>
  );
}
