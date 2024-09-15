import AvatarButton from '@/features/auth/components/\bavatar';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center p-4 h-[68px]">
      <div className="ml-auto">
        <AvatarButton />
      </div>
    </nav>
  );
}
