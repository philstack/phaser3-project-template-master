import Phaser from 'phaser';

const CURSOR_STUCK_DURATION = 150;
const CURSOR_KEYS_TOTAL = 4;

export default class PaneponControls {
    constructor(panepon) {
        this.keyboard = panepon.input.keyboard.createCursorKeys();
        this.pointer = null;
    }

    getCursorKeysInfo() {
        let keys = [this.keyboard.left, this.keyboard.up, this.keyboard.right, this.keyboard.down];
        return {
            max: CURSOR_KEYS_TOTAL,
            down: keys.filter(key => key.isDown),
            justDown: keys.filter(key => Phaser.Input.Keyboard.JustDown(key)),
            downForDuration: keys.filter(key => key.getDuration() > CURSOR_STUCK_DURATION)
        }
    }

    shiftIsJustDown() {
        return Phaser.Input.Keyboard.JustDown(this.keyboard.shift);
    }

    // getCursorKeys() {
    //     return [this.keyboard.left, this.keyboard.up, this.keyboard.right, this.keyboard.down];
    // }

    // getCursorKeysDown() {
    //     return this.getCursorKeys.filter(key => key.isDown);
    // }

    // getCursorKeysDownForDuration() {
    //     return this.getCursorKeys.filter(key => key.getDuration() > CURSOR_STUCK_DURATION);
    // }

    // getCursorKeysJustDown() {
    //     return this.getCursorKeys.filter(key => Phaser.Input.Keyboard.JustDown(key));
    // }
}