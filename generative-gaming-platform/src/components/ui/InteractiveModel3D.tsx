import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const Model: React.FC<ModelProps> = ({ 
  modelPath, 
  scale = 10, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0] 
}) => {
  const modelRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const gltf = useGLTF(modelPath);
  const model = gltf.scene.clone();
  
  // Get responsive scale based on screen size
  const getResponsiveScale = () => {
    if (typeof window === 'undefined') return scale;
    
    const width = window.innerWidth;
    if (width < 768) return scale * 0.4; // Mobile: 40% of base scale
    if (width < 1024) return scale * 0.6; // Tablet: 60% of base scale
    return scale; // Desktop: full scale
  };

  const [responsiveScale, setResponsiveScale] = useState(getResponsiveScale());

  useEffect(() => {
    const handleResize = () => {
      setResponsiveScale(getResponsiveScale());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scale]);

  // Handle click rotation animation
  const handleClick = () => {
    if (isClicked) return;
    
    setIsClicked(true);
    
    if (modelRef.current) {
      const startRotation = modelRef.current.rotation.y;
      const targetRotation = startRotation + Math.PI * 2;
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        if (modelRef.current) {
          modelRef.current.rotation.y = startRotation + (targetRotation - startRotation) * easeProgress;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsClicked(false);
        }
      };
      
      animate();
    }
  };

  // Animation loop for floating and hover effects
  useFrame((state) => {
    if (modelRef.current && !isClicked) {
      // Enhanced floating animation
      const time = state.clock.elapsedTime;
      
      // Base floating motion
      modelRef.current.position.y = position[1] + Math.sin(time * 0.6) * 0.8;
      
      // Hover effects
      if (isHovered) {
        // More dramatic hover rotation and scale
        modelRef.current.rotation.y = rotation[1] + Math.sin(time * 2) * 0.05;
        modelRef.current.scale.setScalar(responsiveScale * 1.1);
      } else {
        // Subtle idle rotation
        modelRef.current.rotation.y = rotation[1] + Math.sin(time * 0.3) * 0.02;
        modelRef.current.scale.setScalar(responsiveScale);
      }
      
      // Subtle X-axis rotation
      modelRef.current.rotation.x = rotation[0] + Math.sin(time * 0.2) * 0.01;
    }
  });

  // Clone and prepare the model
  
  // Enhance materials for better visual appeal
  model.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat: any) => {
            if (mat.isMeshStandardMaterial) {
              mat.metalness = 0.4;
              mat.roughness = 0.3;
              mat.envMapIntensity = 1.5;
            }
          });
        } else if (child.material.isMeshStandardMaterial) {
          child.material.metalness = 0.4;
          child.material.roughness = 0.3;
          child.material.envMapIntensity = 1.5;
        }
      }
    }
  });

  return (
    <group
      ref={modelRef}
      position={position}
      rotation={rotation}
      scale={responsiveScale}
      onClick={handleClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <primitive object={model} />
      
      {/* Hover glow effect */}
      {isHovered && (
        <pointLight
          position={[0, 2, 0]}
          color={0x00ffff}
          intensity={0.8}
          distance={20}
          decay={2}
        />
      )}
      
      {/* Sparkle effects on hover */}
      {isHovered && (
        <Sparkles
          count={50}
          scale={[8, 8, 8]}
          size={2}
          speed={0.6}
          opacity={0.8}
          color={0x00ffff}
        />
      )}
    </group>
  );
};

// Enhanced lighting setup
const SceneLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.8} color={0xffffff} />
      
      {/* Primary cyan light from top-right */}
      <directionalLight
        position={[40, 40, 20]}
        intensity={2.0}
        color={0x00ffff}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={1}
        shadow-camera-far={200}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      
      {/* Secondary magenta light from left */}
      <directionalLight
        position={[-30, 20, 10]}
        intensity={1.2}
        color={0xff00ff}
      />
      
      {/* Rim light for dramatic edge lighting */}
      <directionalLight
        position={[0, -20, -30]}
        intensity={1.0}
        color={0x8b5cf6}
      />
    </>
  );
};

// Main camera setup for better isometric view
const CameraSetup: React.FC = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    // Enhanced camera positioning for dramatic isometric view
    if (camera.type === 'PerspectiveCamera') {
      const perspectiveCamera = camera as THREE.PerspectiveCamera;
      perspectiveCamera.position.set(50, 40, 50);
      perspectiveCamera.lookAt(0, 0, 0);
      perspectiveCamera.fov = 45;
      perspectiveCamera.updateProjectionMatrix();
    }
  }, [camera]);
  
  return null;
};

interface InteractiveModel3DProps {
  className?: string;
  modelPath?: string;
  scale?: number;
  enableControls?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const InteractiveModel3D: React.FC<InteractiveModel3DProps> = ({
  className = '',
  modelPath = '/models/isometric_cavern_brea.glb',
  scale = 30, // 10x bigger than original (3 * 10)
  enableControls = false,
  position = [15, -5, 10],
  rotation = [Math.PI * 0.02, Math.PI * 0.15, 0]
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Preload the model
  useGLTF.preload(modelPath);

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '600px' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 45, position: [50, 40, 50] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4
        }}
        onCreated={() => setIsLoading(false)}
        onError={(error) => {
          console.error('Canvas error:', error);
          setError('Failed to initialize 3D scene');
        }}
      >
        <CameraSetup />
        <SceneLighting />
        
        {/* Environment for realistic reflections */}
        <Environment preset="studio" />
        
        {/* Floating wrapper for gentle movement */}
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
          <Model
            modelPath={modelPath}
            scale={scale}
            position={position}
            rotation={rotation}
          />
        </Float>
        
        {/* Optional orbit controls for debugging */}
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
          />
        )}
      </Canvas>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-sm text-cyan-400/80">Loading Interactive 3D Model...</p>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-red-400 text-2xl">⚠</span>
            </div>
            <p className="text-sm text-red-400/80">{error}</p>
          </div>
        </div>
      )}
      
      {/* Interaction hint */}
      {!isLoading && !error && (
        <div className="absolute bottom-4 right-4 text-xs text-slate-400/70">
          Hover and click to interact
        </div>
      )}
    </div>
  );
};

export default InteractiveModel3D;