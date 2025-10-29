import { Metadata } from 'next';
import {
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from 'next/font/google';
import './globals.css';
import StyledJsxRegistry from './registry';
import { ThemeProvider } from '@/components/theme/theme-provider';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Customer Automator — Esperienza Ospitale Potenziata',
  description:
    'Pannello operativo per automatizzare la comunicazione, la relazione e i servizi prima, durante e dopo il soggiorno.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${plusJakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="font-[var(--font-plus-jakarta-sans)]">
        <StyledJsxRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
