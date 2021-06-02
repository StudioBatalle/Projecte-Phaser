export default class Fire extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, key){
    super(scene, x, y, key);
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
      this.setOrigin(0.5, 0.5);
      this.setScale(3, 3);
      this.visible = false;
      this.damage = 15;
      this.tiempoF = 5;

      this.anims.create({
			key: 'exp',
			frames: this.anims.generateFrameNames('fuego', { start: 0, end: 9, prefix: 'explosion', suffix: '.png'}),
			frameRate: 4,
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
  				this.tiempoF = 5;
  				this.visible = false;
  			}
  		}
    }
  }
