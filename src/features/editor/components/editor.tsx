'use client';

import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';
import useEditor from '../hooks/use-editor';

export default function Editor() {
  const { init } = useEditor();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });
    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 h-full bg-muted" ref={containerRef}>
        <canvas className="h-full" ref={canvasRef} />
      </div>
    </div>
  );
}
