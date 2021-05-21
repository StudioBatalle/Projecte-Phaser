import BootScene from "../BootScene.js";

export default class Player extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
      this.setOrigin(0.5, 1);
      this.scene.cameras.main.startFollow(this);

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

      //Anims de avatar
      this.anims.create({
			key: 'idleLR',
			frames: this.anims.generateFrameNames('avatar', { start: 0, end: 2, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'idleLF',
			frames: this.anims.generateFrameNames('avatar', { start: 13, end: 15, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'walkRight',
			frames: this.anims.generateFrameNames('avatar', { start: 0, end: 12, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 7,
			repeat: -1
		});
		this.anims.create({
			key: 'runRight',
			frames: this.anims.generateFrameNames('avatar', { start: 0, end: 12, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 25,
			repeat: -1
		});
		this.anims.create({
			key: 'walkLeft',
			frames: this.anims.generateFrameNames('avatar', { start: 13, end: 25, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'runLeft',
			frames: this.anims.generateFrameNames('avatar', { start: 13, end: 25, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 25,
			repeat: -1
		});
		this.anims.create({
			key: 'attackRight',
			frames: this.anims.generateFrameNames('avatar', { start: 26, end: 30, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'attackLeft',
			frames: this.anims.generateFrameNames('avatar', { start: 31, end: 35, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'walkDown',
			frames: this.anims.generateFrameNames('avatar', { start: 36, end: 50, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'runDown',
			frames: this.anims.generateFrameNames('avatar', { start: 36, end: 50, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 25,
			repeat: 1
		});
		this.anims.create({
			key: 'walkUp',
			frames: this.anims.generateFrameNames('avatar', { start: 51, end: 66, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'runUp',
			frames: this.anims.generateFrameNames('avatar', { start: 51, end: 66, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 25,
			repeat: 1
		});
		this.anims.create({
			key: 'attackUp',
			frames: this.anims.generateFrameNames('avatar', { start: 67, end: 71, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'attackDown',
			frames: this.anims.generateFrameNames('avatar', { start: 72, end: 76, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});

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
    {
      this.x-=this.velS;
      this.anims.play("walkLeft", true);
    }
    else if (keys.KeyD.isDown)
    {
      this.x+=this.velS;
      this.anims.play("walkRight", true);
    }

    if (keys.KeyW.isDown)
    {
      this.y-=this.velS;
      this.anims.play("walkUp", true);
    }
    else if (keys.KeyS.isDown)
    {
      this.y+=this.velS;
      this.anims.play("walkDown", true);
    }
  }

  AguanteControl()
  {
    //Control del aguante
    if (this.recuperacion)
    {
      this.timeRecuperacion-=1;

      if (this.timeRecuperacion == 0)
      {
        this.aguante = this.aguanteMax;
        this.timeRecuperacion = 15;
        this.recuperacion = false;
      }
    }
  }
}
