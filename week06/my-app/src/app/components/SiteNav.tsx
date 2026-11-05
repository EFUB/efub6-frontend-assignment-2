"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/", label: "홈" },
  { href: "/list", label: "목록" },
  { href: "/write", label: "글쓰기" },
  { href: "/register", label: "회원가입" },
];

export default function SiteNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-2xl flex-col gap-3 px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            게시판
          </Link>
          <nav className="flex gap-4 text-sm">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname?.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    active ? "font-semibold text-stone-900" : "text-stone-500"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-stone-300 px-3 py-1 text-sm"
          >
            뒤로
          </button>
          <button
            type="button"
            onClick={() => router.forward()}
            className="rounded-full border border-stone-300 px-3 py-1 text-sm"
          >
            앞으로
          </button>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="rounded-full border border-stone-300 px-3 py-1 text-sm"
          >
            새로고침
          </button>
        </div>
      </div>
    </header>
  );
}
