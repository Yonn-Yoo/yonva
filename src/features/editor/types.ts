import { fabric } from 'fabric';
import { ITextboxOptions } from 'fabric/fabric-impl';
import * as material from 'material-colors';

export const fonts = [
  'Arial',
  'Arial Black',
  'Verdana',
  'Helvetica',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Garamond',
  'Courier New',
  'Brush Script MT',
  'Palatino',
  'Bookman',
  'Comic Sans MS',
  'Impact',
  'Lucida Sans Unicode',
  'Geneva',
  'Lucida Console',
];

export const selectionDependentTools = [
  'fill',
  'font',
  'filter',
  'opacity',
  'remove-bg',
  'stroke-color',
  'stroke-width',
];

export type UseEditorInitArgType = {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
};

export const colors = [
  material.red['500'],
  material.pink['500'],
  material.purple['500'],
  material.deepPurple['500'],
  material.indigo['500'],
  material.blue['500'],
  material.lightBlue['500'],
  material.cyan['500'],
  material.teal['500'],
  material.green['500'],
  material.lightGreen['500'],
  material.lime['500'],
  material.yellow['500'],
  material.amber['500'],
  material.orange['500'],
  material.deepOrange['500'],
  material.brown['500'],
  material.blueGrey['500'],
  'transparent',
];

export type ToolType =
  | 'select'
  | 'shapes'
  | 'text'
  | 'images'
  | 'draw'
  | 'fill'
  | 'stroke-color'
  | 'stroke-width'
  | 'font'
  | 'opacity'
  | 'filter'
  | 'settings'
  | 'ai'
  | 'remove-bg'
  | 'templates';

export const FILL_COLOR = 'rgba(0,0,0,1)';
export const STROKE_COLOR = 'rgba(0,0,0,1)';
export const STROKE_WIDTH = 0;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = 'arial';
export const FONT_WEIGHT = 400;
export const FONT_SIZE = 24;

export const CIRCLE_OPTIONS = {
  radius: 150,
  scaleX: 0.4,
  scaleY: 0.4,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECT_OPTIONS = {
  width: 100,
  height: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const TRIANGLE_OPTIONS = {
  width: 100,
  height: 90,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeLineJoin: 'round',
  strokeWidth: STROKE_WIDTH,
};

export const TEXT_OPTIONS = {
  type: 'textbox',
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export type EditorHookProps = {
  clearSelectionCallback?: () => void;
};

export type BuildEditorType = {
  canvas: fabric.Canvas | null;
  fontFamily: string;
  fontWeight: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  strokeDashArray: number[];
  selectedObjects: fabric.Object[];
  setFontFamily: (value: string) => void;
  setFontWeight: (value: number) => void;
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setStrokeDashArray: (value: number[]) => void;
};

export type Editor = {
  delete: () => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  changeOpacity: (value: number) => void;
  changeFontWeight: (value: number) => void;
  changeFontStyle: (value: string) => void;
  changeLinethrough: (value: boolean) => void;
  changeUnderline: (value: boolean) => void;
  changeTextAlign: (value: string) => void;
  changeFontSize: (value: number) => void;
  bringForward: () => void;
  sendBackwards: () => void;
  changeFontFamily: (value: string) => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeDashArray: (value: number[]) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveLinethrough: () => boolean;
  getActiveUnderline: () => boolean;
  getActiveTextAlign: () => string;
  getActiveFontSize: () => number;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveOpactiy: () => number;
  selectedObjects: fabric.Object[];
  canvas: fabric.Canvas | null;
};
