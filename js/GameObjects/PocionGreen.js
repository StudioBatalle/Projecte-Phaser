export default class PocionGreen extends Inventario{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
    this.scene.add.existing(this);

    this.objetoActivo = 1;
    Inventario.almacenado = 1;
  }
}

import Inventario from "./Inventario.js";
