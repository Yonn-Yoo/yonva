import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Editor, FILL_COLOR, ToolType } from '../types';
import ColorPicker from './color-picker';
import ToolSidebarClose from './tool-sidebar-close';
import ToolSidebarHeader from './tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function StrokeColorSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const value = editor?.getActiveFillColor() || FILL_COLOR;
  const onClose = () => onChangeActiveTool('select');
  const onChange = (value: string) => editor?.changeStrokeColor(value);

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-80 h-full flex flex-col duration-300 ease-in-out',
        activeTool === 'stroke-color' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="Stroke color"
        description="Fill stroke color to your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker onChange={onChange} value={value} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
