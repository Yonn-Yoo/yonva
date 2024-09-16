import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function SidebarItem({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
}: Props) {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          'flex items-center px-3 py-3 rounded-xl bg-transparent hover:bg-white transition group',
          isActive && 'bg-white'
        )}
      >
        <Icon className="size-4 mr-2 stroke-2 text-slate-500 group-hover:text-black group-hover:scale-120 group-hover:animate-shake transition" />
        <span className="text-sm font-medium text-slate-500 group-hover:text-black transition">
          {label}
        </span>
      </div>
    </Link>
  );
}
