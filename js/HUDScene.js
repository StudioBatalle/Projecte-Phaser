import BootScene from "./BootScene.js";
import Inventario from "./GameObjects/Inventario.js";

export default class HUDScene extends Phaser.Scene {
	constructor() {
		super("HUDScreen");
		//link para scenes http://labs.phaser.io/edit.html?src=src/scenes%5Cregistry%20data%20exchange%20es6.js
	}

	preload()
	{
		this.load.atlas("objectsprites", "assets/images/objectssheet.png", "assets/images/objectssheet.json");

		//indicadores
		this.load.spritesheet('vida', 'assets/images/vida.png', { frameWidth: 160, frameHeight: 160 });
		this.load.spritesheet('aguante', 'assets/images/aguante.png', { frameWidth: 160, frameHeight: 160 });
	}

	create()
	{
		//Creación de Inventario
		this.pocionYellow = new Inventario(this, this.game.config.width - 25, 25, 'objectsprites', 'objects_1.png');
		this.pocionBlue = new Inventario(this, this.pocionYellow.x - 50, 25, 'objectsprites', 'objects_2.png');
		this.pocionGreen = new Inventario(this, this.pocionBlue.x - 50, 25, 'objectsprites', 'objects_3.png');
		this.pocionRed = new Inventario(this, this.pocionGreen.x - 50, 25, 'objectsprites', 'objects_0.png');

		//indicadores vida y aguante
		this.ivida = this.add.sprite(50, 25, 'vida');
		this.ivida.setScale(0.5, 0.5);

		this.iaguante = this.add.sprite(50, 50, 'aguante');
		this.iaguante.setScale(0.5, 0.5);

		this.anims.create({
			key: 'v3-6',
			frames: this.anims.generateFrameNumbers('vida', { start: 1, end: 1 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v3-5',
			frames: this.anims.generateFrameNumbers('vida', { start: 2, end: 2 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v3-4',
			frames: this.anims.generateFrameNumbers('vida', { start: 3, end: 3 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v3-3',
			frames: this.anims.generateFrameNumbers('vida', { start: 4, end: 4 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v3-2',
			frames: this.anims.generateFrameNumbers('vida', { start: 5, end: 5 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v3-1',
			frames: this.anims.generateFrameNumbers('vida', { start: 6, end: 6 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v3-0',
			frames: this.anims.generateFrameNumbers('vida', { start: 7, end: 7 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v2-5',
			frames: this.anims.generateFrameNumbers('vida', { start: 8, end: 8 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v2-4',
			frames: this.anims.generateFrameNumbers('vida', { start: 9, end: 9 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v2-3',
			frames: this.anims.generateFrameNumbers('vida', { start: 10, end: 10 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v2-2',
			frames: this.anims.generateFrameNumbers('vida', { start: 11, end: 11 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v2-1',
			frames: this.anims.generateFrameNumbers('vida', { start: 12, end: 12 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v2-0',
			frames: this.anims.generateFrameNumbers('vida', { start: 13, end: 13 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v1-4',
			frames: this.anims.generateFrameNumbers('vida', { start: 14, end: 14 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v1-3',
			frames: this.anims.generateFrameNumbers('vida', { start: 15, end: 15 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v1-2',
			frames: this.anims.generateFrameNumbers('vida', { start: 16, end: 16 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v1-1',
			frames: this.anims.generateFrameNumbers('vida', { start: 17, end: 17 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'v1-0',
			frames: this.anims.generateFrameNumbers('vida', { start: 18, end: 18 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-15',
			frames: this.anims.generateFrameNumbers('aguante', { start: 19, end: 19 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-14',
			frames: this.anims.generateFrameNumbers('aguante', { start: 20, end: 20 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-13',
			frames: this.anims.generateFrameNumbers('aguante', { start: 21, end: 21 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-12',
			frames: this.anims.generateFrameNumbers('aguante', { start: 22, end: 22 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-11',
			frames: this.anims.generateFrameNumbers('aguante', { start: 23, end: 23 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-10',
			frames: this.anims.generateFrameNumbers('aguante', { start: 24, end: 24 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-9',
			frames: this.anims.generateFrameNumbers('aguante', { start: 25, end: 25 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-8',
			frames: this.anims.generateFrameNumbers('aguante', { start: 26, end: 26 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-7',
			frames: this.anims.generateFrameNumbers('aguante', { start: 27, end: 27 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-6',
			frames: this.anims.generateFrameNumbers('aguante', { start: 28, end: 28 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-5',
			frames: this.anims.generateFrameNumbers('aguante', { start: 29, end: 29 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-4',
			frames: this.anims.generateFrameNumbers('aguante', { start: 30, end: 30 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-3',
			frames: this.anims.generateFrameNumbers('aguante', { start: 31, end: 31 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-2',
			frames: this.anims.generateFrameNumbers('aguante', { start: 32, end: 32 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-1',
			frames: this.anims.generateFrameNumbers('aguante', { start: 33, end: 33 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2-0',
			frames: this.anims.generateFrameNumbers('aguante', { start: 34, end: 34 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a2--1',
			frames: this.anims.generateFrameNumbers('aguante', { start: 35, end: 35 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1-8',
			frames: this.anims.generateFrameNumbers('aguante', { start: 36, end: 36 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1-7',
			frames: this.anims.generateFrameNumbers('aguante', { start: 37, end: 37 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1-6',
			frames: this.anims.generateFrameNumbers('aguante', { start: 38, end: 38 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1-5',
			frames: this.anims.generateFrameNumbers('aguante', { start: 39, end: 39 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1-4',
			frames: this.anims.generateFrameNumbers('aguante', { start: 40, end: 40 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1-3',
			frames: this.anims.generateFrameNumbers('aguante', { start: 41, end: 41 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1-2',
			frames: this.anims.generateFrameNumbers('aguante', { start: 42, end: 42 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1-1',
			frames: this.anims.generateFrameNumbers('aguante', { start: 43, end: 43 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1-0',
			frames: this.anims.generateFrameNumbers('aguante', { start: 44, end: 44 }),
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: 'a1--1',
			frames: this.anims.generateFrameNumbers('aguante', { start: 45, end: 45 }),
			frameRate: 1,
			repeat: -1
		});
	}

	update()
	{
		this.nivvida = 3;
		this.vida = 6;
		this.nivaguante = 2;
		this.aguante = 15;
		//vida y aguante
		//vida
		if (this.nivvida == 3)
		{
			if(this.vida == 6)
			{
				this.ivida.anims.play('v3-6', true);
			}
			if(this.vida == 5)
			{
				this.ivida.anims.play('v3-5', true);
			}
			if(this.vida == 4)
			{
				this.ivida.anims.play('v3-4', true);
			}
			if(this.vida == 3)
			{
				this.ivida.anims.play('v3-3', true);
			}
			if(this.vida == 2)
			{
				this.ivida.anims.play('v3-2', true);
			}
			if(this.vida == 1)
			{
				this.ivida.anims.play('v3-1', true);
			}
			if(this.vida == 0)
			{
				this.ivida.anims.play('v3-0', true);
			}
		}
		else if (this.nivvida == 2)
		{
			if(this.vida == 5)
			{
				this.ivida.anims.play('v2-5', true);
			}
			if(this.vida == 4)
			{
				this.ivida.anims.play('v2-4', true);
			}
			if(this.vida == 3)
			{
				this.ivida.anims.play('v2-3', true);
			}
			if(this.vida == 2)
			{
				this.ivida.anims.play('v2-2', true);
			}
			if(this.vida == 1)
			{
				this.ivida.anims.play('v2-1', true);
			}
			if(this.vida == 0)
			{
				this.ivida.anims.play('v2-0', true);
			}
		}
		else if (this.nivvida == 1)
		{
			if(this.vida == 4)
			{
				this.ivida.anims.play('v1-4', true);
			}
			if(this.this.vida == 3)
			{
				this.ivida.anims.play('v1-3', true);
			}
			if(this.vida == 2)
			{
				this.ivida.anims.play('v1-2', true);
			}
			if(this.vida == 1)
			{
				this.ivida.anims.play('v1-1', true);
			}
			if(this.vida == 0)
			{
				this.ivida.anims.play('v1-0', true);
			}
		}
		//aguante
		if (this.nivaguante == 2)
		{
			if(this.aguante == 15)
			{
				this.iaguante.anims.play('a2-15', true);
			}
			if(this.aguante == 14)
			{
				this.iaguante.anims.play('a2-14', true);
			}
			if(this.aguante == 13)
			{
				this.iaguante.anims.play('a2-13', true);
			}
			if(this.aguante == 12)
			{
				this.iaguante.anims.play('a2-12', true);
			}
			if(this.aguante == 11)
			{
				this.iaguante.anims.play('a2-11', true);
			}
			if(this.aguante == 10)
			{
				this.iaguante.anims.play('a2-10', true);
			}
			if(this.aguante == 9)
			{
				this.iaguante.anims.play('a2-9', true);
			}
			if(this.aguante == 8)
			{
				this.iaguante.anims.play('a2-8', true);
			}
			if(this.aguante == 7)
			{
				this.iaguante.anims.play('a2-7', true);
			}
			if(this.aguante == 6)
			{
				this.iaguante.anims.play('a2-6', true);
			}
			if(this.aguante == 5)
			{
				this.iaguante.anims.play('a2-5', true);
			}
			if(this.aguante == 4)
			{
				this.iaguante.anims.play('a2-4', true);
			}
			if(this.aguante == 3)
			{
				this.iaguante.anims.play('a2-3', true);
			}
			if(this.aguante == 2)
			{
				this.iaguante.anims.play('a2-2', true);
			}
			if(this.aguante == 1)
			{
				this.iaguante.anims.play('a2-1', true);
			}
			if(this.aguante == 0)
			{
				this.iaguante.anims.play('a2-0', true);
			}
		}
		else if (this.nivaguante == 1)
		{
			if(this.aguante == 8)
			{
				this.iaguante.anims.play('a1-8', true);
			}
			if(this.aguante == 7)
			{
				this.iaguante.anims.play('a1-7', true);
			}
			if(this.aguante == 6)
			{
				this.iaguante.anims.play('a1-6', true);
			}
			if(this.aguante == 5)
			{
				this.iaguante.anims.play('a1-5', true);
			}
			if(this.aguante == 4)
			{
				this.iaguante.anims.play('a1-4', true);
			}
			if(this.aguante == 3)
			{
				this.iaguante.anims.play('a1-3', true);
			}
			if(this.aguante == 2)
			{
				this.iaguante.anims.play('a1-2', true);
			}
			if(this.aguante == 1)
			{
				this.iaguante.anims.play('a1-1', true);
			}
			if(this.aguante == 0)
			{
				this.iaguante.anims.play('a1-0', true);
			}
		}

		//this.scenePrincipal.player.update();
	}
}
