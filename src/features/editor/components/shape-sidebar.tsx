import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa';
import { FaDiamond } from 'react-icons/fa6';
import { IoTriangle } from 'react-icons/io5';
import { ToolType } from '../types';
import ShapeTool from './shape-tool';
import ToolSidebarClose from './tool-sidebar-close';
import ToolSidebarHeader from './tool-sidebar-header';

type Props = {
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function ShapeSidebar({
  activeTool,
  onChangeActiveTool,
}: Props) {
  const onClose = () => onChangeActiveTool('select');

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-80 h-full flex flex-col duration-300 ease-in-out',
        activeTool === 'shapes' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool onClick={() => {}} icon={FaCircle} />
          <ShapeTool onClick={() => {}} icon={FaSquare} />
          <ShapeTool onClick={() => {}} icon={FaSquareFull} />
          <ShapeTool onClick={() => {}} icon={IoTriangle} />
          <ShapeTool
            onClick={() => {}}
            icon={IoTriangle}
            iconClassName="rotate-180"
          />
          <ShapeTool onClick={() => {}} icon={FaDiamond} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
