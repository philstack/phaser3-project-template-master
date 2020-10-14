import Phaser from 'phaser';

const CURSOR_KEYS_TOTAL = 4;

export default class Cursor extends Phaser.GameObjects.Sprite {
  constructor(panepon) {
    super(panepon, -2, -2, 'cursor');
    panepon.add.existing(this);
    this.setOrigin(0);
    this.setDepth(3);

    panepon.anims.create({
      key: 'cursor.pulse',
      frames: panepon.anims.generateFrameNumbers('cursor', { start: 0, end: 1 }),
      duration: 1000,
      repeat: -1
    });
    this.anims.play('cursor.pulse');
    this.position = { x: 0, y: 0 }; //origin is top-left
    this.stuck = false;
  }

  updatePositionFromControls(controls) {
    if (controls.keyboard) {
   
    }
  }

  updatePositionByKeycode(keyCode) {
    if (keyCode === 37 && this.position.x > 0) {
      this.position.x--;
      this.x -= 16;
    }
    else if (keyCode === 38 && this.position.y > 0) {
      this.position.y--;
      this.y -= 16;
    }
    else if (keyCode === 39 && this.position.x < 4) {
      this.position.x++;
      this.x += 16;
    }
    else if (keyCode === 40 && this.position.y < 10) {
      this.position.y++;
      this.y += 16;
    }
  }
}