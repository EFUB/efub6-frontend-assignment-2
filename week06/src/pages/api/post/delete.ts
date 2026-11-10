import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE");
    return res.status(405).json({ error: "DELETE 요청만 가능합니다." });
  }
  const id = req.body;
  if (typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "올바른 게시글 ID가 아닙니다." });
  }
  try {
    const db = (await connectDB).db("forum");
    const result = await db.collection<Post>("post").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
    return res.status(200).json({ message: "삭제 완료" });
  } catch {
    return res.status(500).json({ error: "글 삭제 중 서버 오류가 발생했습니다." });
  }
}
