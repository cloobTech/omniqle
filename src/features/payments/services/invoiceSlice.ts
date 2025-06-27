// invoiceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CreateInvoiceState, LineItem } from "../types";



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
