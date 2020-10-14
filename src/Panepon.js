import Phaser from 'phaser';
import PaneponSettings from './PaneponSettings';
import PaneponUtils from './PaneponUtils';
import Cursor from './Cursor';
import PaneponAssetManager from './PaneponAssetManager';
import Stack from './Stack';
import PaneponControls from './PaneponControls';

const CURSOR_KEYS_TOTAL = 4;

export default class Panepon extends Phaser.Scene {
  constructor(config, paneponSettings) {
    super(config);

    this.settings = new PaneponSettings(paneponSettings);
    this.lineHistory = [];

    //Populated in create()
    this.assets = {}; 
    this.stack = null; 
    this.cursor = null; 
    this.controls = null;
    this.utils = null;
  }

  preload() {
    PaneponAssetManager.loadAllAssets(this);
  }

  create() {
    PaneponAssetManager.createBackground(this);
    this.utils = new PaneponUtils(this);
    this.cursor = new Cursor(this);
    this.stack = new Stack(this);
    this.controls = new PaneponControls(this);
    
  }

  update(time, delta) {
    PaneponAssetManager.updateBackground(this, delta);

    // Gets which cursor keys are down
    // Updates the position of the cursor based on input
    let cursorKeys = this.controls.getCursorKeysInfo();
    if (cursorKeys.justDown.length) {
      for (let key of cursorKeys.justDown) {
        this.cursor.updatePositionByKeycode(key.keyCode);
      }
      if (cursorKeys.justDown.length === cursorKeys.down.length) {
        this.cursor.stuck = true;
      }
    } else if ((this.cursor.stuck && cursorKeys.downForDuration.length) || !cursorKeys.down.length || cursorKeys.down.length === cursorKeys.max) {
      this.cursor.stuck = false;
    } else {
      if (!this.cursor.stuck) {
        for (let key of cursorKeys.down) {
          this.cursor.updatePositionByKeycode(key.keyCode);
        }
      }
    }

    // Gets whether or not shift is JustDown
    // Tells stack to force-lift itself to the next line
    if (this.controls.shiftIsJustDown()) {
      this.stack.forceStackRaise();
    }

    //this.cursor.updatePositionFromControls(this.controls);




    // let cursorKeys = [this.keyboardControls.up, this.keyboardControls.right, this.keyboardControls.down, this.keyboardControls.left];
    // let downDuration = 150;

    // let keysDown = cursorKeys.filter(key => key.isDown);
    // let keysDownForDuration = keysDown.filter(key => key.getDuration() > downDuration);
    // let cursorKeysJustDown = keysDown.filter(key => Phaser.Input.Keyboard.JustDown(key));


    // if (cursorKeysJustDown.length) {
    //   for (let key of cursorKeysJustDown) {
    //     this.cursor.updatePositionByKeycode(key.keyCode);
    //   }
    //   if (cursorKeysJustDown.length === keysDown.length) this.cursor.stuck = true;
    // } else if (
    //   (this.cursor.stuck && keysDownForDuration.length)
    //   || !keysDown.length || keysDown.length === cursorKeys.length) {
    //   this.cursor.stuck = false;

    // } else {
    //   if (!this.cursor.stuck) {
    //     for (let key of keysDown) {
    //       this.cursor.updatePositionByKeycode(key.keyCode);
    //     }
    //   }
    // }





    // console.log('this');
    // if (keysDown.length) {
    //   if (this.cursor.stuck) {
    //     if (keysDownForDuration.length) {
    //       this.cursor.stuck = false;

    //     }
    //   }
    //   else {
    //     if (cursorKeysJustDown.length) {
    //       for (let key of cursorKeysJustDown) {
    //         this.cursor.updatePositionByKeycode(key.keyCode);
    //       }
    //       this.cursor.stuck = true;
    //     } else {
    //       for (let key of cursorKeysJustDown) {
    //         this.cursor.updatePositionByKeycode(key.keyCode);
    //       }
    //     }
    //   }
    // }
   


    

    // } else {
    //   if (!keysDown.length || keysDown.length === cursorKeys.length) {
    //     this.cursor.stuck = false;
      
    //   } else {
    //     if (this.cursor.unlocked) {
    //       for (let key of keysDown) {
    //         this.cursor.updatePositionByKeycode(key.keyCode);
    //       }

    //     }
    //   }



    // }

    // let anyCursorIsDown = 
    // let anyCursorKeyHasBeenDownLongEnough = 
    //   Phaser.Input.Keyboard.DownDuration(this.keyboardControls.up, downDuration)
    //   || Phaser.Input.Keyboard.DownDuration(this.keyboardControls.right, downDuration)
    //   || Phaser.Input.Keyboard.DownDuration(this.keyboardControls.down, downDuration)
    //   || Phaser.Input.Keyboard.DownDuration(this.keyboardControls.left, downDuration);


    
    
    //[this.keyboardControls['up'], this.keyboardControls['right'], this.keyboardControls['down'], this.keyboardControls['left']]



    // [this.keyboardControls['up'], this.keyboardControls['right'], this.keyboardControls['down'], this.keyboardControls['left']].forEach((key, i, thisArray) => {     


    //     if (Phaser.Input.Keyboard.JustDown(key) 
    //     || !Phaser.Input.Keyboard.DownDuration('up', 150) 
    //     || !Phaser.Input.Keyboard.DownDuration('right', 150) 
    //     || !Phaser.Input.Keyboard.DownDuration('down', 150) 
    //     || !Phaser.Input.Keyboard.DownDuration('left', 150)) {

    //       this.cursor.updateBoardPosition(keyName);
    //     }
    //   }
    // );
  }







  // createCursor() {
  //   this.cursor = new PaneponCursor(this);
  //   // this.cursor.position = { x: 0, y: 0 };
  //   // this.cursor.updateBoardPosition = (input) => {
  //   //   if (input == 'up' && this.cursor.position.y > 0) {
  //   //     this.cursor.position.y--;
  //   //     this.cursor.y -= 16;
  //   //   }
  //   //   else if (input == 'down' && this.cursor.position.y < 10) {
  //   //     this.cursor.position.y++;
  //   //     this.cursor.y += 16;
  //   //   }
  //   //   else if (input == 'left' && this.cursor.position.x > 0) {
  //   //     this.cursor.position.x--;
  //   //     this.cursor.x -= 16;
  //   //   }
  //   //   else if (input == 'right' && this.cursor.position.x < 4) {
  //   //     this.cursor.position.x++;
  //   //     this.cursor.x += 16;
  //   //   }
  //   // }
  // }


}