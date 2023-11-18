import React, { useEffect, useState } from "react";
import * as THREE from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const ThreeDModelViewer = () => {
  const [zoom, setZoom] = useState(5);
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Declare renderer outside of useEffect
  let rendererContainer;

  useEffect(() => {
    rendererContainer && rendererContainer.appendChild(renderer.domElement);
  }, []);

  const loader = new OBJLoader();

  const material = new THREE.MeshBasicMaterial({ color: "#e0ac69" });

  loader.load("/3d.obj", (loadedObject) => {
    loadedObject.traverse((child) => {
      console.log(child);
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    scene.add(loadedObject);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Corrected ambient light color (white)
    scene.add(ambientLight);

    // Position and rotate the camera to view the loaded object
    camera.position.set(10, 30, 0);
    loadedObject.position.set(0, 0, -8);
    loadedObject.rotation.y = 4.75;

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();
  });

  loader.load("/3d.obj", (loadedObject) => {
    loadedObject.traverse((child) => {
      console.log(child);
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    scene.add(loadedObject);

    const ambientLight = new THREE.AmbientLight(0x404040);
    const light = new THREE.PointLight("#880808", 1, 100);
    light.position.set(50, 50, 50);
    scene.add(light);

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
    scene.add(pointLightHelper); // Corrected ambient light color (white)
    scene.add(ambientLight);

    loadedObject.position.set(0, 0, 8);
    loadedObject.rotation.y = 1.75;

    // Position and rotate the camera to view the loaded object
    camera.position.set(30, 20, 0);
    camera.lookAt(0, 20, 0);
  });

  useEffect(() => {
    camera.lookAt(0, zoom, 0);
  }, [zoom]);

  const handleZoom = (e) => {
    setZoom(e.target.value);
  };

  return (
    <div>
      {/* Assign rendererContainer instead of directly using renderer */}
      <div id="model-container" ref={(ref) => (rendererContainer = ref)} />
      <input
        type="range"
        min="1"
        max="100"
        value={zoom}
        onChange={handleZoom}
      />
    </div>
  );
};

export default ThreeDModelViewer;
