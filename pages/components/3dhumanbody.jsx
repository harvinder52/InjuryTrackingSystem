import React, { useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

const ThreeDModelViewer = () => {
  useEffect(() => {
    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("model-container").appendChild(renderer.domElement);

    // Create an OBJLoader
    const loader = new OBJLoader();

    // Load your .obj model
    loader.load("./3d.obj", (loadedObject) => {
      // Add the loaded object to the scene
      scene.add(loadedObject);

      // Position the camera to view the loaded object
      camera.position.z = 5;

      // Create an animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the loaded object
        loadedObject.rotation.x += 0.01;
        loadedObject.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    });
  }, []);

  return <div id="model-container" />;
};

export default ThreeDModelViewer;
