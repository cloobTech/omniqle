import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAYMENT_BASE_URL } from "@src/constants";
import type { BankAccountPayload, CreateInvoiceState } from "../types";

const baseQuery = fetchBaseQuery({
  baseUrl: PAYMENT_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const paymentApi = createApi({
  reducerPath: "payments",
  baseQuery: baseQuery,
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
    }),
    getSchoolBankAccounts: builder.query({
      query: ({ schoolId }: { schoolId: number }) =>
        `/banks/schools/${schoolId}`,
    }),
    createInvoice: builder.mutation({
      query: ({
        payload,
        schoolId,
        levelId,
      }: {
        schoolId: number;
        levelId: number;
        payload: CreateInvoiceState;
      }) => ({
        url: `invoices/schools/${schoolId}/create`,
        method: "POST",
        body: payload,
      }),
    }),

    getInvoices: builder.query({
      query: ({
        schoolId,
        levelId,
        parentId,
        studentId,
      }: {
        schoolId: number;
        levelId: number;
        parentId: number;
        studentId: number;
      }) =>
        `/invoices/schools/${schoolId}/levels/${levelId}/parents/${parentId}/students/${studentId}`,
    }),
  }),
});
export const {
  useGetBanksListQuery,
  useVerifyBankAccountMutation,
  useRegisterBankAccountMutation,
  useGetSchoolBankAccountsQuery,
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
} = paymentApi;
