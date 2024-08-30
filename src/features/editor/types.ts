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
