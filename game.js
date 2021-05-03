var mirandoderecha;
var iaguante;
var ivida;
var KeyJ
var KeyK
class Example extends Phaser.Scene {
	constructor() {
		super();
		this.moveCam = false;
	}
	preload() {
		//mapa
		this.load.image('bg', 'assets/testmap.png');
		//jugador
		this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
		//indicadores
		this.load.spritesheet('vida', 'assets/vida.png', { frameWidth: 160, frameHeight: 160 });
		this.load.spritesheet('aguante', 'assets/aguante.png', { frameWidth: 160, frameHeight: 160 });
	}
	create() {
     
		//  Camara
		this.cameras.main.setBounds(-0, -0, 1535, 960);
		this.physics.world.setBounds(-0, -0, 1535, 960);
		this.add.image(0, 0, 'bg').setOrigin(0);
		
		//teclas
		KeyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
		KeyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
		this.cursors = this.input.keyboard.createCursorKeys();
		this.cameras.main.setDeadzone(400, 200);
		//this.cameras.main.setZoom(0.5);
		if (this.cameras.main.deadzone) {
			const graphics = this.add.graphics().setScrollFactor(0);
			graphics.lineStyle(2, 0x00ff00, 1);
			graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
		}
		this.text = this.add.text(32, 32).setScrollFactor(0).setFontSize(32).setColor('#ffffff');


		//jugador
		this.player = this.physics.add.sprite(400, 300, 'player');
		this.player.setCollideWorldBounds(true);
		this.cameras.main.startFollow(this.player, true);
		this.anims.create({
			key: 'idler',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'idlel',
			frames: this.anims.generateFrameNumbers('player', { start: 13, end: 15 }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 12 }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'rright',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 12 }),
			frameRate: 25,
			repeat: -1
		});
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('player', { start: 13, end: 25 }),
			frameRate: 15,
			repeat: -1
		});
		this.anims.create({
			key: 'rleft',
			frames: this.anims.generateFrameNumbers('player', { start: 13, end: 25 }),
			frameRate: 25,
			repeat: -1
		});
		this.anims.create({
			key: 'atqr',
			frames: this.anims.generateFrameNumbers('player', { start: 26, end: 30 }),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'atql',
			frames: this.anims.generateFrameNumbers('player', { start: 31, end: 35 }),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'down',
			frames: this.anims.generateFrameNumbers('player', { start: 36, end: 50 }),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'rdown',
			frames: this.anims.generateFrameNumbers('player', { start: 36, end: 50 }),
			frameRate: 25,
			repeat: 1
		});
		this.anims.create({
			key: 'up',
			frames: this.anims.generateFrameNumbers('player', { start: 51, end: 66 }),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'rup',
			frames: this.anims.generateFrameNumbers('player', { start: 51, end: 66 }),
			frameRate: 25,
			repeat: 1
		});
		this.anims.create({
			key: 'atqu',
			frames: this.anims.generateFrameNumbers('player', { start: 67, end: 71 }),
			frameRate: 15,
			repeat: 1
		});
		this.anims.create({
			key: 'atqd',
			frames: this.anims.generateFrameNumbers('player', { start: 72, end: 76 }),
			frameRate: 15,
			repeat: 1
		});
		//indicadores vida y aguante
		ivida = this.add.sprite(750, 75, 'vida');
		ivida.setScale(0.5, 0.5);
		
		iaguante = this.add.sprite(750, 100, 'aguante');
		iaguante.setScale(0.5, 0.5);
	
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
	update() {
		var cam = this.cameras.main;
		this.player.setVelocity(0);
		if (this.cursors.left.isDown) 
		{
			if (KeyK.isDown)
			{
				this.player.setVelocityX(-150);
				this.player.anims.play('rleft', true);
				mirandoderecha = 0;
			}
			else
			{
				this.player.setVelocityX(-100);
				this.player.anims.play('left', true);
				mirandoderecha = 0;
			}
		}
		else if (this.cursors.right.isDown) 
		{
			if (KeyK.isDown)
			{
				this.player.setVelocityX(150);
				this.player.anims.play('rright', true);
				mirandoderecha = 1;
			}
			else
			{
				this.player.setVelocityX(100);
				this.player.anims.play('right', true);
				mirandoderecha = 1;
			}
		}
		else if (this.cursors.up.isDown && this.cursors.left.isUp && this.cursors.right.isUp) 
		{
			if(KeyK.isDown)
			{
				this.player.setVelocityY(-150);
				this.player.anims.play('rup', true);
				mirandoderecha = 2;
			}
			else
			{
				this.player.setVelocityY(-100);
				this.player.anims.play('up', true);
				mirandoderecha = 2;
			}
		}
		else if (this.cursors.down.isDown && this.cursors.left.isUp && this.cursors.right.isUp) 
		{
			if (KeyK.isDown)
			{
				this.player.setVelocityY(150);
				this.player.anims.play('rdown', true);
				mirandoderecha = 3;
			}
			else
			{
				this.player.setVelocityY(100);
				this.player.anims.play('down', true);
				mirandoderecha = 3;
			}
		}
		else if (KeyJ.isDown)
		{
			if (mirandoderecha == 0)
			{
				this.player.anims.play('atql',true);
			}
			else if (mirandoderecha == 1) 
			{
				this.player.anims.play('atqr',true);
			}
			else if (mirandoderecha == 2)
			{
				this.player.anims.play('atqu',true);
			}
			else if (mirandoderecha == 3)
			{
				this.player.anims.play('atqd',true);
			}
		}
		else 
		{
			if (mirandoderecha == 0)
			{
				this.player.anims.play('idlel', true);
			}
		
			else
			{
				this.player.anims.play('idler', true);
			}
		}
	}
}

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
	},
	fps: {
		target: 30,
		forceSetTimeOut: true
	},
	scene: [Example]
};
const game = new Phaser.Game(config);
