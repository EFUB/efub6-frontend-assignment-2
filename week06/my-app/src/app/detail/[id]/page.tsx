import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Detail({ params }: Props) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();

  const db = (await connectDB).db("forum");
  const post = await db
    .collection<Post>("post")
    .findOne({ _id: new ObjectId(id) });

  if (!post) notFound();

  return (
    <article className="space-y-4 rounded-2xl border border-stone-200 bg-white px-6 py-6">
      <h1 className="text-2xl font-semibold">{post.title}</h1>
      <p className="whitespace-pre-wrap leading-7 text-stone-700">
        {post.content}
      </p>
    </article>
  );
}
