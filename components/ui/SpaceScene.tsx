'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, PerspectiveCamera } from '@react-three/drei';
import { SpaceshipModel } from './SpaceshipModel';
import * as THREE from 'three';

function FloatingParticles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  
  // Create particles with random positions
  useFrame((state) => {
    if (mesh.current) {
      for (let i = 0; i < count; i++) {
        // Update particle positions with time
        const t = state.clock.getElapsedTime() * 0.1;
        const x = Math.sin(t + i * 0.1) * 10;
        const y = Math.cos(t + i * 0.1) * 10;
        const z = Math.sin(t + i * 0.5) * 10 - 15;
        
        dummy.position.set(x, y, z);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#60A5FA" transparent opacity={0.8} />
    </instancedMesh>
  );
}

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={planetRef} position={[-15, 5, -30]}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial 
        color="#3B82F6" 
        metalness={0.2} 
        roughness={0.8}
        emissive="#1E40AF"
        emissiveIntensity={0.2}
      />
      <pointLight position={[0, 0, 0]} distance={20} intensity={2} color="#60A5FA" />
    </mesh>
  );
}

function SpaceEnvironment() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FFFFFF" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <FloatingParticles count={200} />
      <Planet />
      <SpaceshipModel position={[0, 0, -5]} scale={0.5} />
      <fog attach="fog" args={["#000000", 10, 50]} />
    </>
  );
}

export default function SpaceScene() {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full overflow-hidden">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
          <SpaceEnvironment />
        </Suspense>
      </Canvas>
    </div>
  );
}