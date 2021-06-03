export default class BootScene extends Phaser.Scene {
	constructor(game) {
		super(game);
	}

  preload()
	{
		this.load.atlas("fuego", "assets/images/explosion.png", "assets/images/explosion.json");
		this.load.atlas("objectsprites", "assets/images/objectssheet.png", "assets/images/objectssheet.json");
		this.load.atlas("ojo","assets/images/eye.png", "assets/images/eye.json");
		this.load.atlas("jabali","assets/images/jabali.png", "assets/images/jabali.json");
		this.load.image("disparo","assets/images/Shoot.png");
		this.load.atlas('avatar', 'assets/images/avatar.png', "assets/images/avatar.json");
		this.load.audio('music','assets/sounds/BgMusic.mp3');
		this.load.tilemapTiledJSON('LastRoom2', 'assets/TileMaps/LastRoom2.json');
		this.load.image('tiles', 'assets/TileMaps/NatureTileset.png');
	}

  create()
	{
		//Creación del mapa
		 this.mapLast = this.make.tilemap({ key: 'LastRoom2'});
		 this.tileset = this.mapLast.addTilesetImage('NatureTileset', 'tiles', 16, 16, 0, 0);
	//	const layer1 = mapLast.createLayer('Suelo', tileset, 0, 0);
		 this.layer2 = this.mapLast.createStaticLayer('pared', this.tileset, 0, 0);
		this.layer2.setCollisionByProperty({ collides: true });
		this.layer2.setDepth(0);
		

		//Creación de personaje con sus mecanicas
		this.fire = new Fire(this, 0, 0, 'fuego', 'explosion0.png');
		this.player = new Player(this, 400, 200, 'avatar', 'sprite_0.png');
		this.bomb = new Bomb(this, 0, 0, 'objectsprites', 'objects_5.png');
this.player.setDepth(2);
		//Creación de enemigos
    this.enemyGroup = this.add.group();
    this.shootGroup = this.add.group();

		//Creación de jabalí
		this.jabali = new Jabali(this, 500, 100, 'jabali', 'sprite_0.png');

		//Creación de ojo y su disparo
		for (var i = 0; i < 4; i++)
		{
			this.ojo = new Eye(this, 150 * (1 + i), 100 * (i + 1), 'ojo', 'eye0.png');
			this.disparo = new Shoot(this, this.ojo.x, this.ojo.y, 'disparo');
		}

		//Eventos o configuraciones utiles
		this.Teclas.call(this);
		this.time.addEvent({ delay: 1000, callback: this.cronometro, callbackScope: this, loop: true });
		this.music = this.sound.add('music');
		//Collisions
		this.cameras.main.setBounds(0, 0, 800 * 2, 600 * 2);
		this.physics.world.setBounds(0, 0, 800 * 2, 600 * 2);
		this.physics.add.overlap(this.player, this.enemyGroup, this.invencibleFunc, null, this);
		this.physics.add.overlap(this.player, this.shootGroup, this.DamageDisp, null, this);
		this.physics.add.overlap(this.fire, this.enemyGroup, this.Dead, null, this);
		this.physics.add.collider(this.player, this.layer2);
		this.physics.world.createDebugGraphic();
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

		//Control de disparo del ojo
		for (var i = 0; i < this.enemyGroup.getChildren().length; i++)
		{
			this.Dgroup = this.shootGroup.getChildren()[i];
			this.Dgroup.EyeShoot();
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
		if (Egg.DispAct == false)
		{
			Egg.playerCerca = true;
		}
	}

	Dead(fire, Egg)
	{
		if (fire.visible && Egg.invencible == false)
		{
			Egg.dead = true;
		}
	}

	DamageDisp(player, Egg)
	{
		if (player.vida > 0 && Egg.visible == true)
		{
			var dañoResultante = Egg.damageMax - player.resistencia;
			player.vida = player.vida - dañoResultante;
			Egg.visible = false;
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
