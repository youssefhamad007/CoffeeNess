import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface CupModelProps {
  isHovered: boolean;
}

const CupModel: React.FC<CupModelProps> = ({ isHovered }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/scene.gltf');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const [baseScale, setBaseScale] = useState(1);

  // Center and scale model to fit
  useEffect(() => {
    if (!clonedScene || !meshRef.current) return;
    const bounds = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    bounds.getSize(size);
    bounds.getCenter(center);
    // Move model so its center is at the origin
    meshRef.current.position.copy(center.multiplyScalar(-1));
    // Determine a reasonable scale so the largest dimension fits a target size
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const desired = 4; // world units to fit within view
    setBaseScale(desired / maxDim);
  }, [clonedScene]);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle rotation animation
      meshRef.current.rotation.y += delta * 0.1;
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Scale on hover (set deterministically to avoid drift)
      const targetScale = baseScale * (isHovered ? 1.1 : 1);
      meshRef.current.scale.set(targetScale, targetScale, targetScale);
    }
  });

  return (
    <primitive ref={meshRef} object={clonedScene} position={[0, 0, 0]} />
  );
};

const CoffeeCup3D: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full h-64 md:h-[32rem] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 2.8, 6], fov: 40 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        
        <CupModel isHovered={isHovered} />
        
        <Environment preset="studio" />
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          target={[0, 0, 0]}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
};

export default CoffeeCup3D;