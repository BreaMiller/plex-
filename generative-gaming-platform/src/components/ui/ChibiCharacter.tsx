import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface ChibiCharacterProps {
  className?: string;
}

const ChibiCharacter: React.FC<ChibiCharacterProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(60);

  // Get responsive scale based on screen size
  const getResponsiveScale = useCallback(() => {
    if (typeof window === 'undefined') return 60;
    
    const width = window.innerWidth;
    if (width < 768) return 25; // Mobile scale
    if (width < 1024) return 35; // Tablet scale
    return 60; // Desktop scale
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newScale = getResponsiveScale();
      setScale(newScale);
      if (modelRef.current) {
        modelRef.current.scale.set(newScale, newScale, newScale);
      }
    };

    handleResize(); // Set initial scale
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveScale]);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - isometric view with wider perspective
    const camera = new THREE.PerspectiveCamera(
      45, // FOV: 45° (wider perspective)
      width / height,
      0.1,
      2000
    );
    
    // Camera position: isometric angle
    camera.position.set(50, 40, 50);
    camera.lookAt(0, 0, 0); // Looks at center origin

    // Renderer setup - Clean transparent canvas
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    // Ensure transparent background
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    // Remove any borders or background from canvas
    renderer.domElement.style.border = 'none';
    renderer.domElement.style.background = 'transparent';
    
    currentMount.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Primary light
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight1.position.set(10, 15, 5);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 2048;
    directionalLight1.shadow.mapSize.height = 2048;
    directionalLight1.shadow.camera.near = 1;
    directionalLight1.shadow.camera.far = 100;
    directionalLight1.shadow.camera.left = -20;
    directionalLight1.shadow.camera.right = 20;
    directionalLight1.shadow.camera.top = 20;
    directionalLight1.shadow.camera.bottom = -20;
    scene.add(directionalLight1);

    // Secondary cyan light
    const directionalLight2 = new THREE.DirectionalLight(0x00ffff, 1.0);
    directionalLight2.position.set(-8, 10, 8);
    scene.add(directionalLight2);

    // Pink accent light
    const pinkLight = new THREE.DirectionalLight(0xff69b4, 0.8);
    pinkLight.position.set(5, -5, -10);
    scene.add(pinkLight);

    // Load GLB model
    const loader = new GLTFLoader();
    
    loader.load(
      '/models/chibi.glb',
      (gltf) => {
        const model = gltf.scene;
        
        // Responsive scale based on screen size
        const currentScale = getResponsiveScale();
        model.scale.set(currentScale, currentScale, currentScale);
        
        // Position: (15, -5, 10) - positioned to the right
        model.position.set(15, -5, 10);
        
        // Fixed rotation angles (no dynamic rotation)
        model.rotation.y = Math.PI * 0.15;
        model.rotation.x = Math.PI * 0.02;
        
        // Enable shadows and enhance materials
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    // Matte appearance
                    mat.metalness = 0.2;
                    mat.roughness = 0.4;
                    mat.envMapIntensity = 1.0;
                  }
                });
              } else if (child.material instanceof THREE.MeshStandardMaterial) {
                // Matte appearance
                child.material.metalness = 0.2;
                child.material.roughness = 0.4;
                child.material.envMapIntensity = 1.0;
              }
            }
          }
        });
        
        modelRef.current = model;
        scene.add(model);
        setIsLoaded(true);
      },
      (progress) => {
        console.log('Chibi loading progress:', (progress.loaded / progress.total) * 100, '%');
      },
      (error) => {
        console.error('Error loading chibi GLB model:', error);
        setError('Failed to load character model');
      }
    );

    // Animation loop - Z-axis animation (forward/backward motion)
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      if (modelRef.current) {
        // Forward/backward floating: Z-axis movement
        modelRef.current.position.z = 10 + Math.sin(elapsedTime * 0.6) * 1.2;
        
        // Fixed rotation angles (no dynamic rotation)
        modelRef.current.rotation.y = Math.PI * 0.15;
        modelRef.current.rotation.x = Math.PI * 0.02;
      }
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount || !renderer) return;
      
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      const newAspect = newWidth / newHeight;
      
      camera.aspect = newAspect;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(currentMount);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      resizeObserver.disconnect();
      
      if (currentMount && renderer?.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [getResponsiveScale]);

  return (
    <div className={`relative ${className}`}>
      <div 
        className="w-full h-full transition-opacity duration-300"
        style={{ minHeight: '600px' }}
        aria-hidden="true"
      >
        <div ref={mountRef} className="w-full h-full" />
      </div>
      
      {/* Loading indicator */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-sm text-cyan-400/80">Loading Character...</p>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-red-400 text-xl">⚠</span>
            </div>
            <p className="text-sm text-red-400/80">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChibiCharacter;