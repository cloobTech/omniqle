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
  reducerPath: "classrooms",
  baseQuery: baseQuery,
  tagTypes: ["Grades"],
  endpoints: (builder) => ({
    getGrades: builder.query({
      query: ({ schoolId }) => `schools/${schoolId}/grades`,
      providesTags: ({ schoolId }) => [{ type: "Grades", id: schoolId }],
    }),
    getSingleGrades: builder.query({
      query: ({ schoolId, gradeId }) => `schools/${schoolId}/grades/${gradeId}`,
      providesTags: ({ schoolId }) => [{ type: "Grades", id: schoolId }],
    }),
    getGradeDisplayNames: builder.query({
      query: ({ schoolId }) => `schools/${schoolId}/level_display_names`,
    }),
    // ... other endpoints
    createGrades: builder.mutation({
      query: ({ schoolId, data }) => ({
        url: `schools/${schoolId}/grades`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ({ schoolId }) => {
        return [
          { type: "Grades", id: schoolId }, // Make sure this matches exactly
        ];
      },
    }),
  }),
});
export const {
  useGetGradesQuery,
  useCreateGradesMutation,
  useGetSingleGradesQuery,
  useGetGradeDisplayNamesQuery,
} = classApi;
