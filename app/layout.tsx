import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import StyledJsxRegistry from './registry';
import { ThemeProvider } from '@/components/theme/theme-provider';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Customer Automator • Experience Design Suite',
  description:
    'Dashboard front-end per orchestrare comunicazioni, automazioni e cura digitale dell’ospite in un’unica interfaccia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full">
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable} antialiased h-full`}>
        <StyledJsxRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
