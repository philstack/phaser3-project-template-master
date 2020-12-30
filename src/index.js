import Phaser from "phaser";
import ssBlocks from "./assets/blocks.png";
import imgCursor from "./assets/cursor.png"
import taStarBg from "./assets/bgDark.png"
import gradient from "./assets/gradientoverlay.png"
import Panepon from "./Panepon";

var globals = {}; //TODO don't fucking do this



function preload() {
  this.load.image('taStarBg', taStarBg);
  this.load.image('cursor', imgCursor);
  this.load.image('gradient', gradient);
  this.load.spritesheet('blocks', ssBlocks, {frameWidth: 16, frameHeight: 16});
}

function create() {

  globals.bg = this.add.tileSprite(0, 0, 96, 176, 'taStarBg').setOrigin(0,0);
  globals.bg.depth = 0;
  globals.gradient = this.add.image(0,0, 'gradient').setOrigin(0,0);

  globals.cursor = this.add.sprite(-2, -2, 'cursor').setOrigin(0);
  globals.cursor.boardPosition = {x: 0, y: 0};
  globals.cursor.depth = 3;
  globals.cursor.updateBoardPosition = (input) => {
    if (input == 'up' && globals.cursor.boardPosition.y > 0) {
      globals.cursor.boardPosition.y--;
      globals.cursor.y -= 16;
    }
    else if (input == 'down' && globals.cursor.boardPosition.y < 10) {
      globals.cursor.boardPosition.y++;
      globals.cursor.y += 16;
    }
    else if (input == 'left' && globals.cursor.boardPosition.x > 0) {
      globals.cursor.boardPosition.x--;
      globals.cursor.x -= 16;
    }
    else if (input == 'right' && globals.cursor.boardPosition.x < 4) {
      globals.cursor.boardPosition.x++;
      globals.cursor.x += 16;
    } 
  }

  globals.cursorKeys = this.input.keyboard.createCursorKeys();

  // globals.block = this.physics.add.sprite(16, 0, 'blocks')
  // .setOrigin(0,0);
  // globals.block.setBounce(0.1);
  // globals.block.setCollideWorldBounds(true);

  // globals.blocks = [];

  // globals.generateBlock = (type, position) => {
  //   var newBlock = this.physics.add.sprite(position * 16, 0, 'blocks', type);
  //   newBlock.setOrigin(0,0);
  //   newBlock.setBounce(0.1);
  //   newBlock.setCollideWorldBounds(true);
  //   globals.blocks.pop(newBlock);
  // };





  
}

function update(time, delta) {

  var bgOffset = delta * Phaser.Math.GetSpeed(60, 1);
  globals.bg.tilePositionX += bgOffset;
  globals.bg.tilePositionY -= bgOffset;

  ['up', 'down', 'left', 'right'].forEach((keyName) => {
    var key = globals.cursorKeys[keyName];
    if (Phaser.Input.Keyboard.JustDown(key) || (key.isDown && !Phaser.Input.Keyboard.DownDuration(key, 150))) {
      globals.cursor.updateBoardPosition(keyName);
    }
  });

  if (Phaser.Input.Keyboard.JustDown(globals.cursorKeys.shift)) {
    var newLine = panepon.generateLine();
    panepon.gameBoard.matrix.unshift(newLine);
    panepon.gameBoard.lineHistory.push(newLine);
    for (var line = panepon.gameBoard.matrix.length - 1; line > 0; line--) {
      for (var block = 0; block < 6; block++) {
        if (panepon.gameBoard.matrix[line][block]) panepon.gameBoard.matrix[line][block].sprite.y -= 16;
      }
    }
    for (var block = 0; block < 6; block++) {
      panepon.gameBoard.matrix[0][block].sprite = this.add.sprite(16 * block, 16 * 10, 'blocks', panepon.gameBoard.matrix[0][block].type).setOrigin(0,0);
      panepon.gameBoard.checkQueue += [0, block];
    }
    console.log('New line added.');
  }

  // scan for matches up each column
  for (var c = 0; c < 6; c++) {
    for (var r = 0; r < panepon.gameBoard.matrix.length; r++) {
      if (!panepon.gameBoard.matrix[r][c]) break;

      var block0 = panepon.gameBoard.matrix[r][c];
      var block1 = panepon.gameBoard.matrix[r][c + 1];
      var block2 = panepon.gameBoard.matrix[r][c + 2];

      if (block1 && block2 && block0.type === block1.type && block2.type === block0.type) {
        [block0, block1, block2].forEach(block => block.delete = true);
      } 

      if (!panepon.gameBoard.matrix[r + 2]) continue;
      block1 = panepon.gameBoard.matrix[r + 1][c];
      block2 = panepon.gameBoard.matrix[r + 2][c];

      if (block1 && block2 && block0.type === block1.type && block2.type === block0.type) {
        [block0, block1, block2].forEach(block => block.delete = true);
      } 

    }
  }
  
  for (var r = 0; r < panepon.gameBoard.matrix.length; r++) {
    for(var c = 0; c < 6; c++) {
      if (panepon.gameBoard.matrix[r][c] && panepon.gameBoard.matrix[r][c].delete) {
        panepon.gameBoard.matrix[r][c].sprite.destroy();
        panepon.gameBoard.matrix[r][c] = null;

        for (var i = r; i < panepon.gameBoard.matrix.length - 1; i++) {
          if (!panepon.gameBoard.matrix[i + 1][c]) {
            panepon.gameBoard.matrix[i][c] = null; 
            break;
          } else {
            panepon.gameBoard.matrix[i][c] = panepon.gameBoard.matrix[i + 1][c];
            panepon.gameBoard.matrix[i][c].sprite.y += 16;
          }
        }
      }
    }
  }
}

var settingsConfig = {
  active: true,
  
}
var panepon = new Panepon(settingsConfig);

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "phaser-example",
  title: 'untitled Panepon/Tetris Attack/Puzzle League clone',
  width: 96,
  height: 176,
  zoom: Math.max(Math.min(window.innerHeight / 176, window.innerWidth / 96), 1),
  pixelArt: true,
  scene: panepon,
});