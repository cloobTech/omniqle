import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@src/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: (schoolId) => `schools/${schoolId}/users/me`,
    }),
  }),
});
export const { useGetCurrentUserQuery } = userApi;
