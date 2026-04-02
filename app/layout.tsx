import type { Metadata } from 'next';
import { Source_Sans_3 as FontSans } from 'next/font/google';
import './globals.css';

const fontSans = FontSans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Somaire - AI-Powered PDF Summarization Tool',
  description:
    'Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our AI-powered PDF summarization tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${fontSans.variable}  antialiased`}>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
