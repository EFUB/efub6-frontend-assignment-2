import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import type { User } from "@/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 요청만 가능합니다." });
  }

  const { username: id, password } = req.body as Partial<User>;
  if (!id || !password) {
    return res.redirect(302, "/signup?error=empty");
  }
  if (!/^[A-Za-z0-9]{1,10}$/.test(id)) {
    return res.redirect(302, "/signup?error=invalid");
  }

  try {
    const db = (await connectDB).db("forum");
    const users = db.collection<User>("user");
    const exists = await users.findOne({ username: id });
    if (exists) {
      return res.redirect(302, "/signup?error=duplicate");
    }
    await users.insertOne({ username: id, password });
    return res.redirect(302, "/signup?success=1");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
