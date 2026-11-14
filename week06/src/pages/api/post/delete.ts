import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/utils/database";
import { canModify } from "@/utils/auth";
import type { Post } from "@/models/post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "DELETE 요청만 가능합니다." });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  const id = req.body;
  if (typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "잘못된 게시물 id입니다." });
  }

  try {
    const db = (await connectDB).db("forum");
    const postId = new ObjectId(id);
    const post = await db.collection<Post>("post").findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ error: "존재하지 않는 글입니다." });
    }
    if (!canModify(session, post)) {
      return res
        .status(403)
        .json({ error: "본인이 작성한 글만 삭제할 수 있습니다." });
    }

    await db.collection<Post>("post").deleteOne({ _id: postId });
    await db.collection("like").deleteMany({ postId });
    await db.collection("comment").deleteMany({ postId });
    return res.status(200).json({ message: "삭제완료" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
