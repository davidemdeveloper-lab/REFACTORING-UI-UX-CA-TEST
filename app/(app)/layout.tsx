'use client';

import { AppShell } from '@/components/app/app-shell';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}

// Validazione: layout annidato garantisce shell consistente per tutte le viste protette.
