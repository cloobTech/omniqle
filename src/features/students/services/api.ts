import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@src/constants";
import { RootState } from "@src/context/store";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authentication.token;
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
    getStudents: builder.query({
      query: ({ schoolId, grade_id }) =>
        `schools/${schoolId}/grades/${grade_id}`,
      providesTags: (result) =>
        result ? [{ type: "Students", id: result.school_name }] : [],
    }),
    getSingleStudent: builder.query({
      query: ({ schoolId, studentId }) =>
        `schools/${schoolId}/students/${studentId}`,
      // providesTags: ({ schoolId }) => [{ type: "Students", id: schoolId }],
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
