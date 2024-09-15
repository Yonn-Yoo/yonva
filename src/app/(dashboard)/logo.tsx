import { Satisfy } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const font = Satisfy({
  weight: ['400'],
  subsets: ['latin'],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-1.5 hover:opacity-75 transition h-[68px] px-4 overflow-visible">
        <div className="size-8 relative">
          <Image src="/logo.svg" alt="Image AI" fill />
        </div>
        <h1
          className={cn(
            font.className,
            'text-[28px] font-bold bg-gradient-to-r from-[#007AFE] to-[#302ECB] text-transparent bg-clip-text'
          )}
        >
          Yonva
        </h1>
      </div>
    </Link>
  );
};
