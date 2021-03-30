function preload()
{
	this.load.image("sky","assets/images/background.jpg");
	this.load.image("avatar","assets/images/hero.png");
	this.load.image("doll","assets/images/npc.png");
	this.load.image("fire","assets/images/exp.png");
	this.load.image("bomb","assets/images/bomb.png");
}

function create()
{
	Fondo.call(this);
	Bombas.call(this);
	PlayerProp.call(this);
	DollProp.call(this);
	Teclas.call(this);

	this.physics.add.overlap(fire, DollGroup, destroyEnemy, null, this);

	textoCD = this.add.text(16, 16, "Cooldown: ", {fontsize:"32px", fill: "#fff"});
	textoT = this.add.text(16, 16 * 2, "Tiempo: ", {fontsize:"32px", fill: "#fff"});
	textoST = this.add.text(16, 16 * 3, "Aguante: ", {fontsize:"32px", fill: "#fff"});
	textoCDST = this.add.text(16, 16 * 4, "Cooldown ST: ", {fontsize:"32px", fill: "#fff"});
}

function PlayerProp()
{
	player = this.add.sprite(0, 0, "avatar");
	player.setOrigin(0.5, 0.5);
	player.setScale(0.35, 0.35);

	vel = 3;
	velS = vel;
	aguante = 250;
	recuperacion = 125;
	agotado = 0;
	accion = 0;

	//dirV = new Phaser.Math.Vector2(1, 0);
	//dirH = new Phaser.Math.Vector2(0, 1);
}

function Fondo()
{
	fondo = this.add.sprite(0, 0, "sky");
	fondo.setScale(1.75, 1.75);
	fondo.setOrigin(0, 0);
}

function Bombas()
{
	bomb = this.physics.add.sprite(0, 0, "bomb");
	bomb.setOrigin(0.5, 0.5);
	bomb.setScale(0.25, 0.25);
	bomb.visible = false;

	fire = this.physics.add.sprite(0, 0, "fire");
	fire.setOrigin(0.5, 0.5);
	fire.setScale(1.35, 1.35);
	fire.visible = false;
	fire.damage = 15;

	cooldown = 300;
	tiempoB = 100;
	Bactiva = 0;
	tiempoF = 75;
}

function Teclas()
{
	KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	KeyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	BombT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	Sprint = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
}

function DollProp()
{
	DollGroup = this.physics.add.group();

	dolls = new Array();

	for (var i = 0; i < 10; i++)
	{
		dolls[i] = DollGroup.create(Phaser.Math.Between(game.config.width, 0), Phaser.Math.Between(game.config.height, 0), "doll");
		dolls[i].setOrigin(0.5, 0.5);
		dolls[i].setScale(0.15, 0.15);
		dolls[i].life = 1000;
	}
}

function destroyEnemy(f, d)
{
	if (f.visible == true)
	{
		d.life = d.life - f.damage;
	}

	if (d.life == 0)
	{
		d.disableBody(true, true);
		DollGroup.remove(d);
	}
}
	
function update()
{	
	textos();
	CommandMov();
	CommandBomb();
	Stamina();
	destroyFire();
}

function CommandMov()
{
	//Control de esprint

	if (Sprint.isDown && aguante > 0 && recuperacion == 125)
	{
		velS = vel * 2.5;
		aguante--;
		accion = 1;
	}
	else
	{
		velS = vel;
		accion = 0;
	}	

	//Control de movimiento

	if (KeyA.isDown)
	{
		player.x-=velS;
	}
    else if (KeyD.isDown)
	{
		player.x+=velS;
	}
	if (KeyW.isDown)
	{
		player.y-=velS;
	}
	else if (KeyS.isDown)
	{
		player.y+=velS;
	}
}

function Stamina()
{
	//Control de aguante

	if (aguante < 250 && accion == 0)
	{
		aguante++;
	}

	if (aguante == 0)
	{
		agotado = 1;
	}

	if (agotado == 1)
	{
		recuperacion--;
	}

	if (recuperacion == 0)
	{
		agotado = 0;
		recuperacion = 125;
	}
}

function CommandBomb()
{
	if (BombT.isDown && cooldown == 0 && aguante >= 75)
	{
		bomb.x = player.x;
		bomb.y = player.y;
		bomb.visible = true;
		cooldown = 300;
		Bactiva = 1;
		aguante-=75;
	}

	if(cooldown > 0)
	{
		cooldown--;
	}

	if (Bactiva == 1)
	{
		tiempoB--;
	}

	if (tiempoB < 0)
	{
		bomb.visible = false;
		Bactiva = 0;
		tiempoB = 100;

		fire.x = bomb.x;
		fire.y = bomb.y;
		fire.visible = true;
	}
}

function destroyFire()
{
	if(fire.visible == true)
	{
		tiempoF--;

		if (tiempoF < 0)
		{
			tiempoF = 75;
			fire.visible = false;
		}
	}
}

function textos()
{
	textoCD.text = "Cooldown: " + cooldown;
	textoT.text = "Destroy Bomb: " + tiempoB;
	textoST.text = "Aguante: " + aguante;
	textoCDST.text = "Recuperacion: " + recuperacion;
}

var config = {
    type: Phaser.AUTO,
    width:800,
    height:600,
    physics:{
        default:'arcade',
        arcade: {
            gravity: {y:0}
        }
    },
    scene: {
        preload:preload,
        create:create,
        update:update
    }
};

var game = new Phaser.Game(config);