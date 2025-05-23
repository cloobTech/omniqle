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

export const studentApi = createApi({
  reducerPath: "students",
  baseQuery: baseQuery,
  tagTypes: ["Students"],
  endpoints: (builder) => ({
    getStudents: builder.query<
      { pagination: object; school_name: string; students: [] }, // Response type
      { schoolId: number; grade_id: number } // Query parameters type
    >({
      query: ({ schoolId, grade_id }) =>
        `schools/${schoolId}/students?grade_id=${grade_id}`, // API endpoint with query parameters
      providesTags: (result) =>
        result ? [{ type: "Students", id: result.school_name }] : [], // Tag for cache invalidation
    }),
    getSingleStudent: builder.query({
      query: ({ schoolId, studentId }) =>
        `schools/${schoolId}/students/${studentId}`,
      providesTags: ({ schoolId }) => [{ type: "Students", id: schoolId }],
    }),
    createStudent: builder.mutation({
      query: ({ schoolId, data }) => ({
        url: `schools/${schoolId}/students/bulk_create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ({ schoolId }) => [{ type: "Students", id: schoolId }],
    }),
  }),
});
export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useGetSingleStudentQuery,
} = studentApi;
