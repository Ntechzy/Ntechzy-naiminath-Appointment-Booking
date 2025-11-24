// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userData: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userId = null;
      state.userData = null;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserId, setUserData, clearUser, setLoading, setError } = userSlice.actions;

// Separate function to store user ID for future use
export const storeUserIdForFuture = (userId) => (dispatch) => {
  try {
    // Store in Redux
    dispatch(setUserId(userId));
    
    // Also store in localStorage for persistence
    localStorage.setItem('userId', userId);
    
    console.log('User ID stored for future use:', userId);
  } catch (error) {
    console.error('Error storing user ID:', error);
  }
};

// Function to retrieve stored user ID
export const getStoredUserId = () => (dispatch) => {
  try {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      dispatch(setUserId(storedUserId));
      return storedUserId;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving stored user ID:', error);
    return null;
  }
};

export default userSlice.reducer;