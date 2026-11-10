import Link from "next/link";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

export default async function List() {
  const db = (await connectDB).db("forum");
  const posts = await db.collection<Post>("post").find().toArray();

  return (
    <div>
      <h1>글 목록</h1>
      <Link href="/write">글쓰기</Link>
      {posts.length === 0 && <p>아직 게시글이 없습니다. 첫 글을 작성해 보세요.</p>}
      <ul className="list-bg">
      {posts.map((post) => (
        <ListItem key={post._id.toString()} post={{ _id: post._id.toString(), title: post.title }} />
      ))}
      </ul>
    </div>
  );
}
