import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import type { Member } from "@/models/member";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 요청만 가능합니다." });
  }

  const { id, password } = req.body as Partial<Member>;
  const userId = id?.trim();
  const userPassword = password?.trim();

  if (!userId || !userPassword) {
    return res.redirect(302, "/register?error=empty");
  }

  try {
    const db = (await connectDB).db("forum");
    const users = db.collection<Member>("user");
    const existing = await users.findOne({ id: userId });

    if (existing) {
      return res.redirect(302, "/register?error=duplicate");
    }

    await users.insertOne({ id: userId, password: userPassword });
    return res.redirect(302, "/register?success=1");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
