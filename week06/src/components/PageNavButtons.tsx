"use client";
import { useRouter } from "next/navigation";

const buttonClass =
  "cursor-pointer rounded-lg font-display border-2 border-[#f3e8c8] bg-white px-4 py-2 text-sm hover:bg-[#fbf6e4]";

export default function PageNavButtons({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button type="button" className={buttonClass} onClick={() => router.back()}>
        뒤로
      </button>
      <button type="button" className={buttonClass} onClick={() => router.push("/list")}>
        목록으로
      </button>
      <button type="button" className={buttonClass} onClick={() => router.refresh()}>
        새로고침
      </button>
      {children && <div className="ml-auto">{children}</div>}
    </div>
  );
}
