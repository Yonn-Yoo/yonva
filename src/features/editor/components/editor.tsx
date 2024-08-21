'use client';

import useEditor from '../hooks/use-editor';

export default function Editor() {
  const { init } = useEditor();

  return (
    <div>
      <span>editor component</span>
    </div>
  );
}
