import React, { useState } from 'react';
import api from '@/config/api.config';
import { Post, Comment } from '@/components/types/post';


const useFetchUserPosts = (userId: string) => {
  const [error, setError] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    setLoading(true);
    setError(''); // Reset error message on each call

    try {
      // Fetch all posts by the user
      const postsResponse = await fetch(api.post.getUserPosts(userId));

      if (!postsResponse.ok) {
        throw new Error('Failed to fetch posts');
      }

      const postsData: Post[] = await postsResponse.json();

      // if comments are not included with the posts data, you could fetch them separately for each post.
      const postsWithComments = await Promise.all(
        postsData.map(async (post) => {
          // Fetch comments for the current post
          const commentsResponse = await fetch(api.comment.getCommentsForPost(post.id));
          const commentsData: Comment[] = await commentsResponse.json();

          // Attach comments to the post
          return { ...post, comments: commentsData };
        })
      );

      setPosts(postsWithComments);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchPosts when the hook is initialized (e.g., when the userId changes)
  React.useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  return { posts, error, loading };
};

export default useFetchUserPosts;
