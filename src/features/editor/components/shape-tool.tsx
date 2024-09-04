import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';
import { Editor } from '../types';

type Props = {
  editor: Editor | undefined;
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
};

export default function ShapeTool({
  editor,
  onClick,
  icon: Icon,
  iconClassName,
}: Props) {
  return (
    <button onClick={onClick} className="aspect-square border rounded-md p-5">
      <Icon
        style={{ color: editor?.fillColor }}
        className={cn('w-full h-full', iconClassName)}
      />
    </button>
  );
}
