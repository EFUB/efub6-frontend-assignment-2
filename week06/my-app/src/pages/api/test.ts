import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "안녕하세요 👋" });
  }

  return res.status(405).json({ error: "허용되지 않은 요청입니다." });
}
