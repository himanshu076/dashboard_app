'use client';

import React from 'react';
import LeftPanel from '@/components/common/LeftPanel';
import MiddlePanel from '@/components/common/MiddlePanel';
import RightPanel from '@/components/common/RightPanel';
import { Box, Button, Container, Typography } from '@mui/material';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


const UserDashboard = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            You need to log in to view your dashboard
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            Please log in to access your personalized content and features.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/login')}
            sx={{ width: '200px' }}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    user && (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <LeftPanel user={user} />
        <MiddlePanel user={user}/>
        <RightPanel connections={user.connections} />
      </Box>
    )
  );
};

export default UserDashboard;
