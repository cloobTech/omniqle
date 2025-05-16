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
      providesTags: (result, error, { schoolId }) => [
        { type: "Grades", id: schoolId }, // Changed to use object destructuring
      ],
    }),
    getSingleGrades: builder.query({
      query: ({ schoolId, gradeId }) => `schools/${schoolId}/grades/${gradeId}`,
      providesTags: (result, error, { schoolId }) => [
        { type: "Grades", id: schoolId },
      ],
    }),
    // ... other endpoints
    createGrades: builder.mutation({
      query: ({ schoolId, data }) => ({
        url: `schools/${schoolId}/grades`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { schoolId }) => {
        console.log("Invalidating tags for schoolId:", schoolId);
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
} = classApi;
