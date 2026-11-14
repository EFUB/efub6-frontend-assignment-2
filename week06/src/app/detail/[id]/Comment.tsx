"use client";

import { useEffect, useState } from "react";
import type { CommentItem } from "@/models/comment";

interface Props {
  postId: string;
  isLoggedIn: boolean;
}

async function fetchComments(postId: string): Promise<CommentItem[] | null> {
  try {
    const r = await fetch(`/api/comment/list?postId=${postId}`);
    const data = await r.json();
    if (!r.ok) {
      alert(data.error ?? "댓글을 불러오지 못했습니다.");
      return null;
    }
    return data;
  } catch {
    alert("댓글을 불러오는 중 오류가 발생했습니다.");
    return null;
  }
}

export default function Comment({ postId, isLoggedIn }: Props) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetchComments(postId).then((data) => {
      if (data) setComments(data);
    });
  }, [postId]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPending(true);
    try {
      const r = await fetch("/api/comment/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content }),
      });
      const data = await r.json();
      if (!r.ok) {
        alert(data.error ?? "댓글 등록에 실패했습니다.");
        return;
      }
      setContent("");
      const updated = await fetchComments(postId);
      if (updated) setComments(updated);
    } catch {
      alert("댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-xl">댓글 {comments.length}</h2>

      {comments.length === 0 ? (
        <p className="rounded-xl border-2 border-dashed border-[#f3e8c8] py-8 text-center text-sm text-stone-400">
          아직 댓글이 없어요.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="rounded-xl border-2 border-[#f3e8c8] bg-white px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm">{comment.authorName}</span>
                <span className="text-xs text-stone-400">
                  {new Date(comment.createdAt).toLocaleString("ko-KR")}
                </span>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-sm">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}

      {isLoggedIn ? (
        <form onSubmit={onSubmit} className="mt-4 flex gap-2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 rounded-lg border-2 border-[#f3e8c8] bg-white px-3 py-2 text-sm outline-none placeholder:text-stone-400 focus:border-[#e2cd94]"
          />
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded-lg bg-[#f3e8c8] px-4 py-2 font-display text-sm text-black hover:bg-[#e2cd94] disabled:opacity-50"
          >
            등록
          </button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-stone-500">
          로그인 후 댓글을 작성할 수 있습니다.
        </p>
      )}
    </section>
  );
}
