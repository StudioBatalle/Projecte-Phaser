//import Phaser from 'phaser';

export default function Teclas()
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
