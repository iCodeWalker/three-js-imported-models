import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// To load animations of gltf models, we need to create 'AnimationMixer'
// 'AnimationMixer' is like a player

// draco path : 'node_modules/three/examples/jsm/libs/draco'

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// instantiate the GLTF loader

const dracoLoader = new DRACOLoader();
// set decoder path for the geometry containing files
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
// We need to provide a "DRACOLoader" instance to our "GLTFLoader"
gltfLoader.setDRACOLoader(dracoLoader);

// use the load() method.
// ########### DUCK Model #############
// gltfLoader.load(
//   // "/models/Duck/glTF/Duck.gltf",
//   // "/models/Duck/glTF-Binary/Duck.glb",
//   // "/models/Duck/glTF-Embedded/Duck.gltf",
//   "/models/Duck/glTF-Draco/Duck.gltf",
//   (gltf) => {
//     console.log("success");
//     console.log(gltf);
//     // the 'scene' property inside the 'gltf' contains everything we need.

//     // 1. Add the Object3D to our scene and ignore the unused PerspectiveCamera
//     scene.add(gltf.scene.children[0]);
//   },
//   (progress) => {
//     console.log("progress");
//     console.log(progress);
//   },
//   (error) => {
//     console.log("error");
//     console.log(error);
//   }
// );

// ########### Flight Helmet Model #############
// gltfLoader.load(
//   // "/models/Duck/glTF/Duck.gltf",
//   // "/models/Duck/glTF-Binary/Duck.glb",
//   "/models/FlightHelmet/glTF/FlightHelmet.gltf",
//   (gltf) => {
//     console.log("success");
//     console.log(gltf);
//     // the 'scene' property inside the 'gltf' contains everything we need.

//     // 1. Add the Object3D to our scene and ignore the unused PerspectiveCamera
//     // scene.add(gltf.scene.children[0]); //We only get few parts because there are multiple children

//     // We can loop on the children and add them to the scene
//     // As this puts the children from one scene to our scene, we can get glitches and some children removed
//     // from the scene. To overcome this we use while loop
//     // for (const child of gltf.scene.children) {
//     //   scene.add(child);
//     // }

//     // while (gltf.scene.children.length) {
//     //   scene.add(gltf.scene.children[0]);
//     // }

//     // Another solution is to duplicate the children array in order to have an unaltered independent array.
//     // const children = [...gltf.scene.children];
//     // for (const child of children) {
//     //   scene.add(child);
//     // }

//     // An even more simplier solution is to add "scene" property
//     // When we need to add whole model
//     scene.add(gltf.scene);
//   },
//   (progress) => {
//     console.log("progress");
//     console.log(progress);
//   },
//   (error) => {
//     console.log("error");
//     console.log(error);
//   }
// );

// ########### FOX Model #############
let mixer = null;
gltfLoader.load(
  // "/models/Duck/glTF/Duck.gltf",
  // "/models/Duck/glTF-Binary/Duck.glb",
  // "/models/Duck/glTF-Embedded/Duck.gltf",
  "/models/Fox/glTF/Fox.gltf",
  (gltf) => {
    console.log("success");
    console.log(gltf);

    mixer = new THREE.AnimationMixer(gltf.scene);

    // Now add one 'AnimationClips' to the mixer with the clipAction(...) method
    const action = mixer.clipAction(gltf.animations[0]);

    action.play();

    gltf.scene.scale.set(0.025, 0.025, 0.025);
    scene.add(gltf.scene);
  },
  (progress) => {
    console.log("progress");
    console.log(progress);
  },
  (error) => {
    console.log("error");
    console.log(error);
  }
);

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#444444",
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(2, 2, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update Mixer
  if (mixer != null) {
    mixer.update(deltaTime);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
