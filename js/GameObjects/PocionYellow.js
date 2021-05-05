export default class PocionYellow extends Inventario{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
    this.scene.add.existing(this);

    this.objetoActivo = 3;
    Inventario.almacenado = 4;
  }
}

import Inventario from "./Inventario.js";
