import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';
import {
  BuildEditorType,
  Editor,
  EditorHookProps,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
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
  strokeDashArray,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  setStrokeDashArray,
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
    changeOpacity: (value: number) => {
      canvas?.getActiveObjects().forEach((obj) => {
        obj.set({ opacity: value });
      });
      canvas?.renderAll();
    },
    bringForward: () => {
      canvas?.getActiveObjects().forEach((obj) => {
        canvas.bringForward(obj);
      });
      canvas?.renderAll();

      const workspace = getWorkSpace();
      workspace?.sendToBack();
    },
    sendBackwards: () => {
      canvas?.getActiveObjects().forEach((obj) => {
        canvas.sendBackwards(obj);
      });
      canvas?.renderAll();

      const workspace = getWorkSpace();
      workspace?.sendToBack();
    },
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
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas?.getActiveObjects().forEach((obj) => {
        obj.set({ strokeDashArray: value });
      });
      canvas?.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
      });
      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECT_OPTIONS,
      });
      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECT_OPTIONS,
        rx: 6,
        ry: 6,
      });
      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
      });
      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,

        flipY: true,
      });
      addToCanvas(object);
    },
    addDiamond: () => {
      const object = new fabric.Polygon(
        [
          { x: 65, y: 0 },
          { x: 130, y: 65 },
          { x: 65, y: 130 },
          { x: 0, y: 65 },
        ],
        {
          ...RECT_OPTIONS,
          strokeLineJoin: 'round',
        }
      );
      addToCanvas(object);
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
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeColor;
      }

      const value = selectedObject.get('stroke') || strokeColor;
      return value;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeWidth;
      }

      const value = selectedObject.get('strokeWidth') || strokeWidth;
      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeDashArray;
      }

      const value = selectedObject.get('strokeDashArray') || strokeDashArray;
      return value;
    },
    getActiveOpactiy: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 1;
      }

      const value = selectedObject.get('opacity') || 1;
      return value;
    },
    selectedObjects,
    canvas,
  };
};

export default function useEditor({ clearSelectionCallback }: EditorHookProps) {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
  });

  const editor = useMemo(() => {
    return canvas
      ? buildEditor({
          canvas,
          fillColor,
          strokeColor,
          strokeWidth,
          strokeDashArray,
          setFillColor,
          setStrokeColor,
          setStrokeWidth,
          setStrokeDashArray,
          selectedObjects,
        })
      : undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    strokeDashArray,
    selectedObjects,
  ]);

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

      const testText = new fabric.Text('Hello world!', {
        fontWeight: 600,
        fontSize: 42,
      });

      initialCanvas.add(testText);
      initialCanvas.centerObject(testText);
    },
    []
  );

  return { init, editor };
}
