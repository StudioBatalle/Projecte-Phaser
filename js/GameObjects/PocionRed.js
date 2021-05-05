export default class PocionRed extends Inventario{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
    this.scene.add.existing(this);
    this.objetoActivo = 0;
    this.almacenado = 4;
  }
}

import Inventario from "./Inventario.js";
