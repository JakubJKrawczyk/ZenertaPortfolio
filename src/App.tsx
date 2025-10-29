import './App.css'
import * as THREE from 'three'; 
import React, {useEffect, useRef} from 'react';

function App() {

 const ThreeScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!mountRef.current) return;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);

        if(mountRef.current){
          mountRef.current.appendChild(renderer.domElement);
        }

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 0, 1).normalize();
        scene.add(light);
        renderer.render(scene, camera);
        return () => {
          renderer.dispose();
        }
    }, []);
    return <div ref={mountRef} className="threejs-container" />;

  }


  return (
    <> 
      <main id="app">

        <ThreeScene />        
      </main>
    </>
  )
}

export default App
