import type { Session } from "next-auth";
import type { Post } from "@/models/post";

export function canModify(session: Session | null, post: Post) {
  if (!session?.user?.email) return false;
  if (session.user.role === "admin") return true;
  return !!post.author && post.author === session.user.email;
}
