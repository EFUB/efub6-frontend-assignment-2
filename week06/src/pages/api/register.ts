
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../utils/database";
import { randomBytes, scryptSync } from "node:crypto";
import { MongoServerError } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST 요청만 가능합니다." });
  }

  const { username, password } = req.body ?? {};

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    password.length < 4
  ) {
    return res.status(400).json({
      error: "아이디와 4자 이상의 비밀번호를 입력해주세요.",
    });
  }

  try {
    const db = (await connectDB).db("forum");
    const users = db.collection("users");
    const id = username.trim();
    // 동시에 같은 아이디로 요청해도 DB에서 중복 저장을 차단합니다.
    await users.createIndex({ username: 1 }, { unique: true });

    // 중복 아이디 확인
    const existingUser = await users.findOne({ username: id });

    if (existingUser) {
      return res.status(409).json({
        error: "이미 존재하는 아이디입니다.",
      });
    }

    // 비밀번호 해시 처리
    const salt = randomBytes(16).toString("hex");
    const passwordHash = scryptSync(password, salt, 64).toString("hex");

    // DB에 회원 정보 저장
    await users.insertOne({
      username: id,
      passwordHash: `${salt}:${passwordHash}`,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "회원가입이 완료되었습니다.",
    });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return res.status(409).json({ error: "이미 존재하는 아이디입니다." });
    }
    return res.status(500).json({
      error: "서버 오류가 발생했습니다.",
    });
  }
}
