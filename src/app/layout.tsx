import Header from '@/components/organisms/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '핀치',
  description: '예적금 비교하기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="bg-white flex justify-center">
          <div className=" max-w-[770px] w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
