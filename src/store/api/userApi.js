// src/store/api/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/users/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Create User - POST /api/users/
    createUser: builder.mutation({
      query: (userData) => ({
        url: '',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Get User by ID - GET /api/users/:id
    getUser: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    
    // Update User - PATCH /api/users/:id
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `${id}`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useLazyGetUserQuery,
} = userApi;