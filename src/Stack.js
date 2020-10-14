import Phaser from 'phaser';
import Panel from './Panel';
import PaneponUtils from './PaneponUtils';
import {PANEL_WIDTH} from './PaneponSceneConstants';

const LINE_LENGTH = 6;
const REGULAR_PANEL_TYPES = ['A', 'B', 'C', 'D', 'E', 'F'];

export default class GameBoard extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        this.cursor = new Cursor(scene);

        panepon.add.existing(this);

        this.stack = [];
        this.nextLine = panepon.utils.generatePanelTypesForNewLine();
    }


    


    createNewLineOfPanels() {

        let types = this.scene.utils.generatePanelTypesForNewLine();

        let newLine = [];
        for (let i = 0; i < LINE_LENGTH; i++) {
            let panelConfig = {
                type: lineTypes[i],
                row: -1,
                col: i
            }
            newLine.push(new Panel(this.scene, panelConfig));
        }
        this.addMultiple(newLine, true);
        this.nextLine = newLine;
    }

    forceStackRaise() {
        for(let panel of this.nextLine) {

        }
        this.matrix.unshift(this.nextLine);
        this.incY(-16);
        this.createNewLine();
    }

    swapPanels(left, right) {
        
    }

    getColumn(cIndex) {
        let column = [];
        for(i = 0; i < this.matrix.length; i++) {
            column.push(this.matrix[i][cIndex]);
        }
        return column;
    };

    getRow(rIndex) {
        return this.matrix[rIndex]; 
    }
}