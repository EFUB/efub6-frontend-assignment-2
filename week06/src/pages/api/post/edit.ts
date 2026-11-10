import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST 요청만 가능합니다." });
  }
  const { _id, title, content } = req.body ?? {};
  if (typeof _id !== "string" || !ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "올바른 게시글 ID가 아닙니다." });
  }
  if (typeof title !== "string" || typeof content !== "string" || !title.trim() || !content.trim()) {
    return res.status(400).json({ error: "제목과 내용을 모두 입력해주세요." });
  }
  try {
    const db = (await connectDB).db("forum");
    const result = await db.collection<Post>("post").updateOne(
      { _id: new ObjectId(_id) },
      { $set: { title: title.trim(), content: content.trim() } },
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
    return res.redirect(302, "/list");
  } catch {
    return res.status(500).json({ error: "글 수정 중 서버 오류가 발생했습니다." });
  }
}
