import Link from "next/link";

export default function StudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container studies-shell">
      <nav className="sub-nav" aria-label="스터디 메뉴"><Link href="/studies">모든 스터디</Link><Link href="/studies/guide">참여 안내</Link></nav>
      {children}
    </div>
  );
}
