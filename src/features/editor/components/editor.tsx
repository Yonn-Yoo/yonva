'use client';

import { fabric } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';
import useEditor from '../hooks/use-editor';
import { ToolType, selectionDependentTools } from '../types';
import AiSidebar from './\bai-sidebar';
import RemoveBgSidebar from './\bremove-bg-sidebar';
import DrawSidebar from './draw-sidebar';
import FillColorSidebar from './fill-color-sidebar';
import FilterSidebar from './filter-sidebar';
import FontSidebar from './font-sidebar';
import Footer from './footer';
import ImageSidebar from './image-sidebar';
import Navbar from './navbar';
import OpacitySidebar from './opacity-sidebar';
import SettingsSidebar from './settings-sidebar';
import ShapeSidebar from './shape-sidebar';
import Sidebar from './sidebar';
import StrokeColorSidebar from './stroke-color-sidebar';
import StrokeWidthSidebar from './stroke-width-sidebar';
import TextSidebar from './text-sidebar';
import Toolbar from './toolbar';

export default function Editor() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTool, setActiveTool] = useState<ToolType>('select');

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool('select');
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  const onChangeActiveTool = useCallback(
    (tool: ToolType) => {
      if (tool === 'draw') {
        editor?.enableDrawingMode();
      }

      if (activeTool === 'draw') {
        editor?.disableDrawingMode();
      }

      if (tool === activeTool) {
        return setActiveTool('select');
      }

      setActiveTool(tool);
    },
    [activeTool, editor]
  );

  return (
    <div className="h-full flex flex-col">
      <Navbar
        editor={editor}
        onChangeActiveTool={onChangeActiveTool}
        activeTool={activeTool}
      />
      <div className="absolute top-[68px] h-[calc(100%-68px)] w-full flex">
        <Sidebar
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <ShapeSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <FillColorSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <StrokeColorSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <OpacitySidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <TextSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <FontSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <ImageSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <FilterSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <AiSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <RemoveBgSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <DrawSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <SettingsSidebar
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas?.getActiveObject())}
          />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer editor={editor} />
        </main>
      </div>
    </div>
  );
}
