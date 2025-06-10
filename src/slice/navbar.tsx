import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
  isVisible: boolean;
}

const initialState: NavbarState = {
  isVisible: true, // Default state: Navbar is visible
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    showNavbar: (state) => {
      state.isVisible = true;
    },
    hideNavbar: (state) => {
      state.isVisible = false;
    },
    toggleNavbar: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { showNavbar, hideNavbar, toggleNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
