export default class BootScene extends Phaser.Scene {
	constructor(game) {
		super(game);
	}

  preload()
	{
		this.load.image("fuego","assets/images/exp.png");
		this.load.atlas("objectsprites", "assets/images/objectssheet.png", "assets/images/objectssheet.json");
		this.load.atlas("ojo","assets/images/eyefrontsheet.png", "assets/images/eyefrontsheet.json");
		this.load.atlas("jabali","assets/images/jabali.png", "assets/images/jabali.json");
		this.load.image("disparo","assets/images/Shoot.png");
		this.load.atlas('avatar', 'assets/images/avatar.png', "assets/images/avatar.json");
		this.load.audio('music','assets/sounds/BgMusic.mp3');
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
		this.player = new Player(this, 400, 200, 'avatar', 'sprite_0.png');
		this.bomb = new Bomb(this, 0, 0, 'objectsprites', 'objects_5.png');

		//Creación de enemigos
    this.enemyGroup = this.add.group();
    this.shootGroup = this.add.group();

		//Creación de jabalí
		this.jabali = new Jabali(this, 500, 100, 'jabali', 'sprite_0.png');

		//Eventos o configuraciones utiles
		this.Teclas.call(this);
		this.time.addEvent({ delay: 1000, callback: this.cronometro, callbackScope: this, loop: true });
		this.physics.add.overlap(this.player, this.Egroup, this.invencibleFunc, null, this);
		this.physics.add.overlap(this.fire, this.Egroup, this.Dead, null, this);
		this.physics.add.collider(this.player, this.layer2);
		this.physics.world.createDebugGraphic();
		this.music = this.sound.add('music');
		this.cameras.main.setBounds(0, 0, 800 * 2, 600);
		this.physics.world.setBounds(0, 0, 800 * 2, 600);
	}

	update()
	{
		this.scene.moveDown('CaveLevel');
		this.scene.launch('CaveLevel').launch('HUDScreen').stop();
		this.music.play({ loop: true });
	}

  cronometro()
	{
		//Control del aguante
		this.player.AguanteControl();

		//Control de bombas
		this.bomb.Explosion();

		//Destruye la explosion
		this.fire.DamgeArea();

		//Control de carrera de jabalí
		this.jabali.AtaqueJabali();

		if (this.EnemyExist)
		{
			//Control de disparo del ojo
			for (var i = 0; i < this.enemyGroup.getChildren().length; i++)
			{
				this.Dgroup = this.shootGroup.getChildren()[i];
				this.Dgroup.EyeShoot();
			}
		}
	}

  Teclas()
	{
    this.KeyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		this.KeyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
		this.KeyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
		this.Key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		this.Key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		this.Key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		this.Key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
  }

	invencibleFunc(player, Egg)
	{
		if (this.EnemyExist)
		{
			this.Egg.invencibleEye();
		}
	}

	Dead(fire, Egg)
	{
		if (this.EnemyExist)
		{
			Egg.destroy();
		}
	}
}

import Player from "./Characters/Player.js";
import Jabali from "./Characters/Jabali.js";
import Eye from "./Characters/Eye.js";
import Shoot from "./GameObjects/Shoot.js";
import Bomb from "./GameObjects/Bomb.js";
import Fire from "./GameObjects/Fire.js";
import Inventario from "./GameObjects/Inventario.js";
