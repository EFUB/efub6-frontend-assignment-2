import type { Metadata } from "next";
import Link from "next/link";
import { Gowun_Dodum, Jua } from "next/font/google";
import "./globals.css";

const gowunDodum = Gowun_Dodum({
  weight: "400",
  variable: "--font-gowun-dodum",
  subsets: ["latin"],
});

const jua = Jua({
  weight: "400",
  variable: "--font-jua",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "게시판",
  description: "Next.js + MongoDB 게시판",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${gowunDodum.variable} ${jua.variable}`}>
      <body className="min-h-screen bg-white font-sans text-black antialiased">
        <header className="bg-[#fbf6e4]">
          <nav className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
            <Link href="/" className="font-display text-xl text-black">
              게시판
            </Link>
            <Link
              href="/signup"
              className="font-display text-sm text-stone-500 hover:text-black"
            >
              회원가입
            </Link>
          </nav>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
