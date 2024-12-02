import { useState } from 'react';
import api from '@/config/api.config'

const useSignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUp = async (username, password, email, fullname, status = "Busy", profile_image = "https://via.placeholder.com/150") => {
    setLoading(true);
    setError(""); // Reset error on each call
    setSuccess(false);

    try {
      // Send the new user data to the API (via POST request)
      const response = await fetch(api.auth.signUp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          email,
          fullname,
          status,
          profile_image,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Error creating user");
      }
    } catch (error) {
      setError(`Internal Server Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return { signUp, error, success, loading };
};

export default useSignUp;
