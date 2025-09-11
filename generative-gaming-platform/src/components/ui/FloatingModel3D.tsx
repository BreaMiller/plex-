import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface FloatingModel3DProps {
  className?: string;
}

const FloatingModel3D: React.FC<FloatingModel3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(60); // Scaled down for better balance

  // Get responsive scale based on screen size - reduced for better proportions
  const getResponsiveScale = useCallback(() => {
    if (typeof window === 'undefined') return 60;
    
    const width = window.innerWidth;
    if (width < 768) return 25; // Mobile scale - more appropriate size
    if (width < 1024) return 35; // Tablet scale - balanced
    return 60; // Desktop scale - prominent but not overwhelming
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

    // Enhanced camera setup for better isometric view
    const camera = new THREE.PerspectiveCamera(
      45, // Reduced FOV for more dramatic perspective
      width / height,
      0.1,
      2000 // Increased far plane for larger model
    );
    
    // Better isometric positioning - more dramatic angle
    camera.position.set(50, 40, 50);
    camera.lookAt(0, 0, 0);

    // Enhanced renderer setup
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
    renderer.toneMappingExposure = 1.4;
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);

    // Enhanced lighting for maximum visibility and dramatic effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2); // Significantly increased ambient light
    scene.add(ambientLight);

    // Primary cyan light from top-right - increased intensity
    const directionalLight1 = new THREE.DirectionalLight(0x00ffff, 3.5); // Increased from 2.0
    directionalLight1.position.set(40, 40, 20);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 4096;
    directionalLight1.shadow.mapSize.height = 4096;
    directionalLight1.shadow.camera.near = 1;
    directionalLight1.shadow.camera.far = 200;
    directionalLight1.shadow.camera.left = -100;
    directionalLight1.shadow.camera.right = 100;
    directionalLight1.shadow.camera.top = 100;
    directionalLight1.shadow.camera.bottom = -100;
    scene.add(directionalLight1);

    // Secondary magenta light from left - increased intensity
    const directionalLight2 = new THREE.DirectionalLight(0xff00ff, 2.5); // Increased from 1.2
    directionalLight2.position.set(-30, 20, 10);
    scene.add(directionalLight2);

    // Rim light for dramatic edge lighting - increased intensity
    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 2.0); // Increased from 1.0
    rimLight.position.set(0, -20, -30);
    scene.add(rimLight);

    // Additional white light for overall brightness
    const additionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    additionalLight.position.set(10, 30, -10);
    scene.add(additionalLight);

    // Pink atmospheric light for enhanced visual appeal
    const pinkAtmosphericLight = new THREE.DirectionalLight(0xff69b4, 1.5);
    pinkAtmosphericLight.position.set(20, -10, 30);
    scene.add(pinkAtmosphericLight);

    // Soft pink ambient enhancement
    const pinkAmbientLight = new THREE.AmbientLight(0xff1493, 0.3);
    scene.add(pinkAmbientLight);

    // Load GLB model
    const loader = new GLTFLoader();
    
    loader.load(
      '/models/isometric_cavern_brea_new.glb', // Updated to use the latest version
      (gltf) => {
        const model = gltf.scene;
        
        // REQUIREMENT: Scale model to appropriate size - balanced and not overwhelming
        const currentScale = getResponsiveScale();
        model.scale.set(currentScale, currentScale, currentScale);
        
        // Position for better visibility with larger scale
        model.position.set(
          15,  // X: Position to the right
          -5,  // Y: Lower for better balance
          10   // Z: Forward position for depth
        );
        
        // Better rotation for isometric appeal
        model.rotation.y = Math.PI * 0.15;
        model.rotation.x = Math.PI * 0.02;
        
        // Enable shadows and enhance materials
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Enhanced material properties
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.metalness = 0.4;
                    mat.roughness = 0.3;
                    mat.envMapIntensity = 1.5;
                  }
                });
              } else if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.metalness = 0.4;
                child.material.roughness = 0.3;
                child.material.envMapIntensity = 1.5;
              }
            }
          }
        });
        
        modelRef.current = model;
        scene.add(model);
        setIsLoaded(true);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
      },
      (error) => {
        console.error('Error loading GLB model:', error);
        setError('Failed to load 3D model');
      }
    );

    // Animation loop - REMOVED all interaction-based animations, keeping only floating
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      if (modelRef.current) {
        // Simple floating animation only - no rotation interactions
        modelRef.current.position.y = -5 + Math.sin(elapsedTime * 0.6) * 0.8;
        
        // Maintain fixed rotation - no hover or interaction effects
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

    // REMOVED: All mouse and keyboard interaction handlers to fix disappearing issue
    // The model is now purely decorative with only floating animation

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      resizeObserver.disconnect();
      
      // REMOVED: All event listener cleanup since we removed the handlers
      
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
  }, [getResponsiveScale]); // Removed isHovered, isRotating, handleClick, handleKeyDown dependencies

  // Respect user's reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches && animationRef.current) {
        // Stop animations but keep the model visible
        cancelAnimationFrame(animationRef.current);
        if (rendererRef.current && sceneRef.current) {
          const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
          camera.position.set(50, 40, 50);
          camera.lookAt(0, 0, 0);
          rendererRef.current.render(sceneRef.current, camera);
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

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
            <div className="w-16 h-16 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-sm text-cyan-400/80">Loading 3D Model...</p>
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
    </div>
  );
};

export default FloatingModel3D;