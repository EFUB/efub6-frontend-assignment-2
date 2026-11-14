import type { ObjectId } from "mongodb";

export interface Comment {
  postId: ObjectId;
  content: string;
  author: string;
  authorName: string;
  createdAt: Date;
}

export interface CommentItem {
  _id: string;
  content: string;
  authorName: string;
  createdAt: string;
}
