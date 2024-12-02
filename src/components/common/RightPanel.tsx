// src/app/dashboard/components/RightPanel.tsx
import React, { useState } from 'react';
import { Box, TextField, List, ListItem, Avatar, Typography } from '@mui/material';
import { User } from '../types/user';
import { useRouter } from 'next/navigation';  // For routing to the profile pag

const RightPanel = ({ connections }: { connections: User[] }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();  // For routing to the profile page

  const filteredConnections = connections.filter((user) =>
    user.fullname.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  // Handle navigating to the user's profile page
  const handleNavigateToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <Box sx={{ width: 300, padding: 2 }}>
      {/* Search for connections */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Display filtered connections */}
      <List>
        {filteredConnections.map((user) => (
          <ListItem
            key={user.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: 2,
            }}
            onClick={() => handleNavigateToProfile(user.id)}  // Navigate on click
          >
            <Avatar alt={user.fullname} src={user.profile_image} sx={{ width: 40, height: 40 }} />
            <Box sx={{ marginLeft: 2 }}>
              <Typography variant="body1">{user.fullname}</Typography>
              <Typography variant="body2" color="textSecondary">{user.status}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RightPanel;
