import { MongoClient } from "mongodb";
import type { Post } from "@/models/post";

const url = process.env.MONGODB_URI;
if (!url) throw new Error(".env.local에 MONGODB_URI를 설정해주세요.");
declare global {
  var _mongo: Promise<MongoClient> | undefined;
}
let connectDB: Promise<MongoClient>;
if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

const postCollection = async () => {
  const client = await connectDB;
  return client.db("forum").collection<Post>("post");
};

export { connectDB, postCollection };
