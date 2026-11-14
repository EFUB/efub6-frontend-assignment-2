import Link from "next/link";

export default function Home() {
  return (
    <div className="py-16 text-center">
      <h4 className="font-display text-4xl">메인 페이지</h4>
      <p className="mt-3 text-stone-500">Next.js 게시판 만들기 실습</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/list"
          className="rounded-lg bg-[#f3e8c8] font-display px-5 py-2.5 text-sm font-medium text-black hover:bg-[#e2cd94]"
        >
          글 목록 보기
        </Link>
        <Link
          href="/write"
          className="rounded-lg border-2 border-[#f3e8c8] bg-white font-display px-5 py-2.5 text-sm font-medium hover:bg-[#fbf6e4]"
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
}
