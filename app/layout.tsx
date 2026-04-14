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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),

  title: {
    default: 'Sommaire - AI PDF Summarizer',
    template: '%s | Sommaire',
  },

  description:
    'Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with Sommaire, your AI-powered PDF summarization tool.',

  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    title: 'Sommaire - AI PDF Summarizer',
    description:
      'Turn long PDFs into short, clear summaries using AI in seconds.',
    url: '/',
    siteName: 'Sommaire',
    type: 'website',
    locale: 'en_US',

    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Sommaire AI PDF Summarizer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sommaire - AI PDF Summarizer',
    description:
      'Turn long PDFs into short, clear summaries using AI in seconds.',
    images: ['/opengraph-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
