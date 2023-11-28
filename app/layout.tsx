import { Instrument_Sans } from 'next/font/google';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={instrumentSans.className}>
      <body className='bg-background text-foreground'>
        <main className='min-h-screen flex flex-col items-center'>
          {children}
        </main>
      </body>
    </html>
  );
}
