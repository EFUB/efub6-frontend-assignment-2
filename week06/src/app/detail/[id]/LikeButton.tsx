"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  postId: string;
  count: number;
  liked: boolean;
}

export default function LikeButton({ postId, count, liked }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onLike = async () => {
    setPending(true);
    try {
      const r = await fetch("/api/post/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      const data = await r.json();
      if (!r.ok) {
        alert(data.error ?? "좋아요에 실패했습니다.");
        return;
      }
      router.refresh();
    } catch {
      alert("좋아요 중 오류가 발생했습니다.");
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onLike}
      disabled={liked || pending}
      className={`mt-6 cursor-pointer rounded-lg border-2 px-4 py-2 font-display text-sm disabled:cursor-default ${
        liked
          ? "border-[#e2cd94] bg-[#f3e8c8] text-black"
          : "border-[#f3e8c8] bg-white hover:bg-[#fbf6e4]"
      }`}
    >
      {liked ? "♥" : "♡"} 좋아요 {count}
    </button>
  );
}
