import { fabric } from 'fabric';
import { useEvent } from 'react-use';

type Props = {
  canvas: fabric.Canvas | null;
  undo: () => void;
  redo: () => void;
  copy: () => void;
  paste: () => void;
  save: (skip?: boolean) => void;
};

export const useShortcuts = ({
  canvas,
  undo,
  redo,
  save,
  copy,
  paste,
}: Props) => {
  useEvent('keydown', (e) => {
    const isCtrlKey = e.ctrlKey || e.metaKey;
    const isShiftKey = e.shiftKey;
    const isBackspace = e.key === 'Backspace';
    const isInput = ['INPUT', 'TEXTAREA'].includes(
      (e.target as HTMLElement).tagName
    );

    if (isInput) return;

    if (isBackspace) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isCtrlKey && e.key === 'd') {
      e.preventDefault();
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isCtrlKey && e.key === 'z') {
      e.preventDefault();
      undo();
    }

    if (isCtrlKey && isShiftKey && e.key === 'z') {
      e.preventDefault();
      redo();
    }

    if (isCtrlKey && e.key === 'c') {
      e.preventDefault();
      copy();
    }

    if (isCtrlKey && e.key === 'v') {
      e.preventDefault();
      paste();
    }

    if (isCtrlKey && e.key === 's') {
      e.preventDefault();
      save(true);
    }

    if (isCtrlKey && e.key === 'a') {
      e.preventDefault();
      canvas?.discardActiveObject();

      const allObjects = canvas
        ?.getObjects()
        .filter((object) => object.selectable);

      canvas?.setActiveObject(
        new fabric.ActiveSelection(allObjects, { canvas })
      );
      canvas?.renderAll();
    }
  });
};
