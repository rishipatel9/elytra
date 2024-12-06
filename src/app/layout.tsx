import type { Metadata } from 'next';
 import './globals.css';
import { Manrope } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/providers/providers';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elytra',
  description: 'AI career guidance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} `}>
      <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
