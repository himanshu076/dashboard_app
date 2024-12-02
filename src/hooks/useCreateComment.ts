import { useState } from 'react';
import api from '@/config/api.config';

const useCreateComment = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const createComment = async (postId: string, userId: string, content: string) => {
    setLoading(true);
    setError(''); // Reset error on each call
    setSuccess(false);

    try {
      // Send the new comment to the API (via POST request)
      const response = await fetch(api.comment.createComment, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          user_id: userId,
          content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'Error creating comment');
      }
    } catch (error) {
      setError(`Internal Server Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return { createComment, errorComment: error, success, loadingComment: loading };
};

export default useCreateComment;
