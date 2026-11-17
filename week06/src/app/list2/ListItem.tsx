"use client";

import type { Post } from "@/models/post";
import Link from "next/link";

export default function ListItem({ result }: { result: (Post & { _id: string })[] }) {
  return (
    <div className="flex flex-col gap-3">
      {result.map((_, i) => (
        <div
          className="grid grid-cols-[1fr_auto_auto] items-center gap-x-1 rounded-xl border-2 border-[#f3e8c8] bg-white px-5 py-4 opacity-100 [transition:opacity_1s,border-color_150ms] hover:border-[#e2cd94]"
          key={i}
        >
          <Link href={"/detail/" + result[i]._id} className="min-w-0">
            <h4 className="truncate font-display text-lg text-black">
              {result[i].title}
            </h4>
          </Link>
          <Link
            href={"/edit/" + result[i]._id}
            className="row-span-2 rounded-md font-display px-2 py-1 text-sm text-stone-500 hover:text-red-500"
          >
            수정
          </Link>
          <span
            className="row-span-2 cursor-pointer rounded-md font-display px-2 py-1 text-sm text-stone-500 hover:text-red-500"
            onClick={(e) => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: result[i]._id.toString(),
              })
                .then((r) => r.json())
                .then(() => {
                  const target = e.target as HTMLElement;
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.opacity = "0";
                    setTimeout(() => {
                      parent.style.display = "none";
                    }, 1000);
                  }
                });
            }}
          >
            삭제
          </span>
          <p className="mt-1 text-xs text-stone-400">1월 1일</p>
        </div>
      ))}
    </div>
  );
}
