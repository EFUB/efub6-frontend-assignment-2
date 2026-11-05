import Link from "next/link";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";

export const dynamic = "force-dynamic";

export default async function List() {
  const db = (await connectDB).db("forum");
  const posts = await db.collection<Post>("post").find().toArray();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">글 목록</h1>
      {posts.length === 0 ? (
        <p className="text-stone-500">아직 글이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post._id.toString()}>
              <Link
                href={`/detail/${post._id}`}
                className="block rounded-2xl border border-stone-200 bg-white px-5 py-4 hover:border-stone-400"
              >
                <h2 className="text-lg font-medium">{post.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
