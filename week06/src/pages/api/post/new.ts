import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import type { Post } from "@/models/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST 요청만 가능합니다." });
  }

  // 타입 단언만으로는 실제 요청값을 검증할 수 없으므로 문자열인지도 확인합니다.
  const { title, content } = req.body ?? {};
  if (typeof title !== "string" || typeof content !== "string" ||
      !title.trim() || !content.trim()) {
    return res.status(400).json({ error: "제목과 내용을 모두 입력해주세요." });
  }

  try {
    const db = (await connectDB).db("forum");
    await db.collection<Post>("post").insertOne({ title: title.trim(), content: content.trim() });
    return res.redirect(302, "/list");
  } catch {
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
