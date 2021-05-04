export default class Inventario extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, textureKey, key){
    super(scene, x, y, textureKey, key);
		this.scene.add.existing(this);
      this.setScale(0.55, 0.55);
      this.visible = false;
      this.almacenado = 3;
      this.objetoActivo;
      //EfectoActivo = false;
    	//timeEfecto = 0;

      const { E, Q } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
          KeyE: E,
          KeyQ: Q,
        });
  }

  update()
  {
    const { keys } = this;

    var JustDown = Phaser.Input.Keyboard.JustDown;

    switch (objetoActivo)
    {
      case 0:
        if (keys.JustDown(KeyE))
        {
          inventario[objetoActivo].visible = false;
          objetoActivo+=1;
        }
        if (keys.JustDown(KeyQ) && player.vida < vidaMax)
        {
          player.vida+=1;
        }
      break;
      case 1:
        if (keys.JustDown(KeyE))
        {
          inventario[objetoActivo].visible = false;
          objetoActivo+=1;
        }
        if (keys.JustDown(KeyQ))
        {
          if (EfectoActivo == false)
          {
            player.resistencia*=2;
            EfectoActivo = true;
          }
        }
      break;
      case 2:
        if (keys.JustDown(KeyE))
        {
          inventario[objetoActivo].visible = false;
          objetoActivo+=1;
        }
        if (keys.JustDown(KeyQ))
        {
          if (EfectoActivo == false)
          {
            player.damage*=2;
            EfectoActivo = true;
          }
        }
      break;
      case 3:
        if (keys.JustDown(KeyE))
        {
          inventario[objetoActivo].visible = false;
          objetoActivo = 0;
        }
        if (keys.JustDown(KeyQ))
        {
          player.aguante+=50;
          recuperacion = false;
          timeRecuperacion = 15;
        }
      break;
    }

    inventario[objetoActivo].visible = true;
  }
}
