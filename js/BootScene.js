export default class BootScene extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

  preload()
	{
		this.load.image("fuego","assets/images/exp.png");
		this.load.atlas("object_sprites", "assets/images/objectssheet.png", "assets/images/objectssheet_atlas.json");
		this.load.spritesheet('avatar', 'assets/images/avatar.png', { frameWidth: 32, frameHeight: 32 });
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
		this.jabali = new Jabali(this, 500, 100, 'avatar', 'sprite_01');

		//Eventos o configuraciones utiles
		this.Teclas.call(this);
		this.time.addEvent({ delay: 1000, callback: this.cronometro, callbackScope: this, loop: true });
		this.physics.add.collider(this.player, this.layer2);
		this.physics.world.createDebugGraphic();

		//Creación de Inventario
		this.pocionYellow = new Inventario(this, this.game.config.width, 0, 'object_sprites', 'pocionyellow');
		this.pocionBlue = new Inventario(this, this.pocionYellow.x - 50, 0, 'object_sprites', 'pocionblue');
		this.pocionGreen = new Inventario(this, this.pocionBlue.x - 50, 0, 'object_sprites', 'pociongreen');
		this.pocionRed = new Inventario(this, this.pocionGreen.x - 50, 0, 'object_sprites', 'pocionred');
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

		if (this.player.recuperacion)
		{
			this.player.timeRecuperacion-=1;

			if (this.player.timeRecuperacion == 0)
			{
				this.player.aguante = this.player.aguanteMax;
				this.player.timeRecuperacion = 15;
				this.player.recuperacion = false;
			}
		}

		//Control de bombas

		if (this.bomb.Bactiva)
		{
			this.bomb.tiempoB--;
		}
		else if (this.bomb.cooldown > 0)
		{
			this.bomb.cooldown--;
		}

		//Destruye la explosion

		if (this.fire.visible)
		{
			this.fire.tiempoF--;

			if (this.fire.tiempoF < 0)
			{
				this.fire.tiempoF = 5;
				this.fire.visible = false;
			}
		}

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
	}

  Teclas()
	{
    this.Change = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		this.Key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		this.Key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		this.Key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		this.Key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
  }

	InventarioChange()
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
}

import Player from "./Characters/Player.js";
import Jabali from "./Characters/Jabali.js";
import Bomb from "./GameObjects/Bomb.js";
import Fire from "./GameObjects/Fire.js";
import Inventario from "./GameObjects/Inventario.js";
