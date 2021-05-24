export default class BootScene extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

  preload()
	{
		this.load.image("fuego","assets/images/exp.png");
		this.load.atlas("object_sprites", "assets/images/objectssheet.png", "assets/images/objectssheet_atlas.json");
		this.load.atlas("ojo","assets/images/eyefrontsheet.png", "assets/images/eyefrontsheet.json");
		this.load.image("disparo","assets/images/Shoot.png");
		this.load.atlas('avatar', 'assets/images/avatar.png', "assets/images/avatar.json");
		this.load.tilemapTiledJSON('LastRoom', 'assets/TileMaps/LastRoom.json');
		this.load.image('tiles', 'assets/TileMaps/NatureTileset.png');
	}

  create()
	{
		//Creación del mapa
		this.mapLast = this.make.tilemap({ key: 'LastRoom'});
		this.tileset = this.mapLast.addTilesetImage('NatureTileset', 'tiles', 16, 16, 0, 0);
		this.layer1 = this.mapLast.createLayer('Suelo', this.tileset, 0, 0);
		this.layer2 = this.mapLast.createLayer('Pared', this.tileset, 0, 0);
		this.layer2.setCollisionByProperty({ collides: true });

		//Creación de personaje con sus mecanicas
		this.fire = new Fire(this, 0, 0, 'fuego');
		this.player = new Player(this, 400, 200, 'avatar', 'sprite_01');
		this.bomb = new Bomb(this, 0, 0, 'object_sprites', 'bomb');

		//Creación de enemigos

		//Creación de jabalí
		this.jabali = new Jabali(this, 500, 100, 'ojo');

		//Creación de ojo y su disparo
		this.ojo = new Eye(this, 400, 400, 'ojo');
		this.disparo = new Shoot(this, this.ojo.x, this.ojo.y, 'disparo');

		//Creación de Inventario
		this.pocionYellow = new Inventario(this, this.game.config.width, 0, 'object_sprites', 'pocionyellow');
		this.pocionBlue = new Inventario(this, this.pocionYellow.x - 50, 0, 'object_sprites', 'pocionblue');
		this.pocionGreen = new Inventario(this, this.pocionBlue.x - 50, 0, 'object_sprites', 'pociongreen');
		this.pocionRed = new Inventario(this, this.pocionGreen.x - 50, 0, 'object_sprites', 'pocionred');

		//Eventos o configuraciones utiles
		this.Teclas.call(this);
		this.time.addEvent({ delay: 1000, callback: this.cronometro, callbackScope: this, loop: true });
		this.physics.add.overlap(this.player, this.ojo, this.invencibleFunc, null, this);
		this.physics.add.collider(this.player, this.layer2);
		this.physics.world.createDebugGraphic();
	}

	update()
	{
		 this.scene.start('CaveLevel');
	}

  cronometro()
	{
		//Control de los efectos de pocion
		if(this.pocionGreen.EfectoActivo)
		{
			this.pocionGreen.timeEfecto++;

			if (this.pocionGreen.timeEfecto == 15)
			{
				this.player.damage = this.player.damageMax;
				this.pocionGreen.timeEfecto = 0;
				this.pocionGreen.EfectoActivo = false;
			}
		}

		if(this.pocionBlue.EfectoActivo)
		{
			this.pocionBlue.timeEfecto++;

			if (this.pocionBlue.timeEfecto == 15)
			{
				this.player.resistencia = this.player.resistenciaMax;
				this.pocionBlue.timeEfecto = 0;
				this.pocionBlue.EfectoActivo = false;
			}
		}

		//Control del aguante
		this.player.AguanteControl();

		//Control de bombas
		this.bomb.Explosion();

		//Destruye la explosion
		this.fire.DamgeArea();

		//Control de carrera de jabalí
		if (this.jabali.descansar == false)
		{
			if (this.jabali.sprint)
			{
					this.jabali.sprintTiempo--;

					if (this.jabali.sprintTiempo == 0)
					{
							this.jabali.sprintTiempo = 4;
							this.jabali.sprint = false;
							this.jabali.descansar = true;
					}
			}
		}
		else
		{
				this.jabali.descansarTiempo--;

				if (this.jabali.descansarTiempo == 0)
				{
					this.jabali.descansarTiempo = 2;
					this.jabali.descansar = false;

					if (this.jabali.dirDer)
					{
						this.jabali.dirDer = false;
					}
					else
					{
							this.jabali.dirDer = true;
					}
				}
		}

		//Control de disparo del ojo
		this.disparo.EyeShoot();
	}

  Teclas()
	{
    this.Change = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		this.Key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		this.Key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		this.Key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		this.Key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
  }

	InventarioAccess()
	{
		var JustDown = Phaser.Input.Keyboard.JustDown;

	    if (JustDown(this.Key1))
			{
				if (this.player.vida < this.player.vidaMax && this.pocionRed.almacenado > 0)
				{
					this.player.vida++;
					this.pocionRed.almacenado--;
				}
	    }
			else if (JustDown(this.Key2))
			{
				if (this.pocionGreen.almacenado > 0 && this.pocionGreen.EfectoActivo == false && this.pocionBlue.EfectoActivo == false)
				{
						this.player.damage*=2;
						this.pocionGreen.EfectoActivo = true;
						this.pocionGreen.almacenado--;
				}
	    }
			else if (JustDown(this.Key3))
			{
				if (this.pocionBlue.almacenado > 0 && this.pocionBlue.EfectoActivo == false && this.pocionGreen.EfectoActivo == false)
				{
					this.player.resistencia*=2;
					this.pocionBlue.EfectoActivo = true;
					this.pocionBlue.almacenado--;
				}
	    }
			else if (JustDown(this.Key4))
			{
				if (this.pocionYellow.almacenado > 0)
				{
					this.player.aguante+=50;
					this.player.recuperacion = false;
					this.player.timeRecuperacion = 15;
					this.pocionYellow.almacenado--;
				}
	    }
	}

	invencibleFunc()
	{
		this.ojo.invencible = true;
	}
}

import Player from "./Characters/Player.js";
import Jabali from "./Characters/Jabali.js";
import Eye from "./Characters/eye.js";
import Shoot from "./GameObjects/Shoot.js";
import Bomb from "./GameObjects/Bomb.js";
import Fire from "./GameObjects/Fire.js";
import Inventario from "./GameObjects/Inventario.js";
