'use client';

import { hydrateUser } from "@/redux/slices/authSlice";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateUser());  // Dispatch hydrateUser action to load the user from sessionStorage
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to your Dashboard
      </Typography>
    </Container>
  );
};

export default HomePage;
