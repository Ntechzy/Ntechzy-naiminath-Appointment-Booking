// src/store/api/appointmentsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API}/appointments/`, // using env variable

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("adminToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },

    credentials: "include",
  }),

  tagTypes: ["OnlineAppointments"],

  endpoints: (builder) => ({

    // GET Online Appointments
    getOnlineAppointments: builder.query({
      query: ({ page = 1, limit = 10, status = "" }) => {
        let url = `online?page=${page}&limit=${limit}`;
        if (status) url += `&status=${status}`;
        return url;
      },
      providesTags: ["OnlineAppointments"],
    }),

    // CANCEL Online Appointment
    cancelOnlineAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `online/${appointmentId}/cancel`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["OnlineAppointments"],
    }),

  }),
});

// Export hooks
export const {
  useGetOnlineAppointmentsQuery,
  useLazyGetOnlineAppointmentsQuery,
  useCancelOnlineAppointmentMutation,
} = appointmentsApi;
