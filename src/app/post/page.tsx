'use client';

import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import useCreatePost from '@/hooks/useCreatePost';

const CreatePostPage = () => {
  const { createPost, error, success, loading } = useCreatePost();
  const [content, setContent] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.id) {
      createPost(user?.id, content); // Pass the user ID and content to create the post
    }
  };

  React.useEffect(() => {
    if (success) {
      setContent(''); // Clear content after successful post
    }
  }, [success]);

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Post
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
          variant="outlined"
          margin="normal"
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !content.trim()}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Post'}
          </Button>
        </Box>
      </form>

      {success && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          Post successfully created!
        </Typography>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      )}
    </Box>
  );
};

export default CreatePostPage;
