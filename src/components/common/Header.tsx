'use client';

// src/components/common/Header.tsx
import React from 'react';
import { Box, Button, Typography, AppBar, Toolbar, Container } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/slices/authSlice';
import Cookies from 'js-cookie';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    // Handle logout (clear user Cookies)
    Cookies.remove('user');
    dispatch(logout());
    router.push('/'); // Redirect to home page after logout
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/" passHref>
              <Typography variant="h6" sx={{ cursor: 'pointer', color: 'white' }}>
                Home
              </Typography>
            </Link>
            {user?.username ? (
              <Link href={`/${user.username}`} passHref>
                <Typography variant="h6" sx={{ cursor: 'pointer', color: 'white' }}>
                  My Dashboard
                </Typography>
              </Link>
            ) : null}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {user ? (
              <>
                <Typography variant="body1" sx={{ color: 'white', alignSelf: 'center' }}>
                  Hello, {user?.fullname}
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/signup" passHref>
                  <Button variant="outlined" color="inherit">Sign Up</Button>
                </Link>
                <Link href="/login" passHref>
                  <Button variant="outlined" color="inherit">Sign In</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
