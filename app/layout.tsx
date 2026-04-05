import type { Metadata } from 'next';
import { Source_Sans_3 as FontSans } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Sommaire - AI-Powered PDF Summarization Tool',
  description:
    'Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our AI-powered PDF summarization tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className='relative min-h-screen flex flex-col '>
            <Header />
            <main className='flex-1'>
              {children}
              <Toaster />
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
