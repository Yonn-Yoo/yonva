'use client';

import { Button } from '@/components/ui/button';
import Editor from '@/features/editor/components/editor';
import { useGetProject } from '@/features/projects/api/use-get-project';
import { Loader, TriangleAlert } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: {
    projectId: string;
  };
}

export default function EditorPage({ params }: Props) {
  const { data, isLoading, isError } = useGetProject(params.projectId);

  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-3 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Failed to fetch project</p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="h-full flex flex-col space-y-2 items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
        <span className="text-muted-foreground text-sm">
          Loading Projects...
        </span>
      </div>
    );
  }

  return <Editor initialData={data} />;
}
