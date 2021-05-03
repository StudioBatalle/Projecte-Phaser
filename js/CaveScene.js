import BootScene from "./BootScene.js";

//link juego de mario https://github.com/nkholski/phaser3-es6-webpack/tree/master/src

export default class CaveScene extends BootScene {
	constructor() {
		super("CaveLevel");
	}

	update()
	{
		this.player.update();
		this.bomb.update();
		//Commandinventario();
	}
}

/*function InventarioProp()
{


	inventario = new Array();

	for (var i = 0; i < 4; i++)
	{
		inventario[i] = InvetarioList.create(game.config.width - 50, 0, "pocion" + i);
	}

	objetoActivo = 0;
	EfectoActivo = false;
	timeEfecto = 0;
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
}*/
