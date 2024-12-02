// src/common/hooks/useLogin.js
import { useState } from 'react';
import api from '@/config/api.config';

const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    setError(""); // Clear previous error

    try {
      // Send login request to API
      const response = await fetch(api.auth.login);
      const users = await response.json();

      // Find the user with the provided username and password
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // If user is found and credentials match, return user data
        setLoading(false); // Stop loading
        return {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          status: user.status,
          profile_image: user.profile_image,
          posts: user.posts,
          connections: user.connections,
        };
      } else {
        // If no matching user found, set error state
        setLoading(false); // Stop loading
        setError("Invalid username or password");
        return null;
      }
    } catch (error) {
      setError(`Internal Server Error: ${error}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};

export default useLogin;
