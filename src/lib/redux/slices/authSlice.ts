'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/components/types/user';
import Cookies from 'js-cookie';


interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}


const storedUser = Cookies.get('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;


const initialState: AuthState = {
  user: parsedUser || null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null; // Clear any previous errors
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateStatus: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.status = action.payload; // Update only the user's status
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload; // Set an error message
    },
    clearError: (state) => {
      state.error = null; // Clear the error message
    },
  },
});

export const { login, logout, updateStatus, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
