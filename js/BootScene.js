export default class BootScene extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

  preload()
	{
		this.load.image("avatar","assets/images/hero.png");
		this.load.image("fuego","assets/images/exp.png");
		this.load.atlas("object_sprites", "assets/images/objectssheet.png", "assets/objectssheet_atlas.json");
		this.bomba;
	}

  create()
	{
		this.player = new Player(this, 400, 200, 'avatar');
		this.fire = new Fire(this, 0, 0, 'fuego');
		this.bomb = new Bomb(this, 0, 0, 'object_sprites', 'bomb');
		this.pocionRed = new PocionRed(this, this.game.config.width - 50, 0, 'pocionRed');
		this.InvetarioList = this.physics.add.group();
		this.Teclas.call(this);
		this.time.addEvent({ delay: 1000, callback: this.cronometro, callbackScope: this, loop: true });
	}

	update()
	{
		if (this.Change.isDown)
		{
				this.scene.start('CaveLevel');
		}
	}

  cronometro()
	{
		/*//Control de los efectos de pocion

		if(EfectoActivo)
		{
			timeEfecto++;

			if (timeEfecto == 15)
			{
				player.damage = damageMax;
				player.resistencia = resistenciaMax;
				timeEfecto = 0;
				EfectoActivo = false;
			}
		}*/

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
	}

  Teclas()
  {
  	this.KeyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
  	this.KeyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.Change = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  }
}

import Player from "./Characters/Player.js";
import Bomb from "./GameObjects/Bomb.js";
import Fire from "./GameObjects/Fire.js";
import PocionRed from "./GameObjects/PocionRed.js";
