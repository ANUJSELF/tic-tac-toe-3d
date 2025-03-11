import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Logo() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4F46E5" />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <Canvas className="w-full h-[300px]">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Logo />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
    </Canvas>
  );
}