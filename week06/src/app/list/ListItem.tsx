"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ListItem({ post }: { post: { _id: string; title: string } }) {
  const router = useRouter();
  const inFlight = useRef(false);
  const [pending, setPending] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [error, setError] = useState("");

  async function deletePost() {
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/post/delete", {
        method: "DELETE",
        headers: { "Content-Type": "text/plain" },
        body: post._id,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "삭제하지 못했습니다.");
      setDeleted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "삭제하지 못했습니다. 다시 시도해주세요.");
      setPending(false);
      inFlight.current = false;
    }
  }

  if (hidden) return null;

  return (
    <li className={`list-item${deleted ? " list-item-deleted" : ""}`}
      onAnimationEnd={(event) => {
        if (deleted && event.target === event.currentTarget) {
          setHidden(true);
          router.refresh();
        }
      }}>
      <Link href={`/detail/${post._id}`}><h4>{post.title}</h4></Link>
      <Link href={`/edit/${post._id}`} aria-label={`${post.title} 수정`}>✏️ 수정</Link>{" "}
      <button type="button" disabled={pending} onClick={deletePost} aria-label={`${post.title} 삭제`}>
        {pending ? "삭제 중…" : "🗑️ 삭제"}
      </button>
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
