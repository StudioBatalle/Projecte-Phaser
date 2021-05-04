export default class PocionRed extends Inventario{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
    this.scene.add.existing(this);
    this.visible = true;
  }
}

import Inventario from "./Inventario.js";
