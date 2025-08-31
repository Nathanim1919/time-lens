import type { Metadata } from 'next';
import './globals.css';
import Navigation from '../components/layout/Navigation';

export const metadata: Metadata = {
  title: 'TimeLens - AI-Powered Era & Future Self Generator',
  description: 'Transform your selfie into AI-generated versions across different historical eras, future scenarios, and creative styles. Experience history and imagination like never before.',
  keywords: 'AI, image generation, selfie, transformation, medieval, cyberpunk, anime, vintage, futuristic',
  authors: [{ name: 'TimeLens Team' }],
  openGraph: {
    title: 'TimeLens - AI-Powered Era & Future Self Generator',
    description: 'Transform your selfie into AI-generated versions across different historical eras, future scenarios, and creative styles.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TimeLens - AI-Powered Era & Future Self Generator',
    description: 'Transform your selfie into AI-generated versions across different historical eras, future scenarios, and creative styles.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}