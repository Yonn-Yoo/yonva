import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { Editor, ToolType } from '../types';
import ToolSidebarClose from './tool-sidebar-close';
import ToolSidebarHeader from './tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function OpacitySidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const initialValue = editor?.getActiveOpactiy() || 1;
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );
  const [opacity, setOpacity] = useState(initialValue);

  const onClose = () => onChangeActiveTool('select');
  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject?.get('opacity') || 1);
    }
  }, [selectedObject]);

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-80 h-full flex flex-col duration-300 ease-in-out',
        activeTool === 'opacity' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Change the opacity of your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Slider
            min={0}
            step={0.01}
            max={1}
            value={[opacity]}
            onValueChange={(value) => onChange(value[0])}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
