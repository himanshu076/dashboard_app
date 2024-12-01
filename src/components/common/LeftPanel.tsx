import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { User } from '../types/user';
import { LeftPanelProps } from '../types/leftPanel';
import { useRouter } from 'next/navigation';

const LeftPanel: React.FC<LeftPanelProps> = ({ user }) => {
  const router = useRouter();

  const handleEditClick = () => {
    if (user?.username) {
      router.push(`/${user?.username}/edit`);  // Route to the EditProfile page dynamically
    }
  };

  const handelAddPost = () => {
    router.push(`/post`);
  }

  if (!user) {
    return <Typography variant="body2">User not found</Typography>;
  }

  return (
    <Box sx={{ width: 300, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar alt={user.fullname} src={user.profile_image || '/default-avatar.png'} sx={{ width: 100, height: 100, marginBottom: 2 }} />
      <Typography variant="h6" align="center">{user.fullname}</Typography>
      <Typography variant="body2" color="textSecondary" align="center">{user.status}</Typography>
      <Button variant="outlined" sx={{ marginTop: 2 }} onClick={handleEditClick}>Edit Account</Button>
      <Button variant="outlined" sx={{ marginTop: 2 }} onClick={handelAddPost}>Add Post</Button>
    </Box>
  );
};

export default LeftPanel;
