import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";
import type { Like } from "@/models/like";
import NavButtons from "./NavButtons";
import LikeButton from "./LikeButton";
import Comment from "./Comment";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Detail({ params }: Props) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db("forum");
  const postId = new ObjectId(id);
  const post = await db.collection<Post>("post").findOne({ _id: postId });
  if (!post) notFound();

  const likes = db.collection<Like>("like");
  const likeCount = await likes.countDocuments({ postId });
  const liked = session?.user?.email
    ? !!(await likes.findOne({ postId, userEmail: session.user.email }))
    : false;

  return (
    <div>
      <article className="rounded-xl border-2 border-[#f3e8c8] bg-white p-8">
        <h1 className="font-display text-3xl text-black">{post.title}</h1>
        <p className="mt-2 text-sm text-stone-500">
          작성자: {post.authorName}
        </p>
        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-black">
          {post.content}
        </p>
        <LikeButton postId={id} count={likeCount} liked={liked} />
      </article>
      <NavButtons />
      <Comment postId={id} isLoggedIn={!!session} />
    </div>
  );
}
