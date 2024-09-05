import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Editor, STROKE_DASH_ARRAY, STROKE_WIDTH, ToolType } from '../types';
import ToolSidebarClose from './tool-sidebar-close';
import ToolSidebarHeader from './tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function StrokeWidthSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onClose = () => onChangeActiveTool('select');
  const onChangeStrokeWidth = (value: number) =>
    editor?.changeStrokeWidth(value);
  const onChangeStrokeType = (value: number[]) =>
    editor?.changeStrokeDashArray(value);

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-80 h-full flex flex-col duration-300 ease-in-out',
        activeTool === 'stroke-width' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="Stroke options"
        description="Modify the stroke of your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">stroke width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(value) => onChangeStrokeWidth(value[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">stroke type</Label>
          <Button
            onClick={() => onChangeStrokeType([])}
            variant="secondary"
            size="lg"
            className={cn(
              'w-full h-10 justify-start text-left py-2 px-4',
              JSON.stringify(typeValue) === '[]' && 'ring-2 ring-blue-500'
            )}
          >
            <div className="w-full border-black rounded-full border-2" />
          </Button>
          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant="secondary"
            size="lg"
            className={cn(
              'w-full h-10 justify-start text-left py-2 px-4',
              JSON.stringify(typeValue) === '[5,5]' && 'ring-2 ring-blue-500'
            )}
          >
            <div className="w-full border-black rounded-full border-2 border-dashed" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
