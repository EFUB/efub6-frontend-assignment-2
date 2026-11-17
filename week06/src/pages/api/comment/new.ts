import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/utils/database";
import type { Comment } from "@/models/comment";
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

  const { postId, content } = req.body as { postId?: string; content?: string };
  if (!postId || !ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "잘못된 게시물 id입니다." });
  }
  if (!content?.trim()) {
    return res.status(400).json({ error: "댓글 내용을 입력해주세요." });
  }

  try {
    const db = (await connectDB).db("forum");
    const _id = new ObjectId(postId);
    const post = await db.collection<Post>("post").findOne({ _id });
    if (!post) {
      return res.status(404).json({ error: "존재하지 않는 글입니다." });
    }

    await db.collection<Comment>("comment").insertOne({
      postId: _id,
      content: content.trim(),
      author: session.user.email,
      authorName: session.user.name ?? "익명",
      createdAt: new Date(),
    });
    return res.status(201).json({ message: "댓글이 등록되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
