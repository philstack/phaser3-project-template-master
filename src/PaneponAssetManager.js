import Phaser from 'phaser';
import PaneponSettings from './PaneponSettings';

export default class PaneponAssetManager {

  static loadAllAssets(panepon) {
    BACKGROUNDS[panepon.settings.background].preload(panepon);
    panepon.load.spritesheet('cursor', 'src/assets/cursor.png', { frameWidth: 36, frameHeight: 20 });
    panepon.load.spritesheet('blocks', 'src/assets/blocks.png', { frameWidth: 16, frameHeight: 16 });
  }

  static createBackground(panepon) {
    BACKGROUNDS[panepon.settings.background].create(panepon);
  }
  static updateBackground(panepon, delta) {
    BACKGROUNDS[panepon.settings.background].update(panepon, delta);
  }

}
























export const BACKGROUNDS = {
  taStarDark: {
    preload: (panepon) => {
      panepon.load.image('taStarDark', 'src/assets/bgDark.png');
      panepon.load.image('gradient', 'src/assets/gradientoverlay.png');
    },
    create: (panepon) => {
      panepon.assets.background = {
        tile: panepon.add.tileSprite(0, 0, 96, 176, 'taStarDark'),
        gradient: panepon.add.image(0, 0, 'gradient')
      }
      panepon.assets.background.tile = panepon.add.tileSprite(0, 0, 96, 176, 'taStarDark');
      panepon.assets.background.tile.setOrigin(0, 0);
      panepon.assets.background.tile.setDepth(0);
      panepon.assets.background.gradient = panepon.add.image(0, 0, 'gradient');
      panepon.assets.background.gradient.setOrigin(0, 0);
    },
    update: (panepon, delta) => {
      var bgOffset = delta * Phaser.Math.GetSpeed(60, 1);
      panepon.assets.background.tile.tilePositionX += bgOffset;
      panepon.assets.background.tile.tilePositionY -= bgOffset;
    }


  },

  DEFAULT: 'taStarDark',
}