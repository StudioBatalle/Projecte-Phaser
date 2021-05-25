export default class Bomb extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);

			this.setOrigin(0.5, 0.5);
			//this.setScale(0.25, 0.25);
			this.visible = false;

			this.cooldown = 5;
			this.tiempoB = 2;
			this.Bactiva = false;

			this.player = this.scene.player;
			this.fire = this.scene.fire;

      //anims de bomba
      this.anims.create({
			key: 'alerta',
			frames: this.anims.generateFrameNames('objectsprites', { start: 5, end: 6, prefix: 'objects_', suffix: '.png'}),
			frameRate: 5,
			repeat: -1
		});

      const { SPACE } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({ BombT: SPACE });
		}

		update()
		{
      const { keys } = this;

			if (keys.BombT.isDown && this.cooldown == 0 && this.player.aguante > 0)
			{
				this.x = this.player.x;
				this.y = this.player.y;
				this.visible = true;
				this.cooldown = 5;
				this.Bactiva = true;

				if (this.player.aguante <= 75)
				{
					this.player.aguante-= this.player.aguante;
				}
				else
				{
					this.player.aguante-=75;
				}
			}

			if (this.tiempoB < 0)
			{
				this.visible = false;
				this.Bactiva = false;
				this.tiempoB = 2;

				this.fire.x = this.x;
				this.fire.y = this.y;
				this.fire.visible = true;
			}
		}

    Explosion()
    {
      if (this.Bactiva)
  		{
        this.tiempoB--;
        this.anims.play("alerta", true);
      }
  		else if (this.cooldown > 0)
  		{ this.cooldown--; }
    }
}
