export default class PocionBlue extends Inventario{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
    this.scene.add.existing(this);

    this.objetoActivo = 2;
    Inventario.almacenado = 3;
  }
}

import Inventario from "./Inventario.js";
