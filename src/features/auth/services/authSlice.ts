import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type token = string;

interface AuthState {
  token?: token;
}
const initialState: AuthState = {
  token: undefined,
};
const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<token>) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = undefined;
      localStorage.removeItem("persist:root");
    },
  },
});
export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
export const getToken = (state: { authentication: AuthState }) => state.authentication.token;