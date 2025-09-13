import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface CupModelProps {
  isHovered: boolean;
}

const CupModel: React.FC<CupModelProps> = ({ isHovered }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('scene.gltf');
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
  const [isInteracting, setIsInteracting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    setShowTooltip(false);
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
    setTimeout(() => setShowTooltip(true), 2000);
  };

  return (
    <div className="w-full h-64 md:h-[32rem] relative">
      {/* Simple Tooltip */}
      {showTooltip && !isHovered && !isInteracting && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 floating-tooltip">
          <div className="bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2 border border-white/20">
            <span className="loader"></span>
            <span>Move me around!</span>
          </div>
        </div>
      )}

      <div 
        className="w-full h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
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
            onStart={handleInteractionStart}
            onEnd={handleInteractionEnd}
          />
        </Canvas>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .loader {
            width: 48px;
            height: 48px;
            border: 2px solid #FFF;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            box-sizing: border-box;
            animation: rotation_35 4s linear infinite;
          }

          .loader::after,
          .loader::before {
            content: '';
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            background: greenyellow;
            width: 6px;
            height: 6px;
            transform: translate(150%, 150%);
            border-radius: 50%;
          }

          .loader::before {
            left: auto;
            top: auto;
            right: 0;
            bottom: 0;
            transform: translate(-150%, -150%);
          }

          .floating-tooltip {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes rotation_35 {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translate(-50%, 0px);
            }
            50% {
              transform: translate(-50%, -8px);
            }
          }
        `
      }} />
    </div>
  );
};

export default CoffeeCup3D;