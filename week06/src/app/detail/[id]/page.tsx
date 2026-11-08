import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";
import NavButtons from "./NavButtons";

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
    <div>
      <article className="rounded-xl border-2 border-[#f3e8c8] bg-white p-8">
        <h1 className="font-display text-3xl text-black">{post.title}</h1>
        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-black">
          {post.content}
        </p>
      </article>
      <NavButtons />
    </div>
  );
}
