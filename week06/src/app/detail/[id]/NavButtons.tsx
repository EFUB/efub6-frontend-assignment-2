"use client";
import { useRouter } from "next/navigation";

const buttonClass =
  "cursor-pointer rounded-lg font-display border-2 border-[#f3e8c8] bg-white px-4 py-2 text-sm hover:bg-[#fbf6e4]";

export default function NavButtons() {
  const router = useRouter();
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button className={buttonClass} onClick={() => router.back()}>
        뒤로
      </button>
      <button className={buttonClass} onClick={() => router.forward()}>
        앞으로
      </button>
      <button className={buttonClass} onClick={() => router.push("/list")}>
        목록으로
      </button>
      <button className={buttonClass} onClick={() => router.refresh()}>
        새로고침
      </button>
      <button
        className="ml-auto cursor-pointer font-display rounded-lg bg-[#f3e8c8] px-4 py-2 text-sm font-medium text-black hover:bg-[#e2cd94]"
        onMouseEnter={() => router.prefetch("/write")}
        onClick={() => router.push("/write")}
      >
        글쓰기
      </button>
    </div>
  );
}
