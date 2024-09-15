import { protectServer } from '@/features/auth/utils';
import Editor from '@/features/editor/components/editor';

export default async function EditorPage() {
  await protectServer();

  return <Editor />;
}
