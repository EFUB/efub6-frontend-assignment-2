"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const onLogout = (): void => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      className="font-display text-sm text-stone-500 hover:text-black"
    >
      로그아웃
    </button>
  );
}
