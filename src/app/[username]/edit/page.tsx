'use client';

import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Avatar, Stack, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux'
import useUpdateUser from '@/hooks/useUpdateUser';
import { RootState } from '@/redux/store';
import { statusOptions } from '@/constants/constants';


const EditProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { updateUser, error, success, loading } = useUpdateUser();

  const [formData, setFormData] = useState({
    fullname: user?.fullname ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    status: user?.status ?? "",
    profile_image: user?.profile_image ?? "",
  });

  const [imagePreview, setImagePreview] = useState<string>(user?.profile_image || "");
  const [validation, setValidation] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  useEffect(() => {
    // If the user data changes (e.g., after a successful update), reset the form data
    if (user) {
      setFormData({
        fullname: user.fullname ?? "",
        username: user.username ?? "",
        email: user.email ?? "",
        status: user.status ?? "",
        profile_image: user.profile_image ?? "",
      });
      setImagePreview(user.profile_image ?? "");
    }
  }, [user]);

  useEffect(() => {
    // Show success alert for 5 seconds when the success flag is true
    if (success) {
      setShowSuccessAlert(true);
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000); // Hide alert after 5 seconds

      return () => clearTimeout(timer); // Cleanup timeout on unmount or when success changes
    }
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setImagePreview(url); // Update the preview image as the URL is entered
      setFormData((prevData) => ({
        ...prevData,
        profile_image: url, // Store the URL in the form data
      }));
    }
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    // Only update the status if it's not the "custom" option
    if (value !== "status") {
      setFormData((prevData) => ({
        ...prevData,
        status: value,
      }));
    } else {
      // Set the status to "custom" only when explicitly selected
      setFormData((prevData) => ({
        ...prevData,
        status: "", // You can also use "" to clear the status or handle it differently
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setValidation("User is not logged in.");
      return;
    }

    const { id, password, posts, connections } = user;
    // Only update if there's a change in any field
    if (
      formData.fullname !== user.fullname ||
      formData.username !== user.username ||
      formData.email !== user.email ||
      formData.status !== user.status ||
      formData.profile_image !== user.profile_image
    ) {
      await updateUser(
        id,
        formData.fullname,
        formData.username,
        formData.email,
        formData.status,
        formData.profile_image,
        password || "",
        posts,
        connections,
      );
      setValidation('');
    } else {
      setValidation('No changes detected. Please modify at least one field.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>Edit Profile</Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Avatar src={imagePreview} sx={{ width: 150, height: 150, margin: 'auto' }} />
          <TextField
            label="Profile Image URL"
            name="profile_image"
            value={formData.profile_image}
            onChange={handleImageChange}
            fullWidth
            variant="outlined"
            sx={{ marginTop: 2 }}
          />

          <TextField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled // Username can't be changed
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled // Username can't be changed
          />

          {/* <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          /> */}

          {/* Status dropdown */}
          <FormControl fullWidth variant="outlined">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              label="Status"
              name="status"
              value={formData.status || "status"}  // Default to 'status' if no status is selected
              onChange={handleStatusChange}
              fullWidth
            >
              <MenuItem value="status" disabled>Status...</MenuItem>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>

          {/* Error Message */}
          {error && <Typography color="error">{error}</Typography>}

          {/* Validation Error Message */}
          {validation && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {validation}
            </Typography>
          )}

          {showSuccessAlert && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Profile updated successfully!
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default EditProfile;
