import { useState } from 'react';
import api from '@/config/api.config';
import { Post } from '@/components/types/post';
import { login as setLogin } from '@/lib/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const useUpdateUser = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const updateUser = async (
    id: string,
    fullname: string,
    username: string,
    email: string,
    status: string,
    profile_image: string,
    password: string,
    posts: Post[],
    connections: [],
  ) => {
    setLoading(true);
    setError(''); // Reset error on each call
    setSuccess(false);

    try {
      // Send the updated user data to the API (via PUT request)
      const response = await fetch(api.users.updateUser(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          fullname,
          email,
          status,
          profile_image,
          password,
          posts,
          connections,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setLogin(data));
        Cookies.set('user', JSON.stringify(data));
        setSuccess(true);
      } else {
        setError(data.message || 'Error updating user');
      }
    } catch (error) {
      setError('Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, error, success, loading };
};

export default useUpdateUser;
