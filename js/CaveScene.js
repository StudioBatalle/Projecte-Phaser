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
		this.jabali.update();
		this.ojo.update();
		this.disparo.update();
		this.InventarioChange();
	}
}
