import type { ObjectId } from "mongodb";

export interface Like {
  postId: ObjectId;
  userEmail: string;
}
