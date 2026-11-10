"use client";

import { useRouter } from "next/navigation";

export default function NavButtons() {
  const router = useRouter();
  return (
    <div>
      <button type="button" onClick={() => router.back()}>← 뒤로</button>
      <button type="button" onClick={() => router.forward()}>앞으로 →</button>
      <button type="button" onClick={() => router.push("/list")}>목록으로</button>
      <button type="button" onClick={() => router.refresh()}>새로고침</button>
      <button type="button" onMouseEnter={() => router.prefetch("/write")}
        onFocus={() => router.prefetch("/write")}
        onClick={() => router.push("/write")}>
        글쓰기
      </button>
    </div>
  );
}
