// import { Navbar } from './navbar';
// import { Sidebar } from './sidebar';
import { ReactNode } from 'react';
import Navbar from './navbar';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="bg-muted h-full">
      <div className="flex flex-col h-full">
        <Navbar />
        <main className="flex-1 overflow-auto p-6 pt-12 w-full mx-auto lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
