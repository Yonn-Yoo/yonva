import { cn } from '@/lib/utils';
import { Satisfy } from 'next/font/google';
import Link from 'next/link';

const font = Satisfy({
  weight: ['400'],
  subsets: ['latin'],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center hover:opacity-75 transition h-[68px] overflow-visible">
        <h1
          className={cn(
            font.className,
            'text-3xl 2xl:text-4xl font-bold bg-gradient-to-r from-[#2891ff] to-[#302ECB] text-transparent bg-clip-text'
          )}
        >
          Yonva
        </h1>
      </div>
    </Link>
  );
};
