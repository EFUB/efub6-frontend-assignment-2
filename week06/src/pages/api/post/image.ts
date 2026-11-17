import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }
  const { file, type } = req.query;
  if (typeof file !== "string" || typeof type !== "string") {
    return res.status(400).json({ error: "파일 정보가 필요합니다." });
  }
  if (!type.startsWith("image/")) {
    return res.status(400).json({ error: "이미지만 올릴 수 있습니다." });
  }
  const ext = file.split(".").pop();
  const key = `images/${crypto.randomUUID()}.${ext}`;

  const { url, fields } = await createPresignedPost(s3, {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key,
    Fields: { "Content-Type": type },
    Expires: 60,
    Conditions: [["content-length-range", 0, 5 * 1024 * 1024]],
  });
  return res.status(200).json({ url, fields });
}
