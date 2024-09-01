import { fabric } from 'fabric';
import { useEffect } from 'react';

type Props = {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
};

export default function useCanvasEvents({ canvas, setSelectedObjects }: Props) {
  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', (e) => {
        console.log('created');
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:updated', (e) => {
        console.log('updated');
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:cleared', () => {
        console.log('cleared');
        setSelectedObjects([]);
      });
    }

    return () => {
      if (canvas) {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas]);
}
