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
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from 'lucide-react';
import { BsCloudCheck } from 'react-icons/bs';
import { CiFileOn } from 'react-icons/ci';
import Logo from './logo';

export default function Navbar() {
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
              onClick={() => {}} //TODO: add function for opening file
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <CiFileOn className="size-8" />
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
            onClick={() => {}}
            className="" //TODO: add dynamic class
          >
            <MousePointerClick className="size-5" />
          </Button>
        </Hint>
        <Hint label="undo" side="bottom">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="" //TODO: add dynamic class
          >
            <Undo2 className="size-5" />
          </Button>
        </Hint>
        <Hint label="redo" side="bottom">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="" //TODO: add dynamic class
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
                onClick={() => {}}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
