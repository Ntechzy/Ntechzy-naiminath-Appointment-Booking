// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';
import { bookingApi } from './api/bookingApi';
import { onlineAppointmentApi } from './api/onlineAppointmentApi'; // Import new API
import userReducer from './slices/userSlice';
import bookingReducer from './slices/bookingSlice';
import onlineAppointmentReducer from './slices/onlineAppointmentSlice'; // Import new slice

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    onlineAppointment: onlineAppointmentReducer, // Add new reducer
    [userApi.reducerPath]: userApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [onlineAppointmentApi.reducerPath]: onlineAppointmentApi.reducer, // Add new API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(bookingApi.middleware)
      .concat(onlineAppointmentApi.middleware), // Add new API middleware
});

export default store;