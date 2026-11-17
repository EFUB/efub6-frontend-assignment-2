import Link from "next/link";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";
import ListItem from "./ListItem";

export const revalidate = 20;

export default async function List2() {
  const db = (await connectDB).db("forum");
  const posts = await db.collection<Post>("post").find().toArray();
  const result = posts.map((post) => ({ ...post, _id: post._id.toString() }));

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <h1 className="font-display text-3xl">글 목록</h1>
        <Link
          href="/write"
          className="rounded-lg bg-[#f3e8c8] font-display px-4 py-2 text-sm font-medium text-black hover:bg-[#e2cd94]"
        >
          글쓰기
        </Link>
      </div>
      {result.length === 0 ? (
        <p className="rounded-xl border-2 border-dashed border-[#f3e8c8] py-16 text-center text-sm text-stone-400">
          아직 작성된 글이 없어요.
        </p>
      ) : (
        <ListItem result={result} />
      )}
    </div>
  );
}
