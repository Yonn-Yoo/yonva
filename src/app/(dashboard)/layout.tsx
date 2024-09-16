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
      {/* <Sidebar /> */}
      <div
        // lg:pl-64 2xl:pl-[300px]
        className="flex flex-col h-full"
      >
        <Navbar />
        <main className="flex-1 overflow-auto p-6 max-w-screen-xl 2xl:max-w-screen-2xl w-full mx-auto lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
