import BootScene from "./BootScene.js";

export default class HUDScene extends BootScene {
	constructor() {
		super("HUDScreen");
	}

	update()
	{
		this.InventarioChange();
		this.VidaText.text = "vida: " + this.player.vida;
	}
}
