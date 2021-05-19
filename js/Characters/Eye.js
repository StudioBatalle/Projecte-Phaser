export default class Eye extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
      this.setOrigin(0.5, 0.5);
      this.body.setSize(this.body.width, this.body.height, true);

    	//Propiedades del ojo

    	this.vidaMax = 3;
      this.vel = 3;
      this.invencible = false;

      this.player = this.scene.player;

      //Variables del ojo

      this.OriginalSizeW = this.body.width;
      this.OriginalSizeH = this.body.height;

      this.dirX = this.player.x - this.x;
      this.dirY = this.player.y - this.y;

      this.dir = new Phaser.Math.Vector2(this.dirX , this.dirY);
      this.dir.normalize();


  }

  update()
  {
    //Control de movimiento

    if (this.invencible == false)
    {
      //Calcular posicion del enemigo con el jugador

      this.dirX = this.player.x - this.x;
      this.dirY = this.player.y - this.y;

      this.dir = new Phaser.Math.Vector2(this.dirX , this.dirY);
      this.dir.normalize();
    }
    else
    {
      this.x-= this.vel*this.dir.x;
      this.y-= this.vel*this.dir.y;
    }
  }

  Invencible()
	{
		if (this.disparo.disp == false)
		{
			this.ojo.invencible = true;
		}
		else
		{
			this.ojo.invencible = false;
		}
	}
}
