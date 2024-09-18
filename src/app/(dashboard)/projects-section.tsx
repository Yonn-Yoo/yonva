'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteProject } from '@/features/projects/api/use-delete-project';
import { useDuplicateProject } from '@/features/projects/api/use-duplicate-project';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useConfirm } from '@/hooks/use-confirm';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertTriangle,
  CopyIcon,
  Loader,
  MoreHorizontal,
  Presentation,
  Search,
  Trash,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const ProjectsSection = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete the project.'
  );
  const duplicateMutation = useDuplicateProject();
  const removeMutation = useDeleteProject();
  const router = useRouter();
  const session = useSession();

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };
  const onDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) removeMutation.mutate({ id });
  };

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();
  const name = session.data?.user?.name!;

  if (status === 'pending') {
    return (
      <div className="space-y-4">
        <h3 className="text-[#262E3C] font-extrabold text-lg">{`${name}'s recent projects`}</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="space-y-4">
        <h3 className="text-[#262E3C] font-extrabold text-lg">{`${name}'s recent projects`}</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <AlertTriangle className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Failed to load projects
          </p>
        </div>
      </div>
    );
  }

  if (!data.pages.length || !data.pages[0].data.length) {
    return (
      <div className="space-y-4">
        <h3 className="text-[#262E3C] font-extrabold text-lg">{`${name}'s recent projects`}</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No projects found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ConfirmDialog />
      <h3 className="text-[#262E3C] font-extrabold text-lg">{`${name}'s recent projects`}</h3>
      <section className="w-full !text-[#262E3C] border-separate">
        {data.pages.map((group, idx) => (
          <div className="w-full flex flex-col space-y-3.5" key={idx}>
            {group.data.map((project) => (
              <div
                className="w-full flex justify-between items-center bg-slate-50 py-4 px-6 rounded-lg duration-300 hover:!shadow-gray-200 hover:shadow-md hover:scale-[101%] group"
                key={project.id}
              >
                <div
                  onClick={() => router.push(`/editor/${project.id}`)}
                  className="w-full md:w-[30%] h-10 font-medium flex items-center space-x-3 cursor-pointer"
                >
                  <Presentation className="size-5" />
                  <span className="w-fit line-clamp-1 relative">
                    {project.name}
                    <div className="w-0 group-hover:w-full h-px bg-black/40 rounded-lg duration-500 ease-in-out" />
                  </span>
                </div>
                <div className="hidden md:table-cell md:w-[18%]">
                  {project.width} x {project.height} px
                </div>
                <div className="hidden md:table-cell md:w-[18%]">
                  {formatDistanceToNow(project.updatedAt, {
                    addSuffix: true,
                  })}
                </div>
                <div className="flex items-center justify-end">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button disabled={false} size="icon" variant="ghost">
                        <MoreHorizontal className="size-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-60">
                      <DropdownMenuItem
                        className="h-10 cursor-pointer"
                        disabled={duplicateMutation.isPending}
                        onClick={() => onCopy(project.id)}
                      >
                        <CopyIcon className="size-4 mr-2" />
                        Make a copy
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="h-10 cursor-pointer"
                        disabled={removeMutation.isPending}
                        onClick={() => onDelete(project.id)}
                      >
                        <Trash className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};
