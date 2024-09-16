import AvatarButton from '@/features/auth/components/\bavatar';
import { CircleHelp } from 'lucide-react';
import { Logo } from './logo';
import SidebarItem from './sidebar-item';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-4 h-[68px]">
      <Logo />
      <div className="flex items-center space-x-2 ml-auto">
        <SidebarItem
          href="mailto:ysyoo719@gmail.com"
          icon={CircleHelp}
          label="Get Help"
        />
        <AvatarButton />
      </div>
    </nav>
  );
}
