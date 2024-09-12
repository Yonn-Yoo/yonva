import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Editor, ToolType } from '../types';
import ToolSidebarClose from './tool-sidebar-close';
import ToolSidebarHeader from './tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function AiSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const onClose = () => onChangeActiveTool('select');

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-80 h-full flex flex-col duration-300 ease-in-out',
        activeTool === 'ai' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="AI"
        description="Generate an image using AI engine"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <span>hoi</span>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
