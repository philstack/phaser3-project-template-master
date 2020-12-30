export const LINE_LENGTH = 6;
export const PANEL_HEIGHT = 16;
export const PANEL_WIDTH = 16;
export const REGULAR_PANEL_TYPES = ['A', 'B', 'C', 'D', 'E', 'F'];

export const ASSETS = {
    backgrounds: {
        taGrayStars: {
            fileName: 'bg.png',
            assetType: ''
        }
    }
};

export const CONTROLS_CURSOR_STUCKDURATION = 150;
export const CONTROLS_CURSOR_TOTALCURSORKEYS = 4;

export const PANEL_STATES = {
    inactive: 'inactive',
    active: 'active',
    falling: 'falling',
    thud: 'thud',
    flashing: 'flashing',
    scared: 'scared'
};


export const anims_cursor_pulse = { key: 'cursor_pulse', frames: [0, 1], duration: 1000, repeat: -1 };