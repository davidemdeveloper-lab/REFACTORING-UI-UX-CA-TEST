import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import StyledJsxRegistry from './registry';
import { ThemeProvider } from '@/components/providers/theme-provider';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Customer Automator – Suite Frontend',
  description:
    'Esperienza di interfaccia completa per la gestione delle automazioni alberghiere, prenotazioni e comunicazioni multi-canale.',
  metadataBase: new URL('https://customer-automator.local'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable} antialiased`}>
        <StyledJsxRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
