import { ChevronsLeft } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export default function ToolSidebarClose({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group absolute -right-7 bottom-1/2 h-16 bg-white transform translate-y-1/2 flex justify-center items-center rounded-r-lg pl-1 pr-2 border-y border-r"
    >
      <ChevronsLeft className="size-4 text-black group-hover:opacity-75 transition" />
    </button>
  );
}
