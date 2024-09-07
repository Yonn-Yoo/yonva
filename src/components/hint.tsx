import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  shortcut?: string;
}

export default function Hint({
  label,
  children,
  side = 'top',
  align,
  sideOffset = 5,
  alignOffset = 5,
  shortcut,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={10}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="flex flex-col items-center space-y-1 text-white bg-slate-800 border-slate-800"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className="capitalize text-sm">{label}</p>
          {shortcut && (
            <span className="text-slate-400 text-xs">{shortcut}</span>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
