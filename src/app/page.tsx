'use client';

import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to your Dashboard
      </Typography>
    </Container>
  );
};

export default HomePage;
