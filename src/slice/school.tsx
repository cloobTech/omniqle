import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SchoolState {
  schoolId: number | null;
}

const initialState: SchoolState = {
  schoolId: null,
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    setSchoolId(state, action: PayloadAction<number>) {
      state.schoolId = action.payload;
    },
    clearSchoolId(state) {
      state.schoolId = null;
    },
  },
});

export const { setSchoolId, clearSchoolId } = schoolSlice.actions;
export default schoolSlice.reducer;
