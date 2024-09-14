'use client';

import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  SquareSplitHorizontal,
  Trash,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { BsBorderWidth } from 'react-icons/bs';
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from 'react-icons/fa6';
import { TbColorFilter } from 'react-icons/tb';
import { Editor, FONT_SIZE, FONT_WEIGHT, ToolType } from '../types';
import { getCtrlIcon, isImageType, isTextType } from '../utils';
import { FontSizeInput } from './font-size-input';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function Toolbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const selectedObject = editor?.selectedObjects[0];
  const objectType = editor?.selectedObjects[0]?.type;
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFont = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialLinethrough = editor?.getActiveLinethrough();
  const initialUnderline = editor?.getActiveUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

  const [property, setProperty] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    font: initialFont,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    linethrough: initialLinethrough,
    underline: initialUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });

  const isText = isTextType(objectType);
  const isImage = isImageType(objectType);

  const toggleBold = () => {
    if (!selectedObject) return;
    const newFontWeight = property.fontWeight >= 700 ? 400 : 700;

    editor?.changeFontWeight(newFontWeight);
    setProperty((prev) => ({ ...prev, fontWeight: newFontWeight }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;
    const newFontStyle = property.fontStyle === 'italic' ? 'normal' : 'italic';

    editor?.changeFontStyle(newFontStyle);
    setProperty((prev) => ({ ...prev, fontStyle: newFontStyle }));
  };

  const toggleLinethrough = () => {
    if (!selectedObject) return;
    const newValue = !property.linethrough;

    editor?.changeLinethrough(newValue);
    setProperty((prev) => ({ ...prev, linethrough: newValue }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) return;
    const newValue = !property.underline;

    editor?.changeUnderline(newValue);
    setProperty((prev) => ({ ...prev, underline: newValue }));
  };

  const onChangeTextAlign = (textAlign: string) => {
    if (!selectedObject) return;

    editor?.changeTextAlign(textAlign);
    setProperty((prev) => ({ ...prev, textAlign }));
  };

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) {
      return;
    }

    editor?.changeFontSize(value);
    setProperty((current) => ({
      ...current,
      fontSize: value,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedObject) return;
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        editor?.delete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-14 border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-14 border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="h-full flex items-center space-x-1 justify-center">
        {!isImage && (
          <Hint label="color" side="bottom">
            <Button
              onClick={() => onChangeActiveTool('fill')}
              size="icon"
              variant="ghost"
              className={cn(activeTool === 'fill' && 'bg-gray-100')}
            >
              <div
                className="rounded-sm size-4 border"
                style={{ backgroundColor: property.fillColor }}
              />
            </Button>
          </Hint>
        )}
        {isText && (
          <>
            <Hint label="font" side="bottom">
              <Button
                onClick={() => onChangeActiveTool('font')}
                variant="ghost"
                className={cn(
                  'w-28 p-2 flex items-center justify-between',
                  activeTool === 'font' && 'bg-gray-100'
                )}
              >
                <div className="w-28 truncate text-left text-sm">
                  {property.font}
                </div>
                <ChevronDown className="size-4 shrink-0 ml-2" />
              </Button>
            </Hint>
            <Hint label="bold" side="bottom">
              <Button
                onClick={toggleBold}
                variant="ghost"
                className={cn(property.fontWeight >= 700 && 'bg-gray-100')}
              >
                <FaBold className="size-3" />
              </Button>
            </Hint>
            <Hint label="italic" side="bottom">
              <Button
                onClick={toggleItalic}
                variant="ghost"
                className={cn(property.fontStyle === 'italic' && 'bg-gray-100')}
              >
                <FaItalic className="size-3" />
              </Button>
            </Hint>
            <Hint label="strike-through" side="bottom">
              <Button
                onClick={toggleLinethrough}
                variant="ghost"
                className={cn(property.linethrough && 'bg-gray-100')}
              >
                <FaStrikethrough className="size-3" />
              </Button>
            </Hint>
            <Hint label="underline" side="bottom">
              <Button
                onClick={toggleUnderline}
                variant="ghost"
                className={cn(property.underline && 'bg-gray-100')}
              >
                <FaUnderline className="size-3" />
              </Button>
            </Hint>
            <Hint label="align left" side="bottom">
              <Button
                onClick={() => onChangeTextAlign('left')}
                variant="ghost"
                className={cn(property.textAlign === 'left' && 'bg-gray-100')}
              >
                <FaAlignLeft className="size-3" />
              </Button>
            </Hint>
            <Hint label="align center" side="bottom">
              <Button
                onClick={() => onChangeTextAlign('center')}
                variant="ghost"
                className={cn(property.textAlign === 'center' && 'bg-gray-100')}
              >
                <FaAlignCenter className="size-3" />
              </Button>
            </Hint>
            <Hint label="align right" side="bottom">
              <Button
                onClick={() => onChangeTextAlign('right')}
                variant="ghost"
                className={cn(property.textAlign === 'right' && 'bg-gray-100')}
              >
                <FaAlignRight className="size-3" />
              </Button>
            </Hint>
            <FontSizeInput
              value={property.fontSize}
              onChange={onChangeFontSize}
            />
          </>
        )}
        {!isText && (
          <>
            <Hint label="border color" side="bottom">
              <Button
                onClick={() => onChangeActiveTool('stroke-color')}
                size="icon"
                variant="ghost"
                className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{ borderColor: property.strokeColor }}
                />
              </Button>
            </Hint>
            <Hint label="border width" side="bottom">
              <Button
                onClick={() => onChangeActiveTool('stroke-width')}
                size="icon"
                variant="ghost"
                className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
              >
                <BsBorderWidth className="size-4" />
              </Button>
            </Hint>
          </>
        )}
        {isImage && (
          <>
            <Hint label="filters" side="bottom">
              <Button
                onClick={() => onChangeActiveTool('filter')}
                size="icon"
                variant="ghost"
                className={cn(activeTool === 'filter' && 'bg-gray-100')}
              >
                <TbColorFilter className="size-4" />
              </Button>
            </Hint>
            <Hint label="remove background" side="bottom">
              <Button
                onClick={() => onChangeActiveTool('remove-bg')}
                size="icon"
                variant="ghost"
                className={cn(activeTool === 'remove-bg' && 'bg-gray-100')}
              >
                <SquareSplitHorizontal className="size-4" />
              </Button>
            </Hint>
          </>
        )}
        <Hint label="forward" side="bottom">
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
        <Hint label="backwards" side="bottom">
          <Button
            onClick={() => editor?.sendBackwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
        <Hint label="duplicate" side="bottom">
          <Button
            onClick={() => {
              editor?.onCopy();
              editor?.onPaste();
            }}
            size="icon"
            variant="ghost"
          >
            <Copy className="size-4" />
          </Button>
        </Hint>
        <Hint label="delete" side="bottom" shortcut={`${getCtrlIcon()} + d`}>
          <Button onClick={() => editor?.delete()} size="icon" variant="ghost">
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
}
