import { ReactNode } from 'react';
import { AppShell } from '@/components/layout/AppShell';

export default function AppShellLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
