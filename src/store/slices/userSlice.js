// src/store/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper to generate a unique session ID
const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

const getOrCreateSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

const initialState = {
  userId: null,
  userData: null,
  sessionId: getOrCreateSessionId(), // Add session tracking
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      console.log("Setting userId:", action.payload);
      state.userId = action.payload;
      // Store in sessionStorage for persistence
      if (action.payload) {
        sessionStorage.setItem('userId', action.payload);
      }
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      // Store user data in sessionStorage
      if (action.payload) {
        sessionStorage.setItem('userData', JSON.stringify(action.payload));
      }
    },
    updateUserDataLocally: (state, action) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
        // Update sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(state.userData));
      }
    },
    clearUser: (state) => {
      state.userId = null;
      state.userData = null;
      state.error = null;
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userData');
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUserState: (state) => {
      state.userId = null;
      state.userData = null;
      state.isLoading = false;
      state.error = null;
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userData');
    },
    initializeUserFromSession: (state) => {
      // Load user data from sessionStorage on app start
      const savedUserId = sessionStorage.getItem('userId');
      const savedUserData = sessionStorage.getItem('userData');
      
      if (savedUserId) {
        state.userId = savedUserId;
      }
      
      if (savedUserData) {
        try {
          state.userData = JSON.parse(savedUserData);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          sessionStorage.removeItem('userData');
        }
      }
    },
   newSession: (state) => {
  // Clear Redux state
  state.userId = null;
  state.userData = null;
  state.sessionId = null;

  // Clear sessionStorage completely
  sessionStorage.clear();
},

  },
});

export const {
  setUserId,
  setUserData,
  updateUserDataLocally,
  clearUser,
  setLoading,
  setError,
  resetUserState,
  initializeUserFromSession,
  newSession,
} = userSlice.actions;

// Clear all user data from Redux and storage
export const clearStoredUserData = () => (dispatch) => {
  try {
    dispatch(resetUserState());
  } catch (error) {
    dispatch(setError("Failed to clear user data"));
  }
};

export default userSlice.reducer;