import { connectDB } from "@/utils/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_KEY as string,
  adapter: MongoDBAdapter(connectDB),
  callbacks: {
    session({ session, user }) {
      session.user.role = user?.role === "admin" ? "admin" : "normal";
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const db = (await connectDB).db();
      await db
        .collection("users")
        .updateOne({ _id: new ObjectId(user.id) }, { $set: { role: "normal" } });
    },
  },
};

export default NextAuth(authOptions);
