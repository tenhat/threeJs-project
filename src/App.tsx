import './App.css'
import * as THREE from 'three'
import { useEffect } from 'react'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

function App() {
  let model: THREE.Group

  useEffect(() => {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const sizes = {
      width: innerWidth,
      height: innerHeight
    }
    //scene
    const scene: THREE.Scene = new THREE.Scene();

    //camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(-0.4, 0, 2)

    //renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas, 
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    const gltfloader = new GLTFLoader();
    gltfloader.load("./models/scene.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(1,1,1)
      model.rotation.y = -Math.PI / 3

      scene.add(model)
    })

    //animation
    const tick = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();
  }, [])


  return (
    <>
    <canvas id='canvas'></canvas>
    <div className="mainContent">
      <h3>three.js</h3>
      <p>practice</p>
    </div>
    </>
  )
}

export default App
