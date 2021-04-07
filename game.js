function preload()
{
	this.load.image("sky","assets/images/background.jpg");
	this.load.image("avatar","assets/images/hero.png");
	this.load.image("doll","assets/images/npc.png");
	this.load.image("fire","assets/images/exp.png");
	this.load.image("bomb","assets/images/bomb.png");
	this.load.image("pocion0","assets/images/pocionRed.png");
	this.load.image("pocion1","assets/images/pocionGreen.png");
	this.load.image("pocion2","assets/images/pocionYellow.png");
	this.load.image("pocion3","assets/images/pocionBlue.png");
}

function create()
{
	Fondo.call(this);
	Bombas.call(this);
	PlayerProp.call(this);
	DollProp.call(this);
	PocionProp.call(this);
	Teclas.call(this);

	this.physics.add.overlap(fire, DollGroup, destroyEnemy, null, this);

	textoCD = this.add.text(16, 16, "Cooldown: ", {fontsize:"32px", fill: "#fff"});
	textoT = this.add.text(16, 16 * 2, "Destroy Bomb: ", {fontsize:"32px", fill: "#fff"});
	textoST = this.add.text(16, 16 * 3, "Aguante: ", {fontsize:"32px", fill: "#fff"});
	textoCDST = this.add.text(16, 16 * 4, "Recuperacion: ", {fontsize:"32px", fill: "#fff"});
	textoPV = this.add.text(16, 16 * 5, "Vida: ", {fontsize:"32px", fill: "#fff"});
}

function PlayerProp()
{
	player = this.add.sprite(0, 0, "avatar");
	player.setOrigin(0.5, 0.5);
	player.setScale(0.35, 0.35);

	player.vida = 5;
	player.resistencia = 2;
	player.damage = 2;
	player.aguante = 250;

	vel = 3;
	velS = vel;
	recuperacion = player.aguante;

	//dirV = new Phaser.Math.Vector2(1, 0);
	//dirH = new Phaser.Math.Vector2(0, 1);
}

function Bombas()
{
	bomb = this.physics.add.sprite(0, 0, "bomb");
	bomb.setOrigin(0.5, 0.5);
	bomb.setScale(0.15, 0.15);
	bomb.visible = false;

	fire = this.physics.add.sprite(0, 0, "fire");
	fire.setOrigin(0.5, 0.5);
	fire.setScale(1.35, 1.35);
	fire.visible = false;
	fire.damage = 15;

	cooldown = 150;
	tiempoB = 100;
	Bactiva = 0;
	tiempoF = 75;
}

function PocionProp()
{
	PocionList = this.physics.add.group();

	pociones = new Array();

	for (var i = 0; i < 4; i++)
	{
		pociones[i] = PocionList.create(game.config.width - 50, 0, "pocion" + i);
		pociones[i].setOrigin(0.5, 0);
		pociones[i].visible = false;
		pociones[i].setScale(0.5, 0.5);
		pociones[i].tiempo = 100;
	}
}

function Teclas()
{
	KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	KeyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	KeyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
	KeyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
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

	if (d.life < 0)
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
	CommandPociones();
	Stamina();
	destroyFire();
}

function Stamina()
{
	//Control de aguante

	switch (player.aguante)
	{
		case 0:
			recuperacion--;

			if (recuperacion == 0)
				{
					player.aguante = 250;
					recuperacion = player.aguante;
				}
		break;
		default:

			if (player.aguante < 250 && Sprint.isUp)
			{
				player.aguante++;
			}
	}
}

function CommandMov()
{
	//Control de sprint

	if (Sprint.isDown && player.aguante > 0)
	{
		velS = vel * 2.5;
		player.aguante--;
	}
	else
	{
		velS = vel;
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

function CommandBomb()
{
	if (BombT.isDown && cooldown == 0 && player.aguante > 0)
	{
		bomb.x = player.x;
		bomb.y = player.y;
		bomb.visible = true;
		cooldown = 150;
		Bactiva = 1;

		if (player.aguante <= 75)
		{
			player.aguante-=player.aguante;
		}
		else
		{
			player.aguante-=75;
		}
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

var i = 0;

function CommandPociones()
{
	switch (i)
	{
		case 0:
			if (Phaser.Input.Keyboard.JustDown(KeyE))
			{
				pociones[i].visible = false;
				i+=1;
			}
			if (Phaser.Input.Keyboard.JustDown(KeyQ))
			{
				if (player.vida == 9)
				{
					player.vida+=1;
				}
				else if (player.vida <= 8)
				{
					player.vida+= 2;
				}
			}
		break;
		case 1:
			if (Phaser.Input.Keyboard.JustDown(KeyE))
			{
				pociones[i].visible = false;
				i+=1;
			}
			if (Phaser.Input.Keyboard.JustDown(KeyQ))
			{
				player.resistencia*=2;
			}
		break;
		case 2:
			if (Phaser.Input.Keyboard.JustDown(KeyE))
			{
				pociones[i].visible = false;
				i+=1;
			}
			if (Phaser.Input.Keyboard.JustDown(KeyQ))
			{
				player.damage*=2;
			}
		break;
		case 3:
			if (Phaser.Input.Keyboard.JustDown(KeyE))
			{
				pociones[i].visible = false;
				i = 0;
			}
		break;
	}

	pociones[i].visible = true;
}

function Fondo()
{
	fondo = this.add.sprite(0, 0, "sky");
	fondo.setScale(1.75, 1.75);
	fondo.setOrigin(0, 0);
}

function textos()
{
	textoCD.text = "Cooldown: " + cooldown;
	textoT.text = "Destroy Bomb: " + tiempoB;
	textoST.text = "Aguante: " + player.aguante;
	textoCDST.text = "Recuperacion: " + recuperacion;
	textoPV.text = "Vida: " + player.vida;
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