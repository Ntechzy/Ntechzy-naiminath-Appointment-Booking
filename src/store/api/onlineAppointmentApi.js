// src/store/api/onlineAppointmentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export const onlineAppointmentApi = createApi({
  reducerPath: 'onlineAppointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API}/appointments/`,  // <-- using .env here
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),

  tagTypes: ['OnlineAppointment'],

  endpoints: (builder) => ({

    // CREATE APPOINTMENT
    createOnlineAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: 'online',
        method: 'POST',
        body: appointmentData,
      }),
      invalidatesTags: ['OnlineAppointment'],
    }),

    // GET APPOINTMENTS WITH QUERY PARAMS
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
