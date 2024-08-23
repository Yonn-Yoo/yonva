import { useCallback } from 'react';
import { UseEditorInitArgType } from '../types';

export default function useEditor() {
  const init = useCallback(
    ({ initialCanvas, initialContainer }: UseEditorInitArgType) => {
      console.log('initializing editor...');
    },
    []
  );

  return { init };
}
