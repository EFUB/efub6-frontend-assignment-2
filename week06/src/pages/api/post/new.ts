import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/utils/database";
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

  const { title, content } = req.body as Partial<Post>;
  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ error: "제목과 내용을 모두 입력해주세요." });
  }

  const post: Post = {
    title,
    content,
    author: session.user.email,
    authorName: session.user.name ?? "익명",
  };

  try {
    const db = (await connectDB).db("forum");
    await db.collection<Post>("post").insertOne(post);
    return res.redirect(302, "/list");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
