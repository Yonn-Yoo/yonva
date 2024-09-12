import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';
import {
  BuildEditorType,
  Editor,
  EditorHookProps,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  UseEditorInitArgType,
} from '../types';
import { createFilter, isTextType } from '../utils';
import {
  CIRCLE_OPTIONS,
  RECT_OPTIONS,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
} from './../types';
import { useAutoResize } from './use-auto-resize';
import useCanvasEvents from './use-canvas-events';

const buildEditor = ({
  canvas,
  fontFamily,
  fontWeight,
  fillColor,
  strokeColor,
  strokeWidth,
  strokeDashArray,
  setFontFamily,
  setFontWeight,
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
    changeImageFilter: (value: string) => {
      const objects = canvas?.getActiveObjects();
      objects?.forEach((object) => {
        if (object.type === 'image') {
          const imageObject = object as fabric.Image;

          const effect = createFilter(value);

          imageObject.filters = effect ? [effect] : [];
          imageObject.applyFilters();
          canvas?.renderAll();
        }
      });
    },
    addImage: (value: string) => {
      fabric.Image.fromURL(
        value,
        (image) => {
          const workspace = getWorkSpace();

          image.scaleToWidth(workspace?.width || 0);
          image.scaleToHeight(workspace?.height || 0);

          addToCanvas(image);
        },
        {
          crossOrigin: 'anonymous',
        }
      );
    },
    delete: () => {
      canvas?.getActiveObjects().forEach((obj) => canvas.remove(obj));
      canvas?.discardActiveObject();
      canvas?.renderAll();
    },
    changeOpacity: (value: number) => {
      canvas?.getActiveObjects().forEach((obj) => {
        obj.set({ opacity: value });
      });
      canvas?.renderAll();
    },
    changeFontWeight: (value: number) => {
      setFontWeight(value);
      canvas?.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ fontWeight: value });
        }
      });
      canvas?.renderAll();
    },
    changeFontStyle: (value: string) => {
      canvas?.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ fontStyle: value });
        }
      });
      canvas?.renderAll();
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return 'normal';

      // @ts-ignore
      const value = selectedObject.get('fontStyle') || 'normal';

      return value;
    },
    changeLinethrough: (value: boolean) => {
      canvas?.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ linethrough: value });
        }
      });
      canvas?.renderAll();
    },
    getActiveLinethrough: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return false;

      // @ts-ignore
      const value = selectedObject.get('linethrough') || false;

      return value;
    },
    changeUnderline: (value: boolean) => {
      canvas?.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ underline: value });
        }
      });
      canvas?.renderAll();
    },
    getActiveUnderline: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return false;

      // @ts-ignore
      const value = selectedObject.get('underline') || false;

      return value;
    },
    changeTextAlign: (value: string) => {
      canvas?.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ textAlign: value });
        }
      });
      canvas?.renderAll();
    },
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return 'left';

      // @ts-ignore
      const value = selectedObject.get('textAlign') || 'left';

      return value;
    },
    changeFontSize: (value: number) => {
      canvas?.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ fontSize: value });
        }
      });
      canvas?.renderAll();
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return FONT_SIZE;

      // @ts-ignore
      const value = selectedObject.get('fontSize') || FONT_SIZE;

      return value;
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
    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas?.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ fontFamily: value });
        }
      });
      canvas?.renderAll();
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
    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        ...options,
      });
      addToCanvas(object);
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
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fontWeight;
      }

      // @ts-ignore
      const value = selectedObject.get('fontWeight') || fontWeight;

      return value;
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fontFamily;
      }

      // @ts-ignore
      const value = selectedObject.get('fontFamily') || fontFamily;

      return value;
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
  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
  const [fontWeight, setFontWeight] = useState(FONT_WEIGHT);
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
          fontFamily,
          fontWeight,
          fillColor,
          strokeColor,
          strokeWidth,
          strokeDashArray,
          setFontWeight,
          setFontFamily,
          setFillColor,
          setStrokeColor,
          setStrokeWidth,
          setStrokeDashArray,
          selectedObjects,
        })
      : undefined;
  }, [
    canvas,
    fontFamily,
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
    },
    []
  );

  return { init, editor };
}
