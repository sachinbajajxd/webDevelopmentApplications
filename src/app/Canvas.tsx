"use client"
import { Shape } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import RandomData from './Random'


const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [currentShape, setCurrentShape] = useState<THREE.Mesh | null>(null);
    const [scene, setScene] = useState<THREE.Scene | null>(null);
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
    const [isClear, setIsClear] = useState(false);
    // Function to create a shape (e.g., cube, sphere) and add it to the scene
    const createShape = (geometry: THREE.BufferGeometry, material: THREE.Material) => {
        if (scene) {
            if (currentShape) {
                scene.remove(currentShape);
            }
            const shape = new THREE.Mesh(geometry, material);
            scene.add(shape);
            setCurrentShape(shape);
            setIsClear(false);
            console.log(currentShape);
        }
    };

    const handleClear = () => {
        if (scene && currentShape) {
            setIsClear(!isClear);
            scene.remove(currentShape);
        }
    }

  // Function to save the current shape to local storage
  const saveShapeToLocalstorage = () => {
    if (currentShape) {
      const serializedShape = currentShape.toJSON();
      localStorage.setItem('savedShape', JSON.stringify(serializedShape));
      handleClear();
      window.alert("Shape saved to local storage successfully");
    }
  };

  // Initialize Three.js scene, camera, and renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
        
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      setScene(scene);
      setRenderer(renderer);

      camera.position.z = 5;
      const animate = () => {
        
        // Updating shape properties
        if(scene){
             // console.log(currentShape);
            scene.rotation.x += 0.02;
            scene.rotation.y += 0.02;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const width = window.innerWidth;
          const height = window.innerHeight * 0.7; 
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      };
  
      handleResize(); // Initial sizing
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div className="w-full h-80vh relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="mt-5 flex justify-center space-x-5 p-5">
        <button className='bg-gray-500 p-2' onClick={() => createShape(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xE1B572 }))}>
          Draw Cube
        </button>
        <button className='bg-gray-500 p-2' onClick={() => createShape(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshBasicMaterial({ color: 0x3D85C6 }))}>
          Draw Cuboid
        </button>
        <button className='bg-gray-500 p-2' onClick={() => createShape(new THREE.ConeGeometry(1, 2, 32), new THREE.MeshBasicMaterial({ color: 0xff0000 }))}>
          Draw Cone
        </button>
        <button className='bg-gray-500 p-2' onClick={() => createShape(new THREE.TorusGeometry(2, 1, 20, 20), new THREE.MeshBasicMaterial({ color: 0x7F6000 }))}>
          Draw Torus
        </button>
        <button className='bg-red-700 p-2' onClick={handleClear}>
          Clear
        </button>
        <button className='bg-green-500 p-2' onClick={saveShapeToLocalstorage}>Save Shape</button>
      </div>
      {currentShape && !isClear && <RandomData />}
    </div>
  );
};

export default Canvas;
