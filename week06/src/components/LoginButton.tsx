"use client";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  const onLogin = (): void => {
    signIn("github");
  };

  return (
    <button
      type="button"
      onClick={onLogin}
      className="font-display text-sm text-stone-500 hover:text-black"
    >
      로그인
    </button>
  );
}
