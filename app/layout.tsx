import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import StyledJsxRegistry from './registry';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Customer Automator',
  description:
    'Suite front-end per automatizzare la comunicazione tra albergatori e ospiti con design metal-glassy.',
  applicationName: 'Customer Automator',
  keywords: [
    'hotel',
    'automation',
    'dashboard',
    'communication',
    'gluestack ui',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent`}
        style={{ flex: 1 }}
      >
        <StyledJsxRegistry>
          <GluestackUIProvider mode="light">
            <div className="min-h-screen w-full overflow-hidden text-typography-900">
              {children}
            </div>
          </GluestackUIProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
