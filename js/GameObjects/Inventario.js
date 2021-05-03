export default class Inventario extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, key){
    super(scene, x, y, key);
		this.scene.add.existing(this);
    this.visible = false;
  }
}
