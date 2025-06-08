'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// This is a simplified spaceship model using Three.js primitives
// In a production app, you'd likely use a proper 3D model loaded with useGLTF
export function SpaceshipModel(props: { scale?: number; position?: [number, number, number]; rotation?: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  
  // Animate the spaceship with subtle floating motion
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Main body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[0.7, 2, 16, 32]} />
        <meshStandardMaterial 
          color="#3B82F6" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#1E40AF"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Cockpit */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0.4]}>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial 
          color="#93C5FD" 
          metalness={0.2} 
          roughness={0.1} 
          transparent={true}
          opacity={0.8}
          emissive="#60A5FA"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Wings */}
      <mesh castShadow receiveShadow position={[0.8, -0.2, -0.3]} rotation={[0, 0, Math.PI * 0.1]}>
        <boxGeometry args={[1, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#2563EB" 
          metalness={0.7} 
          roughness={0.3}
          emissive="#1E40AF"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      <mesh castShadow receiveShadow position={[-0.8, -0.2, -0.3]} rotation={[0, 0, -Math.PI * 0.1]}>
        <boxGeometry args={[1, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#2563EB" 
          metalness={0.7} 
          roughness={0.3}
          emissive="#1E40AF"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Engine glow */}
      <pointLight position={[0, -1.2, -0.5]} distance={2} intensity={5} color="#60A5FA" />
      <mesh position={[0, -1.2, -0.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}