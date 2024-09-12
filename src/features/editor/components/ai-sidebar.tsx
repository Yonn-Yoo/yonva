import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useGenerateImage } from '@/features/ai/api/use-generate-image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Editor, ToolType } from '../types';
import ToolSidebarClose from './tool-sidebar-close';
import ToolSidebarHeader from './tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function AiSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const [prompt, setPrompt] = useState('');
  const mutation = useGenerateImage();

  const onClose = () => onChangeActiveTool('select');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (shouldBlock) {
    //   triggerPaywall();
    //   return;
    // }

    mutation.mutate(
      { prompt },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-80 h-full flex flex-col duration-300 ease-in-out',
        activeTool === 'ai' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="AI"
        description="Generate an image using AI engine"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <form className="flex flex-col space-y-6" onSubmit={onSubmit}>
            <Textarea
              disabled={mutation.isPending}
              placeholder="Adorable girl playing in the playground."
              cols={25}
              rows={10}
              required
              minLength={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              type="submit"
              disabled={!prompt || mutation.isPending}
              className="w-full"
            >
              Generate
            </Button>
          </form>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
