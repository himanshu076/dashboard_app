import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/components/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

// Load user data from sessionStorage
const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;
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

      // if (typeof window !== 'undefined') {
      //   sessionStorage.setItem('user', JSON.stringify(action.payload));
      // }
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
    hydrateUser: (state) => {
      // Lazy load user from sessionStorage if running in the browser
      if (typeof window !== 'undefined') {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          state.user = JSON.parse(storedUser);
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const { login, logout, updateStatus, setError, clearError, hydrateUser } = authSlice.actions;
export default authSlice.reducer;
