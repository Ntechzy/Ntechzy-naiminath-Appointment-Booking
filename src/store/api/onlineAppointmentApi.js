// src/store/api/onlineAppointmentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const onlineAppointmentApi = createApi({
  reducerPath: 'onlineAppointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['OnlineAppointment'],
  endpoints: (builder) => ({
    // Create Online Appointment - POST /api/online
    createOnlineAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: 'online',
        method: 'POST',
        body: appointmentData,
      }),
      invalidatesTags: ['OnlineAppointment'],
    }),
    
    // Get Online Appointments - GET /api/online (protected)
    getOnlineAppointments: builder.query({
      query: ({ page = 1, limit = 10, status } = {}) => {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', limit);
        if (status) params.append('status', status);
        
        return `online?${params.toString()}`;
      },
      providesTags: ['OnlineAppointment'],
    }),
  }),
});

export const {
  useCreateOnlineAppointmentMutation,
  useGetOnlineAppointmentsQuery,
  useLazyGetOnlineAppointmentsQuery,
} = onlineAppointmentApi;