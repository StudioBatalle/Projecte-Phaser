export default class BootScene extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

  preload()
	{
		this.load.image("avatar","assets/images/hero.png");
		this.load.image("fuego","assets/images/exp.png");
		this.load.atlas("object_sprites", "assets/images/objectssheet.png", "assets/objectssheet_atlas.json");
	}

  create()
	{
		this.player = new Player(this, 400, 200, 'avatar');
		this.fire = new Fire(this, 0, 0, 'fuego');
		this.bomb = new Bomb(this, 0, 0, 'object_sprites', 'bomb');
		this.pocionRed = new PocionRed(this, this.game.config.width, 0, 'object_sprites', 'pocionred');
		this.pocionGreen = new PocionGreen(this, this.game.config.width - this.pocionRed.width, 0, 'object_sprites', 'pociongreen');
		this.pocionBlue = new PocionBlue(this, this.game.config.width, 0, 'object_sprites', 'pocionblue');
		this.pocionYellow = new PocionYellow(this, this.game.config.width, 0, 'object_sprites', 'pocionyellow');
		this.Teclas.call(this);
		this.time.addEvent({ delay: 1000, callback: this.cronometro, callbackScope: this, loop: true });
		this.VidaText = this.add.text(16, 16, 'vida:', {fontsize:'32px', fill: '#FFF'});
		this.pociones = this.add.text(16, 16 * 2, 'pociones:', {fontsize:'32px', fill: '#FFF'});
		this.bombaMov = new Player(this, 200, 200, 'avatar');
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
		//Control de los efectos de pocion

		/*if(this.Inventario.EfectoActivo)
		{
			this.Inventario.timeEfecto++;

			if (this.Inventario.timeEfecto == 15)
			{
				this.player.damage = this.player.damageMax;
				this.player.resistencia = this.player.resistenciaMax;
				this.Inventario.timeEfecto = 0;
				this.Inventario.EfectoActivo = false;
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
				if (this.pocionGreen.almacenado > 0 && this.Inventario.EfectoActivo == false)
				{
						this.player.damage*=2;
						this.Inventario.EfectoActivo = true;
						this.pocionGreen.almacenado--;
				}
	    }
			else if (JustDown(this.Key3))
			{
				if (this.pocionBlue.almacenado > 0 && this.Inventario.EfectoActivo == false)
				{
					this.player.resistencia*=2;
					this.Inventario.EfectoActivo = true;
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
import Bomb from "./GameObjects/Bomb.js";
import Fire from "./GameObjects/Fire.js";
import PocionRed from "./GameObjects/PocionRed.js";
import PocionGreen from "./GameObjects/PocionGreen.js";
import PocionBlue from "./GameObjects/PocionBlue.js";
import PocionYellow from "./GameObjects/PocionYellow.js";
import Inventario from "./GameObjects/Inventario.js";
