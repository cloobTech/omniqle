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

export const classApi = createApi({
  reducerPath: "classes",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getGrades: builder.query({
      query: (schoolId) => `schools/${schoolId}/grades`,
    }),
  }),
});
export const { useGetGradesQuery } = classApi;
