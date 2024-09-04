'use client';

import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Editor, ToolType } from '../types';

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
  const fillColor = editor?.fillColor;

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
      </div>
    </div>
  );
}
