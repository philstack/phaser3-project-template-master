import Phaser from 'phaser';
import Panel from './Panel';

const REGULAR_PANEL_TYPES = ['A', 'B', 'C', 'D', 'E', 'F'];
const LINE_LENGTH = 6;

export default class PaneponUtils {
    constructor(panepon) {
        this.panelHeight = panepon.settings.panelHeight;
        this.panelWidth = panepon.settings.panelWidth;
        this.numberOfRegularPanels = panepon.settings.numberOfRegularPanels;
    }

    generatePanelTypesForNewLine() {
        let line = [];

        for (let i = 0; i < LINE_LENGTH; i++) {
            let exclude = (i >= 2 && (line[i - 2] === line[i - 1])) ? line[i - 1] : null;
            line.push(this.generatePanelType(exclude));
        }

        return line;
    }
    generatePanelType(exclude) {
        if (exclude) {
            var types = [];
            for (var i = 0; i < this.numberOfRegularPanels; i++) {
                if (REGULAR_PANEL_TYPES[i] === exclude) continue;
                types.push(REGULAR_PANEL_TYPES[i]);
            }

            return types[Math.floor(Math.random() * types.length)];
        } else return REGULAR_PANEL_TYPES[Math.floor(Math.random() * this.numberOfRegularPanels)];

    }

    static convertStackPositionToSceneXY(paneponSettings, row, col) {
        let stackOriginYInSceneCoordinates = this.panelHeight * 11;
        return {
            x: paneponSettings.panelWidth * col,
            y: stackOriginYInSceneCoordinates - (paneponSettings.panelHeight * row)
        }
    }
}