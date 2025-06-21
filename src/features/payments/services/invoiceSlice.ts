// invoiceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LineItem = {
  id: string;
  item: string;
  required: boolean;
  total_item_fee: number;
  line_item_breakdown: Record<string, number>;
};

export type CreateInvoiceState = {
  discipline?: string;
  accept_installments: "yes" | "no";
  minimum_acceptable_payment: number;
  role: string;
  transaction_fee_bearer: "school" | "parent";
  due_date: string;
  description: string;
  created_by: number;
  academic_session: string;
  term: string;
  level_id: number;
  line_items: Record<string, LineItem[]>;
  isSplittedAccount: boolean;
};

const initialState: Partial<CreateInvoiceState> = {
  line_items: {},
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<Partial<CreateInvoiceState>>
    ) => {
      return { ...state, ...action.payload };
    },
    addLineItem: (
      state,
      action: PayloadAction<{
        subaccount: string;
        item: LineItem;
      }>
    ) => {
      const { subaccount, item } = action.payload;
      if (!state.line_items) state.line_items = {};
      if (!state.line_items[subaccount]) {
        state.line_items[subaccount] = [];
      }
      state.line_items[subaccount].push(item);
    },
    resetForm: () => initialState,
  },
});

export const { updateField, addLineItem, resetForm } = invoiceSlice.actions;
export default invoiceSlice.reducer;
