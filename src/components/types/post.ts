// src/components/types/post.ts
export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  createdAt: string; // ISO 8601 string
  comments: Comment[];
}