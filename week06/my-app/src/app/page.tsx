import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">메인 페이지</h1>
      <div className="flex gap-3">
        <Link
          href="/list"
          className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
        >
          글 목록
        </Link>
        <Link
          href="/write"
          className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm"
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
}
