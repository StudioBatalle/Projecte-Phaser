export default class Eye extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    this.scene.enemyGroup.add(this);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
      this.setOrigin(0.5, 0.5);
      this.OriginalSizeWt = this.body.width / 2;
      this.OriginalSizeHg = this.body.height / 2;
      this.body.setSize(this.OriginalSizeWt, this.OriginalSizeHg, true);

    	//Propiedades del ojo
    	this.vidaMax = 3;
  		this.vel = 1;
      this.invencible = false;
      this.playerCerca = false;
      this.dead = false;

      this.player = this.scene.player;

      //Variables del ojo
      this.DispAct = false;
      this.dirX = this.player.x - this.x;
      this.dirY = this.player.y - this.y;

      this.dir = new Phaser.Math.Vector2(this.dirX , this.dirY);
      this.dir.normalize();
  }

  update()
  {
    //Control de movimiento

    if (this.playerCerca)
    {
      this.x-= this.vel*this.dir.x;
      this.y-= this.vel*this.dir.y;
    }
    else
    {
      //Calcular posicion del enemigo con el jugador
      this.dirX = this.player.x - this.x;
      this.dirY = this.player.y - this.y;

      this.dir = new Phaser.Math.Vector2(this.dirX , this.dirY);
      this.dir.normalize();
    }

    if(this.dead)
    {
      this.visible = false;
    }
  }
}
