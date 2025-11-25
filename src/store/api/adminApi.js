// src/store/api/adminApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Load backend URL from .env
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API}/admin/`, // using env variable
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include", // allow cookies (jwt)
  }),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({

    // POST /api/admin/login
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Admin"],
    }),

    // POST /api/admin/reset-password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const { 
  useAdminLoginMutation, 
  useResetPasswordMutation 
} = adminApi;
