export default class Fire extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, key){
    super(scene, x, y, key);
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
      this.setOrigin(0.5, 0.5);
      this.setScale(1.35, 1.35);
      this.visible = false;
      this.damage = 15;
      this.tiempoF = 5;
    }
  }
