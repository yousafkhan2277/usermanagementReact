import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  permissions: JSON.parse(localStorage.getItem('permissions')) || [], // Initialize permissions
  isAuthenticated: !!localStorage.getItem('token'), // Check if token exists for authentication state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.permissions = action.payload.permissions; // Store permissions
      state.isAuthenticated = true;

      // Save to local storage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('permissions', JSON.stringify(action.payload.permissions)); // Store permissions
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.permissions = []; // Clear permissions on logout
      state.isAuthenticated = false;

      // Remove from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('permissions'); // Remove permissions
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
