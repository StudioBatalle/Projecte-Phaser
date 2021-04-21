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
	InventarioProp.call(this);
	Teclas.call(this);
	Textos.call(this);

	this.physics.add.overlap(fire, DollGroup, destroyEnemy, null, this);
	this.time.addEvent({ delay: 1000, callback: cronometro, callbackScope: this, loop: true });
}

function PlayerProp()
{
	player = this.add.sprite(0, 0, "avatar");
	player.setOrigin(0.5, 0.5);
	player.setScale(0.35, 0.35);

	//Para controlar mejor las estadisticas y asi poder mejorarlas cuando se pase el primer nivel

	vidaMax = 10;
	resistenciaMax = 2;
	damageMax = 2;
	aguanteMax = 150;

	player.vida = vidaMax / 2; //Estadistica cambiada para visualizar el efecto de pocion
	player.resistencia = resistenciaMax;
	player.damage = damageMax;
	player.aguante = aguanteMax;

	vel = 3;
	velS = vel;
	recuperacion = false;
	timeRecuperacion = 15;
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

	cooldown = 25;
	tiempoB = 2;
	Bactiva = false;
	tiempoF = 5;
}

function InventarioProp()
{
	InvetarioList = this.physics.add.group();

	inventario = new Array();

	for (var i = 0; i < 4; i++)
	{
		inventario[i] = InvetarioList.create(game.config.width - 50, 0, "pocion" + i);
		inventario[i].setOrigin(0.5, 0);
		inventario[i].visible = false;
		inventario[i].setScale(0.5, 0.5);
	}

	objetoActivo = 0;
	EfectoActivo = false;
	timeEfecto = 0;
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
	Sprint = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
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

function cronometro()
{
	//Control de los efectos de pocion

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
	}

	//Control del aguante

	if (recuperacion)
	{
		timeRecuperacion--; 

		if (timeRecuperacion == 0)
		{
			player.aguante = aguanteMax;
			timeRecuperacion = 15;
			recuperacion = false;
		}
	}

	if (Bactiva)
	{
		tiempoB--;
	}
	else if (cooldown > 0)
	{
		cooldown--;	
	}

	//Destruye la explosion

	if (fire.visible)
	{
		tiempoF--;

		if (tiempoF < 0)
		{
			tiempoF = 5;
			fire.visible = false;
		}
	}
}

function Textos()
{
	textoCD = this.add.text(16, 16, "Cooldown: ", {fontsize:"32px", fill: "#fff"});
	textoT = this.add.text(16, 16 * 2, "Destroy Bomb: ", {fontsize:"32px", fill: "#fff"});
	textoST = this.add.text(16, 16 * 3, "Aguante: ", {fontsize:"32px", fill: "#fff"});
	textoCDST = this.add.text(16, 16 * 4, "Recuperacion: ", {fontsize:"32px", fill: "#fff"});
	textoPV = this.add.text(16, 16 * 5, "Vida: ", {fontsize:"32px", fill: "#fff"});
	textoPR = this.add.text(16, 16 * 6, "Resistencia: ", {fontsize:"32px", fill: "#fff"});
	textoPD = this.add.text(16, 16 * 7, "Danyo: ", {fontsize:"32px", fill: "#fff"});
	textoTE = this.add.text(16, 16 * 8, "tiempo efecto: ", {fontsize:"32px", fill: "#fff"});
	textoTR = this.add.text(16, 16 * 9, "tiempo recuperacion: ", {fontsize:"32px", fill: "#fff"});
}
	
function update()
{	
	textosUpdate();
	CommandMov();
	CommandBomb();
	Commandinventario();
	Stamina();
}

function Stamina()
{
	//Control de aguante

	switch (player.aguante)
	{
		case 0:
			recuperacion = true;
		break;
		default:
		if (player.aguante < aguanteMax && Sprint.isUp)
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
	{ player.x-=velS; }
	else if (KeyD.isDown)
	{ player.x+=velS; }

	if (KeyW.isDown)
	{
		player.y-=velS;

		if (KeyA.isDown)
		{ 
			//Condiciones para diagonales, si se necesita en especifico que este moviendose en diagonal 
		}
		else if (KeyD.isDown)
		{ }
	}
	else if (KeyS.isDown)
	{
		player.y+=velS;

		if (KeyA.isDown)
		{
			//Condiciones para diagonales, si se necesita en especifico que este moviendose en diagonal
		}
		else if (KeyD.isDown)
		{ }
	}
}

function CommandBomb()
{
	if (BombT.isDown && cooldown == 0 && player.aguante > 0)
	{
		bomb.x = player.x;
		bomb.y = player.y;
		bomb.visible = true;
		cooldown = 25;
		Bactiva = true;

		if (player.aguante <= 75)
		{
			player.aguante-=player.aguante;
		}
		else
		{
			player.aguante-=75;
		}
	}

	if (tiempoB < 0)
	{
		bomb.visible = false;
		Bactiva = false;
		tiempoB = 2;

		fire.x = bomb.x;
		fire.y = bomb.y;
		fire.visible = true;
	}
}

function Commandinventario()
{
	var JustDown = Phaser.Input.Keyboard.JustDown;

	switch (objetoActivo)
	{
		case 0:
			if (JustDown(KeyE))
			{
				inventario[objetoActivo].visible = false;
				objetoActivo+=1;
			}
			if (JustDown(KeyQ) && player.vida < vidaMax)
			{
				player.vida+=1;
			}
		break;
		case 1:
			if (JustDown(KeyE))
			{
				inventario[objetoActivo].visible = false;
				objetoActivo+=1;
			}
			if (JustDown(KeyQ))
			{
				if (EfectoActivo == false)
				{
					player.resistencia*=2;
					EfectoActivo = true;
				}
			}
		break;
		case 2:
			if (JustDown(KeyE))
			{
				inventario[objetoActivo].visible = false;
				objetoActivo+=1;
			}
			if (JustDown(KeyQ))
			{
				if (EfectoActivo == false)
				{
					player.damage*=2;
					EfectoActivo = true;
				}
			}
		break;
		case 3:
			if (JustDown(KeyE))
			{
				inventario[objetoActivo].visible = false;
				objetoActivo = 0;
			}
			if (JustDown(KeyQ))
			{
				player.aguante+=50;
				recuperacion = false;
				timeRecuperacion = 15;
			}
		break;
	}

	inventario[objetoActivo].visible = true;
}

function Fondo()
{
	fondo = this.add.sprite(0, 0, "sky");
	fondo.setScale(1.75, 1.75);
	fondo.setOrigin(0, 0);
}

function textosUpdate()
{
	textoCD.text = "Cooldown: " + cooldown;
	textoT.text = "Destroy Bomb: " + tiempoB;
	textoST.text = "Aguante: " + player.aguante;
	textoCDST.text = "Recuperacion: " + recuperacion;
	textoPV.text = "Vida: " + player.vida;
	textoPR.text = "Resistencia: " + player.resistencia;
	textoPD.text = "Danyo: " + player.damage;
	textoTE.text = "tiempo efecto: " + timeEfecto;
	textoTR.text = "tiempo recuperacion: " + timeRecuperacion;
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
    fps: {
	target: 120,
	forceSetTimeOut: true
	},
    scene: {
        preload:preload,
        create:create,
        update:update
    }
};

var game = new Phaser.Game(config);