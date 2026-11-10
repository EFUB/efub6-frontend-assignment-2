import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";
import NavButtons from "./NavButtons";

export const dynamic = "force-dynamic";

export default async function Detail({ params }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();

  const db = (await connectDB).db("forum");
  const post = await db.collection<Post>("post").findOne({ _id: new ObjectId(id) });
  if (!post) notFound();

  return (
    <div>
      <h1>{post.title}</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
      <NavButtons />
    </div>
  );
}
