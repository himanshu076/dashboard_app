"use client";

import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Box, Alert, CircularProgress } from '@mui/material';
import useSignUp from '@/hooks/useSignUp';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState("");
  // const [success, setSuccess] = useState(false);

  const { signUp, error, success, loading } = useSignUp();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      // setError(""); // Clear error message when user starts typing
    };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, username, email, password } = formData;

    // Basic validation
    if (!fullName || !username || !email || !password) {
      setValidation("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setValidation("Password must be at least 6 characters long.");
      return;
    }

    signUp(fullName, username, email, password);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Sign Up
      </Typography>

      {validation && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {validation}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Sign-up successful! You can now log in.
        </Alert>
      )}

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSignUp}>
        <TextField label="Full Name" name="fullName" variant="outlined" value={formData.fullName} onChange={handleChange} fullWidth required/>
        <TextField label="Username" name="username" value={formData.username} onChange={handleChange} variant="outlined" fullWidth required />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} variant="outlined" fullWidth required />
        <TextField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" variant="outlined" fullWidth required/>
        <Button type="submit" variant="contained" color="primary" onClick={handleSignUp} fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
