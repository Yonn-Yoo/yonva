import { Button } from '@/components/ui/button';
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

export default function TextSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const onClose = () => onChangeActiveTool('select');

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-80 h-full flex flex-col duration-300 ease-in-out',
        activeTool === 'text' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Text" description="Add text to your canvas" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button className="w-full" onClick={() => editor?.addText('textbox')}>
            Textbox
          </Button>
          <Button
            className="w-full h-14"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText('Heading', {
                fontSize: 80,
                fontWeight: 700,
              })
            }
          >
            <span className="text-2xl font-bold">Heading</span>
          </Button>
          <Button
            className="w-full h-12"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText('Subheading', {
                fontSize: 44,
                fontWeight: 600,
              })
            }
          >
            <span className="text-xl font-semibold">Subheading</span>
          </Button>
          <Button
            className="w-full h-10"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText('Paragraph', {
                fontSize: 32,
              })
            }
          >
            Paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
