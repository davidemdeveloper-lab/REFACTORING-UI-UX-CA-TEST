import type { Metadata } from 'next';
import { Inter, Playfair_Display, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import StyledJsxRegistry from './registry';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { metalGlassyConfig } from '@/theme/config';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const sourceCode = Source_Code_Pro({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Customer Automator',
  description:
    'Suite per hotel che unisce automazione clienti, prenotazioni e comunicazioni in un hub metal-glassy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${sourceCode.variable}`}>
        <StyledJsxRegistry>
          <GluestackUIProvider config={metalGlassyConfig}>{children}</GluestackUIProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
