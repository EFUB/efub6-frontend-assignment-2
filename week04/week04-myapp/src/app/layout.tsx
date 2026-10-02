import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'] });

export const metadata = {
  title: 'My Portfolio',
  description: 'Next.js App Router Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="header">
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <main className="main">{children}</main>

        <footer className={`footer ${firaCode.className}`}>
          © 2026 Na-young's Portfolio. All rights reserved.
        </footer>
      </body>
    </html>
  );
}