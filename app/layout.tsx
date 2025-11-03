import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import StyledJsxRegistry from './registry';
import { AppProviders } from '@/providers/app-providers';

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
    'Customer Automator – dashboard per coccolare i clienti con automazioni e assistenza intelligente.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ flex: 1 }}
      >
        <StyledJsxRegistry>
          <AppProviders>
            <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-neutral-900)]">
              {children}
            </div>
          </AppProviders>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
