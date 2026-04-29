import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'Game Artist | Slot Specialist',
  description: 'Creating immersive slot game visuals & engaging player experiences.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" 
    data-scroll-behavior="smooth"
    className={`${inter.variable} ${spaceGrotesk.variable} dark`}
    >
      <body className="flex min-h-screen flex-col font-sans" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
