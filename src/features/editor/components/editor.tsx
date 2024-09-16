'use client';

import { ResponseType } from '@/features/projects/api/use-get-project';
import { useUpdateProject } from '@/features/projects/api/use-update-project';
import { fabric } from 'fabric';
import debounce from 'lodash.debounce';
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
import TemplateSidebar from './template-sidebar';
import TextSidebar from './text-sidebar';
import Toolbar from './toolbar';

type Props = {
  initialData: ResponseType['data'];
};

export default function Editor({ initialData }: Props) {
  const { mutate } = useUpdateProject(initialData.id);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((values: { json: string; height: number; width: number }) => {
      mutate(values);
    }, 3000),
    [mutate]
  );
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTool, setActiveTool] = useState<ToolType>('select');

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool('select');
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    defaultState: initialData.json,
    defaultWidth: initialData.width,
    defaultHeight: initialData.height,
    clearSelectionCallback: onClearSelection,
    saveCallback: debouncedSave,
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
        id={initialData.id}
        editor={editor}
        onChangeActiveTool={onChangeActiveTool}
        activeTool={activeTool}
      />
      <div className="absolute top-[68px] h-[calc(100%-68px)] w-full flex">
        <Sidebar
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <TemplateSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
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
