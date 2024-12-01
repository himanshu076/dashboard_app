import { useState } from 'react';
import api from '@/config/api.config';

const useCreatePost = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const createPost = async (userId: string, content: string) => {
    setLoading(true);
    setError(''); // Reset error on each call
    setSuccess(false);

    try {
      // Send the new post data to the API (via POST request)
      const response = await fetch(api.post.createPost, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          content,
          createdAt: new Date().toISOString(), // Timestamp for the post creation
          comments: [], // Initialize comments as empty
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'Error creating post');
      }
    } catch (error) {
      setError('Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  return { createPost, error, success, loading };
};

export default useCreatePost;
