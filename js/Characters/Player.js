import BootScene from "../BootScene.js";

export default class Player extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, key){
    super(scene, x, y, key);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
      this.setOrigin(0.5, 1);
      this.setScale(0.2, 0.2);

    	//Para controlar mejor las estadisticas y asi poder mejorarlas cuando se pase el primer nivel

    	this.vidaMax = 10;
    	this.resistenciaMax = 2;
    	this.damageMax = 2;
    	this.aguanteMax = 150;

    	this.vida = this.vidaMax / 2; //Estadistica cambiada para visualizar el efecto de pocion
    	this.resistencia = this.resistenciaMax;
    	this.damage = this.thisdamageMax;
    	this.aguante = this.aguanteMax;

    	this.vel = 3;
    	this.velS = this.vel;
    	this.recuperacion = false;
    	this.timeRecuperacion = 15;

      const { W, A, S, D, SHIFT } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            KeyW: W,
            KeyA: A,
            KeyS: S,
            KeyD: D,
            Sprint: SHIFT,
        })
  }

  update()
  {
    const { keys } = this;

    //Control de aguante

    switch (this.aguante)
    {
      case 0:
        this.recuperacion = true;
      break;
      default:
      if (this.aguante < this.aguanteMax && keys.Sprint.isUp)
      {
        this.aguante++;
      }
    }

    //Control de sprint

    if (keys.Sprint.isDown && this.aguante > 0)
    {
      this.velS = this.vel * 2.5;
      this.aguante--;
    }
    else
    { this.velS = this.vel; }

    //Control de movimiento

    if (keys.KeyA.isDown)
    { this.x-=this.velS; }
    else if (keys.KeyD.isDown)
    { this.x+=this.velS; }

    if (keys.KeyW.isDown)
    {
      this.y-=this.velS;
    }
    else if (keys.KeyS.isDown)
    {
      this.y+=this.velS;
    }
  }
}
