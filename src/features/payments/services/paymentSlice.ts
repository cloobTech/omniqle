import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Bank } from "../types/index";

interface BankState {
  localBankList: Bank[];
}

const initialState: BankState = {
  localBankList: [],
};

const bankSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    setLocalBankList(state, action: PayloadAction<Bank[]>) {
      state.localBankList = action.payload;
    },
  },
});

export const { setLocalBankList } = bankSlice.actions;
export default bankSlice.reducer;
