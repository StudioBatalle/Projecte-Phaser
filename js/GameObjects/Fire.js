export default class Fire extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, key){
    super(scene, x, y, key);
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
      this.setOrigin(0.5, 0.5);
      this.setScale(5, 5);
      this.visible = false;
      this.damage = 15;
      this.tiempoF = 4;

      this.anims.create({
			key: 'exp',
			frames: this.anims.generateFrameNames('fuego', { start: 0, end: 10, prefix: 'explosion', suffix: '.png'}),
			frameRate: 10,
			repeat: -1
		  });
    }

    DamgeArea()
    {
      if (this.visible)
  		{
  			this.tiempoF--;
        this.anims.play("exp", true);

  			if (this.tiempoF < 0)
  			{
  				this.tiempoF = 4;
  				this.visible = false;
  			}
  		}
    }
  }
