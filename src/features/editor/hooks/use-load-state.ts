import { JSON_KEYS } from '@/features/editor/types';
import { fabric } from 'fabric';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';

type Props = {
  autoZoom: () => void;
  canvas: fabric.Canvas | null;
  initialState: MutableRefObject<string | undefined>;
  canvasHistory: MutableRefObject<string[]>;
  setHistoryIndex: Dispatch<SetStateAction<number>>;
};

export const useLoadState = ({
  canvas,
  autoZoom,
  initialState,
  canvasHistory,
  setHistoryIndex,
}: Props) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && initialState?.current && canvas) {
      const data = JSON.parse(initialState.current);

      canvas.loadFromJSON(data, () => {
        const currentState = JSON.stringify(canvas.toJSON(JSON_KEYS));

        canvasHistory.current = [currentState];
        setHistoryIndex(0);
        autoZoom();
      });
      initialized.current = true;
    }
  }, [canvas, autoZoom]);
};
