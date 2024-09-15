'use client';

import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import AvatarButton from '@/features/auth/components/\bavatar';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from 'lucide-react';
import {
  BsCloudCheck,
  BsFiletypeJpg,
  BsFiletypeJson,
  BsFiletypePng,
  BsFiletypeSvg,
} from 'react-icons/bs';
import { useFilePicker } from 'use-file-picker';
import { Editor, ToolType } from '../types';
import { getCtrlIcon } from '../utils';
import Logo from './logo';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function Navbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const { openFilePicker } = useFilePicker({
    accept: '.json',
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => editor?.loadJson(reader.result as string);
      }
    },
  });

  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              onClick={openFilePicker}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <BsFiletypeJson className="size-7" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="select" side="bottom">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool('select')}
            className={cn(activeTool === 'select' && 'bg-gray-100')}
          >
            <MousePointerClick className="size-5" />
          </Button>
        </Hint>
        <Hint label="undo" side="bottom" shortcut={`${getCtrlIcon()} + z`}>
          <Button
            disabled={!editor?.canUndo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.undo()}
          >
            <Undo2 className="size-5" />
          </Button>
        </Hint>
        <Hint
          label="redo"
          side="bottom"
          shortcut={`${getCtrlIcon()} + shift + z`}
        >
          <Button
            disabled={!editor?.canRedo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.redo()}
          >
            <Redo2 className="size-5" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-6 text-muted-foreground" />
          <span className="block text-xs text-muted-foreground">Saved</span>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <Download className="size-4 ml-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                onClick={() => editor?.saveJson()}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <BsFiletypeJson className="size-7" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.savePNG()}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <BsFiletypePng className="size-7" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.saveJPG()}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <BsFiletypeJpg className="size-7" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.saveSVG()}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <BsFiletypeSvg className="size-7" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AvatarButton />
        </div>
      </div>
    </nav>
  );
}
