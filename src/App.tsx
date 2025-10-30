import './App.css'
import * as THREE from 'three'; 
import React, {useEffect, useRef} from 'react';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import {createRoot} from "react-dom/client";
import Main from "./components/Main.tsx";

function App() {
    let canvasRendered: boolean = false;
    let htmlRendered: boolean = false;
 const ThreeScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if(!mountRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#fff")
        const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0,0,0)

        // Main canvas renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight, true);
        renderer.domElement.className = "main-canvas";

        if(mountRef.current && !canvasRendered){
          mountRef.current.appendChild(renderer.domElement);
        }

        // HTML Content renderer
        const HTMLRenderer = new CSS3DRenderer();
        HTMLRenderer.setSize(window.innerWidth, window.innerHeight, true);
        HTMLRenderer.domElement.className = "main-html";

        const distance = 500; // odległość obiektu od kamery
        const vFOV = THREE.MathUtils.degToRad(camera.fov);
        const height = 2 * Math.tan(vFOV / 2) * distance;
        const width = height * camera.aspect;

        const mainContent = document.createElement('div');
        mainContent.style.width = `${width}px`;
        mainContent.style.height = `${height}px`;
        mainContent.className = "main-html-container"
        const root = createRoot(mainContent);
        root.render(<Main/>)

        const cssObject = new CSS3DObject(mainContent)
        cssObject.position.set(0,0,-distance)
        cssObject.scale.set(1,1,1)
        scene.add(cssObject)

        if(mountRef.current && !htmlRendered){
            mountRef.current.appendChild(HTMLRenderer.domElement);
          }

        renderer.render(scene, camera);

        console.log('CSS Object position:', cssObject.position);
        console.log('Camera position:', camera.position);
        console.log('Distance:', camera.position.distanceTo(cssObject.position));

        canvasRendered = true;
        htmlRendered = true;

        const MainLoop = () => {
            requestAnimationFrame(MainLoop)

            renderer.render(scene, camera);
            HTMLRenderer.render(scene, camera)
        }

        MainLoop();

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
