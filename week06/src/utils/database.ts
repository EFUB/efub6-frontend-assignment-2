import { setServers } from "node:dns/promises";
import { MongoClient } from "mongodb";

// 로컬 DNS가 Atlas SRV 조회를 거부하는 환경에서만 사용합니다.
if (process.env.MONGODB_DNS_SERVERS) {
  setServers(process.env.MONGODB_DNS_SERVERS.split(",").map((server) => server.trim()));
}

const url = process.env.MONGODB_URI;
if (!url) throw new Error(".env.local에 MONGODB_URI를 설정해주세요.");

// 개발 중 파일이 다시 실행되어도 연결을 재사용합니다.
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

export { connectDB };
