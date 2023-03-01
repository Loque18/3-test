// Import stylesheets
import "./style.scss";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

import plane from "./entities/plane";

const entities = [plane];

/**
 * Architecture:
 * const entity = {
 *   id: '...',
 *   onInit: function onInit(scene) {},
 *   update: function update(scene) {},
 * };
 */

function init(entities, options) {
  const { helpers } = options;

  // ::: Scene ::: //
  const scene = new THREE.Scene();

  // ::: Renderer ::: //
  const rendererDOMElmnt = document.querySelector(".app");

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(rendererDOMElmnt.offsetWidth, rendererDOMElmnt.offsetHeight);
  renderer.setAnimationLoop(animation);

  const effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = "white";
  effect.domElement.style.backgroundColor = "black";

  rendererDOMElmnt.appendChild(renderer.domElement);

  // ::: Camera ::: //

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );

  camera.position.z = 1;

  // ::: Events handlers ::: //

  // window.addEventListener('resize', () => {
  //     renderer.setSize(
  //         rendererDOMElmnt.offsetWidth,
  //         rendererDOMElmnt.offsetHeight
  //     );

  //     camera.aspect = window.innerWidth / window.innerHeight;
  // });

  // ::: Controls ::: //
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();

  // ::: visual guides ::: //

  if (helpers) {
    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(10, 10, 0xffffff, 0x4f4f4f);
    scene.add(gridHelper);
  }

  // ::: Lights ::: //
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  camera.add(pointLight);

  // ::: add entities ::: //

  entities.forEach((entity) => {
    entity.onInit({
      scene,
      camera,
      renderer,
      // controls,
    });
  });

  function animation(time) {
    renderer.render(scene, camera);
  }
}

init(entities, { helpers: false });
