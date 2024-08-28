import { fabric } from 'fabric';
import { useCallback, useState } from 'react';
import { UseEditorInitArgType } from '../types';
import { useAutoResize } from './use-auto-resize';

export default function useEditor() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({
    canvas,
    container,
  });

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

      const testBox = new fabric.Rect({
        width: 100,
        height: 100,
        name: 'test',
        fill: 'skyblue',
      });

      const testText = new fabric.Text('hello world', {
        fontWeight: 500,
        fontSize: 16,
      });

      initialCanvas.add(testBox);
      initialCanvas.centerObject(testBox);
      initialCanvas.add(testText);
      initialCanvas.centerObject(testText);
    },
    []
  );

  return { init };
}
