import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type token = string;

interface AuthState {
  token?: token;
}
const initialState: AuthState = {
  token: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<token>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = undefined;
    },
  },
});
export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
