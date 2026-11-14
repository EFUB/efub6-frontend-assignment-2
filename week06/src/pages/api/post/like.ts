import type { NextApiRequest, NextApiResponse } from "next";
import { MongoServerError, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/utils/database";
import type { Like } from "@/models/like";
import type { Post } from "@/models/post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 요청만 가능합니다." });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  const { postId } = req.body as { postId?: string };
  if (!postId || !ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "잘못된 게시물 id입니다." });
  }

  try {
    const db = (await connectDB).db("forum");
    const _id = new ObjectId(postId);
    const post = await db.collection<Post>("post").findOne({ _id });
    if (!post) {
      return res.status(404).json({ error: "존재하지 않는 글입니다." });
    }

    const likes = db.collection<Like>("like");
    await likes.createIndex({ postId: 1, userEmail: 1 }, { unique: true });
    await likes.insertOne({ postId: _id, userEmail: session.user.email });

    const count = await likes.countDocuments({ postId: _id });
    return res.status(200).json({ count });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return res.status(409).json({ error: "이미 좋아요를 누른 글입니다." });
    }
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
