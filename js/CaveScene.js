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

		if (this.jabali.visible)
		{
			this.jabali.update();
		}

		for (var i = 0; i < this.enemyGroup.getChildren().length; i++)
		{
			if (this.enemyGroup.getChildren()[i].visible)
			{
			this.enemyGroup.getChildren()[i].update();
			this.shootGroup.getChildren()[i].update();
			}
		}

		/*if (this.KeyP.isDown)
		{
			this.scene.stop('CaveLevel');
			this.scene.stop('HUDScreen');
			this.scene.moveDown('ForrestLevel');
			this.scene.launch('ForrestLevel').launch('HUDScreen').stop();
		}*/
	}
}
