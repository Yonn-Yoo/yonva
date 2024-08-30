'use client';

import {
  ImageIcon,
  LayoutTemplate,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from 'lucide-react';
import { LucidIconType, ToolType } from '../types';
import SidebarItem from './sidebar-item';

const sidebarItems: {
  icon: LucidIconType;
  label: string;
  toolName: ToolType;
}[] = [
  {
    icon: LayoutTemplate,
    label: 'Design',
    toolName: 'templates',
  },
  {
    icon: ImageIcon,
    label: 'Image',
    toolName: 'images',
  },
  {
    icon: Type,
    label: 'Text',
    toolName: 'text',
  },
  {
    icon: Shapes,
    label: 'Shapes',
    toolName: 'shapes',
  },
  {
    icon: Pencil,
    label: 'Draw',
    toolName: 'draw',
  },
  {
    icon: Sparkles,
    label: 'AI',
    toolName: 'ai',
  },
  {
    icon: Settings,
    label: 'Settings',
    toolName: 'settings',
  },
];

type Props = {
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function Sidebar({ activeTool, onChangeActiveTool }: Props) {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        {sidebarItems.map(({ icon, label, toolName }) => (
          <SidebarItem
            key={toolName}
            icon={icon}
            label={label}
            isActive={activeTool === toolName}
            onClick={() => onChangeActiveTool(toolName)}
          />
        ))}
      </ul>
    </aside>
  );
}
