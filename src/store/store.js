import { configureStore } from '@reduxjs/toolkit';

import { userApi } from './api/userApi';
import { adminApi } from './api/adminApi';
import { appointmentsApi } from './api/appointmentsApi';

import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,

    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer, // ✅ Added
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(adminApi.middleware)
      .concat(appointmentsApi.middleware), // ✅ Added
});
