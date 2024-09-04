import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';
import {
  BuildEditorType,
  Editor,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
  UseEditorInitArgType,
} from '../types';
import { isTextType } from '../utils';
import { CIRCLE_OPTIONS, RECT_OPTIONS, TRIANGLE_OPTIONS } from './../types';
import { useAutoResize } from './use-auto-resize';
import useCanvasEvents from './use-canvas-events';

const buildEditor = ({
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  selectedObjects,
}: BuildEditorType): Editor => {
  const getWorkSpace = () => {
    return canvas?.getObjects().find((obj) => obj.name === 'clip');
  };

  const center = (object: fabric.Object) => {
    const workSpace = getWorkSpace();
    const center = workSpace?.getCenterPoint();

    if (!center) return;

    // @ts-ignore
    canvas?._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas?.add(object);
    canvas?.setActiveObject(object);
  };

  return {
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas?.getActiveObjects().forEach((obj) => {
        obj.set({ fill: value });
      });
      canvas?.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas?.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          obj.set({ fill: value });
          return;
        }
        obj.set({ stroke: value });
      });
      canvas?.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas?.getActiveObjects().forEach((obj) => {
        obj.set({ strokeWidth: value });
      });
      canvas?.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
      });
      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECT_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
      });
      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECT_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        rx: 6,
        ry: 6,
      });
      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
      });
      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        flipY: true,
      });
      addToCanvas(object);
    },
    addDiamond: () => {
      const objec = new fabric.Polygon(
        [
          { x: 65, y: 0 },
          { x: 130, y: 65 },
          { x: 65, y: 130 },
          { x: 0, y: 65 },
        ],
        {
          ...RECT_OPTIONS,
          strokeLineJoin: 'round',
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
        }
      );
      addToCanvas(objec);
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fillColor;
      }

      const value = selectedObject.get('fill') || fillColor;

      // Currently, gradients & patterns are not supported
      return value as string;
    },
    selectedObjects,
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
  };
};

export default function useEditor() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);

  useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({
    canvas,
    container,
    setSelectedObjects,
  });

  const editor = useMemo(() => {
    return canvas
      ? buildEditor({
          canvas,
          fillColor,
          strokeColor,
          strokeWidth,
          setFillColor,
          setStrokeColor,
          setStrokeWidth,
          selectedObjects,
        })
      : undefined;
  }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects]);

  const init = useCallback(
    ({ initialCanvas, initialContainer }: UseEditorInitArgType) => {
      fabric.Object.prototype.set({
        cornerColor: '#fff',
        cornerSize: 8,
        cornerStrokeColor: '#3b82f6',
        fill: '#7b61ff',
        cornerStyle: 'circle',
        borderColor: '#3b82f6',
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
      });

      const initialWorkspace = new fabric.Rect({
        width: 500,
        height: 800,
        name: 'clip',
        fill: 'white',
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.8)',
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const testText = new fabric.Text('hello world', {
        fontWeight: 500,
        fontSize: 16,
      });

      initialCanvas.add(testText);
      initialCanvas.centerObject(testText);
    },
    []
  );

  return { init, editor };
}
