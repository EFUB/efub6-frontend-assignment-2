"use client";

import Link from "next/link";
import type { Session } from "next-auth";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

type HeaderProps = { session: Session | null };

const linkClass = "font-display text-sm text-stone-500 hover:text-black";

export default function Header({ session }: HeaderProps) {
  return (
    <header className="bg-[#fbf6e4]">
      <nav className="mx-auto flex h-14 max-w-2xl items-center gap-6 px-4">
        <Link href="/" className="font-display text-xl text-black">
          게시판
        </Link>
        <Link href="/list" className={linkClass}>
          목록
        </Link>
        {session && (
          <Link href="/write" className={linkClass}>
            글쓰기
          </Link>
        )}

        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <>
              {session.user?.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt="프로필"
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="font-display text-sm text-stone-500">
                {session.user?.name}님
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/signup" className={linkClass}>
                회원가입
              </Link>
              <LoginButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
