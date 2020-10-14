import { BACKGROUNDS } from './PaneponAssetManager';

const POSSIBLE_AMMOUNTS_OF_REGULAR_PANELS = [4, 5, 6];
const DEFAULT_NUMBER_OF_REGULAR_PANELS = 5;
const DEFAULT_PANEL_SIZE = 16;


export default function PaneponSettings(settings) {
  if (typeof settings === 'undefined') settings = {};

  this.background =
    (typeof settings.background !== 'undefined'
      && typeof BACKGROUNDS[settings.background] !== 'undefined')
      ? settings.background : BACKGROUNDS.DEFAULT;

  this.numberOfRegularPanels =
    POSSIBLE_AMMOUNTS_OF_REGULAR_PANELS.includes(settings.numberOfRegularPanels)
      ? settings.numberOfRegularPanels : DEFAULT_NUMBER_OF_REGULAR_PANELS;

  this.panelHeight =
    (typeof settings.panelHeight !== 'undefined')
      ? settings.panelHeight : DEFAULT_PANEL_SIZE;

  this.panelWidth =
    (typeof settings.panelWidth !== 'undefined')
      ? settings.panelWidth : DEFAULT_PANEL_SIZE;
}