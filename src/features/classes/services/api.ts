import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@src/constants";
import { ICreateGrade } from "../forms/CreateClassRoom";

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
    createGrades: builder.mutation({
      query: ({
        schoolId,
        data,
      }: {
        schoolId: string;
        data: ICreateGrade;
      }) => ({
        url: `schools/${schoolId}/grades`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetGradesQuery, useCreateGradesMutation } = classApi;
