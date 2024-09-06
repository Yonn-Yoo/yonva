import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';
import { FILL_COLOR } from '../types';

type Props = {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
};

export default function ShapeTool({
  onClick,
  icon: Icon,
  iconClassName,
}: Props) {
  return (
    <button onClick={onClick} className="aspect-square border rounded-md p-5">
      <Icon
        style={{ color: FILL_COLOR }}
        className={cn('w-full h-full', iconClassName)}
      />
    </button>
  );
}
