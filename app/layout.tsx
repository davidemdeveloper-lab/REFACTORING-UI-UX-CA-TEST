import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import StyledJsxRegistry from './registry';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Customer Automator',
  description:
    'Suite front-end per hotel che automatizza clienti, prenotazioni e comunicazioni in chiave metal-glassy.',
  applicationName: 'Customer Automator',
  authors: [{ name: 'Customer Automator' }],
  keywords: ['hotel', 'automazione', 'prenotazioni', 'customer success'],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen">
        <StyledJsxRegistry>
          <GluestackUIProvider mode="dark">
            <div className="min-h-screen w-full">
              {children}
            </div>
          </GluestackUIProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
