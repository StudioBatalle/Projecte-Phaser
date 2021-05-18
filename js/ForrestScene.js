import Player from "./Characters/Player.js";
import Bomb from "./GameObjects/Bomb.js";
import Fire from "./GameObjects/Fire.js";
import BootScene from "./BootScene.js";

//link juego de mario https://github.com/nkholski/phaser3-es6-webpack/tree/master/src

export default class ForrestScene extends BootScene {
	constructor() {
		super("ForrestLevel");
	}
}
