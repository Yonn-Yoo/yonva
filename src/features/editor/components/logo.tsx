import { cn } from '@/lib/utils';
import { Satisfy } from 'next/font/google';
import Link from 'next/link';

const font = Satisfy({
  weight: ['400'],
  subsets: ['latin'],
});

export default function Logo() {
  return (
    <Link href="/">
      <h1
        className={cn(
          font.className,
          'text-3xl font-bold bg-gradient-to-r from-[#2891ff] to-[#302ECB] text-transparent bg-clip-text hover:opacity-75 transition'
        )}
      >
        Yonva
      </h1>
    </Link>
  );
}
