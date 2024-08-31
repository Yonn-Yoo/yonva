import { fabric } from 'fabric';

export type UseEditorInitArgType = {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
};

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
export const STROKE_WIDTH = 2;

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
  strokeWidth: 4,
};

export type BuildEditorType = {
  canvas: fabric.Canvas | null;
};

export type Editor = {
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
};
