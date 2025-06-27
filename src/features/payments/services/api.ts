import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAYMENT_BASE_URL } from "@src/constants";
import type { BankAccountPayload, CreateInvoiceState } from "../types";
import { RootState } from "@src/context/store";

const TagTypes = {
  BankAccount: "BankAccount",
  Invoice: "Invoice",
} as const;

const baseQuery = fetchBaseQuery({
  baseUrl: PAYMENT_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authentication.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const paymentApi = createApi({
  reducerPath: "payments",
  baseQuery: baseQuery,
  tagTypes: Object.values(TagTypes),
  endpoints: (builder) => ({
    getBanksList: builder.query({
      query: () => `/banks`,
    }),
    verifyBankAccount: builder.mutation({
      query: (payload: { account_number: string; bank_code: string }) => ({
        url: `banks/verify`,
        method: "POST",
        body: payload,
      }),
    }),
    registerBankAccount: builder.mutation({
      query: (payload: BankAccountPayload) => ({
        url: `banks/register`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [TagTypes.BankAccount],
    }),
    getSchoolBankAccounts: builder.query({
      query: ({ schoolId }: { schoolId: number }) =>
        `/banks/schools/${schoolId}`,
      providesTags: [TagTypes.BankAccount],
    }),
    createInvoice: builder.mutation({
      query: ({
        payload,
        schoolId,
      }: {
        schoolId: number;
        payload: CreateInvoiceState;
      }) => ({
        url: `invoices/schools/${schoolId}/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [TagTypes.Invoice],
    }),

    getSchoolInvoices: builder.query({
      query: ({
        schoolId,
        discipline,
        term,
        academic_session,
      }: {
        schoolId: number;
        discipline?: string;
        term?: string;
        academic_session?: string;
      }) => {
        const params = new URLSearchParams();
        if (discipline) params.append("discipline", discipline);
        if (term) params.append("term", term);
        if (academic_session)
          params.append("academic_session", academic_session);

        const queryString = params.toString();
        return `/invoices/schools/${schoolId}${
          queryString ? `?${queryString}` : ""
        }`;
      },
      providesTags: [TagTypes.Invoice],
    }),
  }),
});
export const {
  useGetBanksListQuery,
  useVerifyBankAccountMutation,
  useRegisterBankAccountMutation,
  useGetSchoolBankAccountsQuery,
  useGetSchoolInvoicesQuery,
  useCreateInvoiceMutation,
} = paymentApi;
