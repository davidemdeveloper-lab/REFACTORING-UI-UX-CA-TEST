import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';

export const metadata: Metadata = {
  title: 'Customer Automator',
  description: 'Suite metal-glassy per la gestione clienti, prenotazioni e automazioni hotel.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
