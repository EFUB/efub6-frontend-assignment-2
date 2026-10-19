import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const font = Noto_Sans_KR({ variable: "--font-noto", subsets: ["latin"], display: "swap" });
export const metadata: Metadata = {
  title: { default: "같이 공부해요", template: "%s | 같이 공부해요" },
  description: "학교에서 같이 공부할 사람을 찾는 스터디 목록입니다.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={font.variable}>
      <body>
        <a className="skip-link" href="#main">본문으로 바로가기</a>
        <header><div className="container header-inner">
          <Link className="site-title" href="/">같이 공부해요</Link>
          <nav aria-label="주 메뉴"><Link href="/studies">스터디 찾기</Link><Link href="/studies/guide">참여 안내</Link></nav>
        </div></header>
        <main id="main">{children}</main>
        <footer><div className="container">EFUB 4주차 Next.js 과제</div></footer>
      </body>
    </html>
  );
}
