import BootScene from "./BootScene.js";
import Inventario from "./GameObjects/Inventario.js";

export default class HUDScene extends Phaser.Scene {
	constructor() {
		super("HUDScreen");
		//link para scenes http://labs.phaser.io/edit.html?src=src/scenes%5Cregistry%20data%20exchange%20es6.js
	}

	preload()
	{
		this.load.atlas("objectsprites", "assets/images/objectssheet.png", "assets/images/objectssheet.json");
	}

	create()
	{
		//Creación de Inventario
		this.pocionYellow = new Inventario(this, this.game.config.width - 25, 25, 'objectsprites', 'objects_1.png');
		this.pocionBlue = new Inventario(this, this.pocionYellow.x - 50, 25, 'objectsprites', 'objects_2.png');
		this.pocionGreen = new Inventario(this, this.pocionBlue.x - 50, 25, 'objectsprites', 'objects_3.png');
		this.pocionRed = new Inventario(this, this.pocionGreen.x - 50, 25, 'objectsprites', 'objects_0.png');
	}

	update()
	{
		
	}
}
