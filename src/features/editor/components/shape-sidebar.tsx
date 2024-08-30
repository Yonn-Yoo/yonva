import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { ToolType } from '../types';

type Props = {
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function ShapeSidebar({
  activeTool,
  onChangeActiveTool,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const shapeSidebarRef = useRef<HTMLElement | null>(null);

  return (
    <aside
      ref={shapeSidebarRef}
      onAnimationStart={() => console.log('hi')}
      onTransitionEnd={() => setIsOpen(false)}
      className={cn(
        'bg-white relative border-r z-40 w-full h-full flex flex-col duration-300 ease-in-out',
        isOpen ? 'max-w-[360px]' : 'max-w-0'
      )}
    >
      <ul className="shrink-0">
        <li>shape tools</li>
      </ul>
    </aside>
  );
}
