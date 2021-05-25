export default class Inventario extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
		this.scene.add.existing(this);
      this.setScale(2, 2);
      this.EfectoActivo = false;
    	this.timeEfecto = 0;
      this.almacenado = 3;
  }
}
