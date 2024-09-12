import { ScrollArea } from '@/components/ui/scroll-area';
import { UploadButton } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Editor, ToolType } from '../types';
import ToolSidebarClose from './tool-sidebar-close';
import ToolSidebarHeader from './tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ToolType;
  onChangeActiveTool: (tool: ToolType) => void;
};

export default function ImageSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  // const { data, isLoading, isError } = useGetImages();
  const onClose = () => onChangeActiveTool('select');
  const [tmp, setTmp] = useState([]);

  useEffect(() => {
    fetch('/data/images.json')
      .then((res) => res.json())
      .then(setTmp);
  }, []);

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-80 h-full flex flex-col duration-300 ease-in-out',
        activeTool === 'images' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="Image"
        description="Add images to your canvas"
      />
      <div className="p-4 border-b">
        <UploadButton
          appearance={{
            button: 'w-full text-sm font-medium',
            allowedContent: 'hidden',
          }}
          content={{
            button: 'Upload Image',
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => editor?.addImage(res[0].url)}
        />
      </div>
      {/* {isLoading && (
        <div className="flex justify-center items-center flex-1">
          <Loader className="size-7 text-slate-600 animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col justify-center items-center space-y-4 flex-1">
          <AlertTriangle className="size-7 text-[#ffcc00]" />
          <p className="text-xs text-muted-foreground">
            Sorry, failed to load images 🥲
          </p>
        </div>
      )} */}

      <ScrollArea>
        <ul className="p-2 grid grid-cols-2 gap-2">
          {tmp &&
            tmp?.map((image: any) => (
              <li
                onClick={() => editor?.addImage(image.urls.regular)}
                key={image.id}
                className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border cursor-pointer"
              >
                <Image
                  fill
                  src={image.urls.small}
                  alt={image.alt_description || 'Image'}
                  className="object-cover"
                />
                <Link
                  target="_blank"
                  href={image.links.html}
                  className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left"
                >
                  {image.user.name}
                </Link>
              </li>
            ))}
        </ul>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
