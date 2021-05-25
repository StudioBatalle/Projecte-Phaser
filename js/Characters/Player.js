import BootScene from "../BootScene.js";

export default class Player extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
      this.body.setSize(this.body.width / 2, this.body.height, true);
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

    	this.vel = 2;
    	this.velS = this.vel;
    	this.recuperacion = false;
    	this.timeRecuperacion = 15;

      this.dirLast = 1;
      this.idle = false;
      this.Atq = false;

      //Anims de avatar
      this.anims.create({
			key: 'idleR',
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
			frameRate: 15,
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
			frames: this.anims.generateFrameNames('avatar', { start: 36, end: 52, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'runDown',
			frames: this.anims.generateFrameNames('avatar', { start: 36, end: 52, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 25,
			repeat: 1
		});
		this.anims.create({
			key: 'walkUp',
			frames: this.anims.generateFrameNames('avatar', { start: 53, end: 68, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'runUp',
			frames: this.anims.generateFrameNames('avatar', { start: 53, end: 68, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 25,
			repeat: 1
		});
		this.anims.create({
			key: 'attackUp',
			frames: this.anims.generateFrameNames('avatar', { start: 69, end: 73, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'attackDown',
			frames: this.anims.generateFrameNames('avatar', { start: 74, end: 79, prefix: 'sprite_', suffix: '.png'}),
			frameRate: 15,
			repeat: 1
		});

      const { W, A, S, D, M, SHIFT } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            KeyW: W,
            KeyA: A,
            KeyS: S,
            KeyD: D,
            KeyM: M,
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
      this.velS = this.vel * 2;
      this.run = true;
      this.aguante--;
    }
    else
    {
      this.velS = this.vel;
      this.run = false;
    }

    //idle Anims y Control de ataque

    if (keys.KeyM.isDown)
    {
      switch (this.dirLast)
      {
        case 1:
        this.anims.play("attackLeft", true);
          break;
        case 2:
        this.anims.play("attackUp", true);
          break;
        case 3:
        this.anims.play("attackRight", true);
          break;
        case 4:
        this.anims.play("attackDown", true);
          break;
      }

      this.Atq = true;
      this.idle = false;
    }
    else if (this.idle)
    {
        if (this.dirLast != 3)
        {
          this.anims.play("idleLF", true);
        }
        else
        {
          this.anims.play("idleR", true);
        }
    }

    this.idle = true;

    //Control de movimiento

    if (keys.KeyA.isDown)
    {
      this.x-=this.velS;

      if (this.run)
      {
        this.anims.play("runLeft", true);
      }
      else
      {
          this.anims.play("walkLeft", true);
      }

      this.idle = false;
      this.dirLast = 1;
    }
    else if (keys.KeyD.isDown)
    {
      this.x+=this.velS;

      if (this.run)
      {
        this.anims.play("runRight", true);
      }
      else
      {
          this.anims.play("walkRight", true);
      }

      this.idle = false;
      this.dirLast = 3;
    }

    if (keys.KeyW.isDown)
    {
      this.y-=this.velS;

      if (this.run)
      {
        this.anims.play("walkUp", true);
      }
      else
      {
          this.anims.play("runUp", true);
      }

      this.idle = false;
      this.dirLast = 2;
    }
    else if (keys.KeyS.isDown)
    {
      this.y+=this.velS;

      if (this.run)
      {
        this.anims.play("walkDown", true);
      }
      else
      {
          this.anims.play("runDown", true);
      }

      this.idle = false;
      this.dirLast = 4;
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
