'use client';

import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { BsBorderWidth } from 'react-icons/bs';
import { RxTransparencyGrid } from 'react-icons/rx';
import { Editor, ToolType } from '../types';
import { isTextType } from '../utils';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function Toolbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();
  const objectType = editor?.selectedObjects[0]?.type;
  const isText = isTextType(objectType);

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-14 border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-14 border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="h-full flex items-center justify-center">
        <Hint label="color" side="bottom">
          <Button
            onClick={() => onChangeActiveTool('fill')}
            size="icon"
            variant="ghost"
            className={cn(activeTool === 'fill' && 'bg-gray-100')}
          >
            <div
              className="rounded-sm size-4 border"
              style={{ backgroundColor: fillColor }}
            />
          </Button>
        </Hint>
        {!isText && (
          <>
            <Hint label="border color" side="bottom">
              <Button
                onClick={() => onChangeActiveTool('stroke-color')}
                size="icon"
                variant="ghost"
                className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{ borderColor: strokeColor }}
                />
              </Button>
            </Hint>
            <Hint label="border width" side="bottom">
              <Button
                onClick={() => onChangeActiveTool('stroke-width')}
                size="icon"
                variant="ghost"
                className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
              >
                <BsBorderWidth className="size-4" />
              </Button>
            </Hint>
          </>
        )}
        <Hint label="forward" side="bottom">
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-5" />
          </Button>
        </Hint>
        <Hint label="backwards" side="bottom">
          <Button
            onClick={() => editor?.sendBackwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-5" />
          </Button>
        </Hint>
        <Hint label="opacity" side="bottom">
          <Button
            onClick={() => onChangeActiveTool('opacity')}
            size="icon"
            variant="ghost"
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
}
