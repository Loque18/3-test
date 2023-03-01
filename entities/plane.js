import * as THREE from "three";

import { ArcballControls } from "three/addons/controls/ArcballControls.js";

export default {
  id: "plane_8745asd8",
  onInit: function onInit(js3) {
    const url =
      "https://media.discordapp.net/attachments/917524255665709131/1073301131687637013/test.png?width=427&height=427";

    const texture = new THREE.TextureLoader().load(url);

    const geometry = new THREE.PlaneGeometry(1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, material);

    // controls
    const controls = new ArcballControls(
      js3.camera,
      js3.renderer.domElement,
      js3.scene
    );
    controls.addEventListener("change", js3.render);

    js3.scene.add(plane);
  },
  update: function update(js3) {},
};
