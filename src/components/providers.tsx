'use client';

import { ReactNode } from 'react';
import { QueryProvider } from './query-provider';

type props = {
  children: ReactNode;
};

export default function Providers({ children }: props) {
  return <QueryProvider>{children}</QueryProvider>;
}
