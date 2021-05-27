import BootScene from "./BootScene.js";

export default class ForrestScene extends Phaser.Scene {
	constructor() {
		super("ForrestLevel");
	}

	update()
	{
		/*this.player.update();
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

		if (this.KeyO.isDown)
		{
			this.scene.stop('ForrestLevel');
			this.scene.stop('HUDScreen');
			this.scene.moveDown('CaveLevel');
			this.scene.launch('CaveLevel').launch('HUDScreen').stop();
		}*/
	}
}
