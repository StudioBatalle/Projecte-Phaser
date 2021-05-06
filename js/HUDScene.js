import BootScene from "./BootScene.js";

export default class HUDScene extends BootScene {
	constructor() {
		super("HUDScreen");
	}

  create()
  {
    this.pocionRed = new PocionRed(this, this.game.config.width, 0, 'object_sprites', 'pocionred');
		this.pocionGreen = new PocionGreen(this, this.game.config.width - this.pocionRed.width, 0, 'object_sprites', 'pociongreen');
		this.pocionBlue = new PocionBlue(this, this.game.config.width, 0, 'object_sprites', 'pocionblue');
		this.pocionYellow = new PocionYellow(this, this.game.config.width, 0, 'object_sprites', 'pocionyellow');
  }
}

import PocionRed from "./GameObjects/PocionRed.js";
import PocionGreen from "./GameObjects/PocionGreen.js";
import PocionBlue from "./GameObjects/PocionBlue.js";
import PocionYellow from "./GameObjects/PocionYellow.js";
import Inventario from "./GameObjects/Inventario.js";
