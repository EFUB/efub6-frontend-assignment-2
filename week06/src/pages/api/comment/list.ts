import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectDB } from "@/utils/database";
import type { Comment, CommentItem } from "@/models/comment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "GET 요청만 가능합니다." });
  }

  const { postId } = req.query;
  if (typeof postId !== "string" || !ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "잘못된 게시물 id입니다." });
  }

  try {
    const db = (await connectDB).db("forum");
    const comments = await db
      .collection<Comment>("comment")
      .find({ postId: new ObjectId(postId) })
      .sort({ createdAt: 1 })
      .toArray();

    const result: CommentItem[] = comments.map((comment) => ({
      _id: comment._id.toString(),
      content: comment.content,
      authorName: comment.authorName,
      createdAt: comment.createdAt.toISOString(),
    }));
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
