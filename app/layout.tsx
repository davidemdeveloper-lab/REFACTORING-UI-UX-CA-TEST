import type { Metadata } from 'next';
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import StyledJsxRegistry from './registry';
import { ThemeProvider } from '@/components/theme/theme-provider';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Customer Automator • Experience Suite',
  description:
    'Pannello di controllo per la cura digitale degli ospiti: comunicazioni automatizzate, AI concierge, IoT e workflow di hospitality.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${manrope.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <StyledJsxRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
