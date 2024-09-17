import { protectServer } from '@/features/auth/utils';
import Banner from './banner';
import { ProjectsSection } from './projects-section';
import { TemplatesSection } from './templates-section';

export default async function Home() {
  await protectServer();

  return (
    <div className="flex flex-col space-y-5 md:space-y-8 xl:space-y-10 w-full max-w-screen-xl 2xl:max-w-screen-2xl mx-auto pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}
