import { auth } from '@/auth';
import Providers from '@/components/providers';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yonva',
  description: 'Visualize your ideas with Image AI',
  openGraph: {
    title: 'Yonva',
    description: 'Visualize your ideas with Image AI',
    siteName: 'Yonva',
    images:
      'https://utfs.io/f/kFQ1JGCocHa9CHu2T5L3TnQEoHwNIbeiYD97v6U3OZmg1AKj',
    url: 'https://yonva.vercel.app',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html className="h-screen flex flex-col" lang="en">
        <body className={`${inter.className} grow`}>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
