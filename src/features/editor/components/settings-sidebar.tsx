import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Editor, ToolType } from '../types';
import ColorPicker from './color-picker';
import ToolSidebarClose from './tool-sidebar-close';
import ToolSidebarHeader from './tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function SettingsSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const workspace = editor?.getWorkSpace();

  const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace]);
  const initialBackground = useMemo(
    () => workspace?.fill ?? '#ffffff',
    [workspace]
  );

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialWidth, initialHeight, initialBackground]);

  const changeBackground = (value: string) => {
    setBackground(value);
    editor?.changeBackground(value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editor?.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  const onClose = () => onChangeActiveTool('select');

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-80 h-full flex flex-col duration-300 ease-in-out',
        activeTool === 'settings' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Modify the settings of your workspace"
      />
      <ScrollArea>
        <form className="space-y-4 p-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Width"
              value={width}
              type="number"
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Height"
              value={height}
              type="number"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker value={String(background)} onChange={changeBackground} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
