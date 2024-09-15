// import { Navbar } from './navbar';
// import { Sidebar } from './sidebar';
import { ReactNode } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="bg-muted h-full">
      <Sidebar />
      <div className="lg:pl-[300px] flex flex-col h-full">
        <Navbar />
        <main className="bg-white flex-1 overflow-auto p-5 md:p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
