import BootScene from "./BootScene.js";
import Eye from "./Characters/Eye.js";
import Shoot from "./GameObjects/Shoot.js";

//link juego de mario https://github.com/nkholski/phaser3-es6-webpack/tree/master/src

export default class CaveScene extends BootScene {
	constructor() {
		super("CaveLevel");
	}

	update()
	{
		this.player.update();
		this.bomb.update();
		this.jabali.update();

		if (this.KeyC.isDown)
		{
			this.NewEnemyEye();
			this.EnemyExist = true;
		}
		
		this.EnemyEyeUpdate();

		if (this.KeyP.isDown)
		{
			this.scene.stop('CaveLevel');
			this.scene.moveDown('ForrestLevel');
			this.scene.launch('ForrestLevel').launch('HUDScreen').stop();
		}
	}

	NewEnemyEye()
	{
		//Creación de ojo y su disparo
		for (var i = 0; i < 4; i++)
		{
			this.ojo = new Eye(this, 40 * (1 + i), 40 * (i + 1), 'ojo');
			this.disparo = new Shoot(this, this.ojo.x, this.ojo.y, 'disparo');
		}
	}

	EnemyEyeUpdate()
	{
		for (var i = 0; i < this.enemyGroup.getChildren().length; i++)
		{
			this.Egroup = this.enemyGroup.getChildren()[i];
			this.Egroup.update();
			this.Dgroup = this.shootGroup.getChildren()[i];
			this.Dgroup.update();
		}
	}
}
