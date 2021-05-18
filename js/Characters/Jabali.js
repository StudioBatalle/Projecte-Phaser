export default class Jabali extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
      this.setOrigin(0.5, 1);
      //this.setScale(0.25,0.25);

    	//Propiedades del jabalí

    	this.vidaMax = 5;
    	this.resistenciaMax = 1;
    	this.damageMax = 2;
      this.vel = 4;

      //Variables del jabalí

    	this.sprint = false;
    	this.sprintTiempo = 2;
      this.descansar = false;
      this.descansarTiempo = 3;

      this.player = this.scene.player;
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
  }
}
