"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import useLogin from '@/hooks/useLogin';
import { login as setLogin } from '@/lib/redux/slices/authSlice';
import Cookies from 'js-cookie';


const LoginPage = () => {
  const [validation, setValidation] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { login, error, loading } = useLogin();

  // State for login form
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setValidation("Username and password are required.");
      return;
    }

    const user = await login(username, password);

    if (user) {
      const updatedUser = {...user, password};
      Cookies.set('user', JSON.stringify(updatedUser));

      dispatch(setLogin(user)); // Dispatch login action if successful

      // Redirect to the user's dashboard
      router.push(`/`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>

          {validation && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {validation}
            </Typography>
          )}

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
