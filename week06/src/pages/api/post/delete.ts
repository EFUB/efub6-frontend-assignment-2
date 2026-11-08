import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectDB } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "DELETE 요청만 가능합니다." });
  }
  const id = req.body;
  if (typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "잘못된 게시물 id입니다." });
  }
  try {
    const db = (await connectDB).db("forum");
    await db.collection("post").deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json("삭제완료");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
