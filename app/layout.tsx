import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import StyledJsxRegistry from './registry';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Customer Automator',
  description:
    'Pannello intelligente per hotel che automatizza clienti, prenotazioni e comunicazioni.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${jakarta.variable} ${spaceGrotesk.variable} antialiased`}> 
        <StyledJsxRegistry>
          <GluestackUIProvider mode="light">
            <div className="min-h-screen text-typography-0">
              {children}
            </div>
          </GluestackUIProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
