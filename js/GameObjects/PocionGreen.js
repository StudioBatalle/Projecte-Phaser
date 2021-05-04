export default class PocionGreen extends Inventario{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
    this.scene.add.existing(this);
  }
}

import Inventario from "./Inventario.js";
