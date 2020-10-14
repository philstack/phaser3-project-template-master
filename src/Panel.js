import Phaser from 'phaser';
import PaneponSettings from './PaneponSettings';
import PaneponUtils from './PaneponUtils';

const REGULAR_PANEL_TYPES = ['A', 'B', 'C', 'D', 'E', 'F'];
const PANEL_STATES = {
    inactive: 'inactive',
    active: 'active',
    falling: 'falling',
    thud: 'thud',
    flashing: 'flashing',
    scared: 'scared'
};

const PANEL_SPRITESHEET_KEY = 'blocks';
const PANEL_SPRITESHEET_STATE_OFFSET = {
    inactive: 28,
    active: 0
}
const PANEL_SPRITESHEET_OFFSET = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
};

export default class Panel extends Phaser.GameObjects.Sprite {
    constructor(panepon, panelConfig) {

        let state = panelConfig.row < 0 ? PANEL_STATES.inactive : PANEL_STATES.active;
        let panelType = (typeof panelConfig.type !== 'undefined')
            ? panelConfig.type
            : PaneponUtils.generateRandomPanelType(panepon.settings.numberOfRegularPanels); 

        let sceneCoordinates = PaneponUtils.convertStackPositionToSceneXY(panepon.settings, panelConfig.row, panelConfig.col);
        let frame = PANEL_SPRITESHEET_STATE_OFFSET[state] + PANEL_SPRITESHEET_OFFSET[panelType];
        super(panepon, sceneCoordinates.x, sceneCoordinates.y, PANEL_SPRITESHEET_KEY, frame);
        this.setOrigin(0, 0);

        this.state = state;
        this.panelType = panelType;
        this.exists = true;
        console.log(this);
    }

    activate() {
        this.state = PANEL_STATES.active;
    }
}