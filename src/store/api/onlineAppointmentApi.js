// src/store/api/onlineAppointmentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export const onlineAppointmentApi = createApi({
  reducerPath: "onlineAppointmentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API}/appointments/`, // using .env URL
    credentials: "include", // required for cookies/auth

    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");

      // Read token from Redux OR localStorage
      const reduxToken = getState()?.admin?.token;
      const localToken = localStorage.getItem("adminToken");
      const token = reduxToken || localToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["OnlineAppointment"],

  endpoints: (builder) => ({
    // CREATE appointment
    createOnlineAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "online",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["OnlineAppointment"],
    }),

    // GET appointments with filters
    getOnlineAppointments: builder.query({
      query: ({ page = 1, limit = 10, status } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (status) params.append("status", status);

        return `online?${params.toString()}`;
      },
      providesTags: ["OnlineAppointment"],
    }),

    // CANCEL appointment
    cancelOnlineAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `online/${appointmentId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["OnlineAppointment"],
    }),
  }),
});

export const {
  useCreateOnlineAppointmentMutation,
  useGetOnlineAppointmentsQuery,
  useLazyGetOnlineAppointmentsQuery,
  useCancelOnlineAppointmentMutation,
} = onlineAppointmentApi;
