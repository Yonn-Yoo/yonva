import { fabric } from 'fabric';
import { useEffect } from 'react';

type Props = {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
};

export default function useCanvasEvents({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: Props) {
  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:updated', (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:cleared', () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }

    return () => {
      if (canvas) {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas, clearSelectionCallback]);
}