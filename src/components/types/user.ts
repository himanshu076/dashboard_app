// src/components/types/user.ts

import { Post } from "./post";

export interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  status: string;
  profile_image?: string;
  password?: string;
  posts: Post[] | [];
  connections: [];
}