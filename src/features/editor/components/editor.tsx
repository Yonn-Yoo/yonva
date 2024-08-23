'use client';

import { useEffect, useRef } from 'react';
import useEditor from '../hooks/use-editor';

export default function Editor() {
  const { init } = useEditor();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    init({
      initialCanvas: '',
      initialContainer: containerRef.current!,
    });
  }, [init]);

  return (
    <div className="bg-orange-300" ref={containerRef}>
      <canvas className="bg-rose-100" ref={canvasRef} />
    </div>
  );
}
