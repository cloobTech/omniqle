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

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: ({ schoolId }: { schoolId: number }) =>
        `schools/${schoolId}/users/me`,
    }),
  }),
});
export const { useGetCurrentUserQuery } = userApi;
