import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { onlineAppointmentApi } from "./api/onlineAppointmentApi";
import userReducer from "./slices/userSlice";
import onlineAppointmentReducer from "./slices/onlineAppointmentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    onlineAppointment: onlineAppointmentReducer,

    [userApi.reducerPath]: userApi.reducer,
    [onlineAppointmentApi.reducerPath]: onlineAppointmentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(onlineAppointmentApi.middleware),
});

export default store;
