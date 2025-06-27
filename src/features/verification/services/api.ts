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

export const verifyPersonApi = createApi({
  reducerPath: "verification",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    verifyPerson: builder.mutation({
      query: ({ schoolId, personId, body }) => ({
        url: `schools/${schoolId}/persons/${personId}/verify`,
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useVerifyPersonMutation } = verifyPersonApi;
