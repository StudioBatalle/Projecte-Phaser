export default class Inventario extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
		this.scene.add.existing(this);
      this.setScale(0.55, 0.55);
      this.EfectoActivo = false;
    	this.timeEfecto = 0;
      this.almacenado = 3;
  }
}
