import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';
import { BuildEditorType, Editor, UseEditorInitArgType } from '../types';
import { CIRCLE_OPTIONS, RECT_OPTIONS, TRIANGLE_OPTIONS } from './../types';
import { useAutoResize } from './use-auto-resize';

const buildEditor = ({ canvas }: BuildEditorType): Editor => {
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
      const objec = new fabric.Polygon(
        [
          { x: 65, y: 0 },
          { x: 130, y: 65 },
          { x: 65, y: 130 },
          { x: 0, y: 65 },
        ],
        { ...RECT_OPTIONS, strokeLineJoin: 'round', strokeWidth: 8 }
      );
      const object = new fabric.Rect({
        ...RECT_OPTIONS,
        rx: 10,
        ry: 10,
        angle: 45,
      });
      addToCanvas(objec);
    },
  };
};

export default function useEditor() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({
    canvas,
    container,
  });

  const editor = useMemo(() => {
    return canvas ? buildEditor({ canvas }) : undefined;
  }, [canvas]);

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
