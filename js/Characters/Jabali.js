export default class Jabali extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
      this.setOrigin(0.5, 1);
      this.setScale(0.25,0.25);
      this.body.setSize(this.body.width / 2, this.body.height / 2);

    	//Propiedades del jabalí

    	this.vidaMax = 5;
    	this.resistenciaMax = 1;
    	this.damageMax = 2;
      this.vel = 3;

      //Variables del jabalí

    	this.sprint = false;
    	this.sprintTiempo = 2;
      this.descansar = false;
      this.descansarTiempo = 3;

      this.player = this.scene.player;

      //Anims de jabalí
      this.anims.create({
			key: 'RunRight',
			frames: this.anims.generateFrameNames('jabali', { start: 0, end: 8, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 5,
			repeat: -1
		  });
      this.anims.create({
      key: 'StayRight',
      frames: this.anims.generateFrameNames('jabali', { start: 0, end: 8, prefix: 'sprite_', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
      });
      this.anims.create({
			key: 'RunLeft',
			frames: this.anims.generateFrameNames('jabali', { start: 9, end: 17, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 5,
			repeat: -1
		  });
      this.anims.create({
      key: 'StayLeft',
      frames: this.anims.generateFrameNames('jabali', { start: 9, end: 17, prefix: 'sprite_', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
      });
  }

  update()
  {
    //Control de sprint

    if (this.descansar == false)
    {
      this.sprint = true;

      //Dirreción hacia el jugador

      this.dirX = this.player.x - this.x;
      this.dirY = this.player.y - this.y;

  		this.dir = new Phaser.Math.Vector2(this.dirX , this.dirY);
  		this.dir.normalize();
    }
    else
    {
      this.x+= this.vel*this.dir.x;
      this.y+= this.vel*this.dir.y;
    }

    //Control de anims de jabalí
    if (this.dir.x < 0)
    {
      if(this.descansar)
      {
        this.anims.play("StayLeft", true);
      }
      else
      {
        this.anims.play("RunLeft", true);
      }
    }
    else
    {
      if (this.descansar)
      {
        this.anims.play("StayRight", true);
      }
      else
      {
        this.anims.play("RunRight", true);
      }
    }
  }

  AtaqueJabali()
  {
    if (this.descansar == false)
		{
			if (this.sprint)
			{
					this.sprintTiempo--;

					if (this.sprintTiempo == 0)
					{
							this.sprintTiempo = 4;
							this.sprint = false;
							this.descansar = true;
					}
			}
		}
		else
		{
				this.descansarTiempo--;

				if (this.descansarTiempo == 0)
				{
					this.descansarTiempo = 2;
					this.descansar = false;

					if (this.dirDer)
					{
						this.dirDer = false;
					}
					else
					{
							this.dirDer = true;
					}
				}
		}
  }
}
