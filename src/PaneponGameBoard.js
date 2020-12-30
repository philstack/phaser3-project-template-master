import Phaser from 'phaser';
import Panel from './Panel';
import PaneponCursor from './PaneponCursor'
import PaneponUtils from './PaneponUtils';
import {PANEL_WIDTH} from './paneponSceneConstants';

const LINE_LENGTH = 6;
const REGULAR_PANEL_TYPES = ['A', 'B', 'C', 'D', 'E', 'F'];

export default class PaneponGameBoard extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        this.cursor = new PaneponCursor(scene);
        scene.add.existing(this);
        this.stack = [];
    }


    


    // createNewLineOfPanels() {

    //     let types = this.scene.utils.generatePanelTypesForNewLine();

    //     let newLine = [];
    //     for (let i = 0; i < LINE_LENGTH; i++) {
    //         let panelConfig = {
    //             type: lineTypes[i],
    //             row: -1,
    //             col: i
    //         }
    //         newLine.push(new Panel(this.scene, panelConfig));
    //     }
    //     this.addMultiple(newLine, true);
    //     this.nextLine = newLine;
    // }

    // forceStackRaise() {
    //     for(let panel of this.nextLine) {

    //     }
    //     this.matrix.unshift(this.nextLine);
    //     this.incY(-16);
    //     this.createNewLine();
    // }

    swapPanels(left, right) {
        
    }

    getStackColumn(cIndex) {
        let column = [];
        for(i = 0; i < this.stack.length; i++) {
            column.push(this.stack[i][cIndex]);
        }
        return column;
    };

    getStackRow(rIndex) {
        return this.stack[rIndex]; 
    }
}