import Phaser from 'phaser';

const CONTROLS_CURSOR_STUCKDURATION = 150;
const CONTROLS_CURSOR_TOTALCURSORKEYS = 4;

export default class PaneponControls {
    constructor(panepon) {
        this.keyboard = panepon.input.keyboard.createCursorKeys();
        this.pointer = null;
    }

    getCursorKeysInfo() {
        let keys = [this.keyboard.left, this.keyboard.up, this.keyboard.right, this.keyboard.down];
        return {
            max: CONTROLS_CURSOR_TOTALCURSORKEYS,
            down: keys.filter(key => key.isDown),
            justDown: keys.filter(key => Phaser.Input.Keyboard.JustDown(key)),
            downForDuration: keys.filter(key => key.getDuration() > CONTROLS_CURSOR_STUCKDURATION)
        }
    }

    shiftIsJustDown() {
        return Phaser.Input.Keyboard.JustDown(this.keyboard.shift);
    }

    getCursorKeys() {
        return [this.keyboard.left, this.keyboard.up, this.keyboard.right, this.keyboard.down];
    }

    getCursorKeysDown() {
        return this.getCursorKeys().filter(key => key.isDown);
    }

    getCursorKeysDownForDuration() {
        return this.getCursorKeys().filter(key => key.getDuration() > CONTROLS_CURSOR_STUCKDURATION);
    }

    getCursorKeysJustDown() {
        return this.getCursorKeys().filter(key => Phaser.Input.Keyboard.JustDown(key));
    }
}