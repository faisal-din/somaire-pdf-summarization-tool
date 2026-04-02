import type { Metadata } from 'next';
import { Source_Sans_3 as FontSans, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang='en' className={cn("antialiased", "font-sans", geist.variable)}>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
