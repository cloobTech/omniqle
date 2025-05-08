import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode;
  modalProps?: {
    size?: string | number;
    withCloseButton?: boolean;
    [key: string]: any; // Allows other Mantine props
  };
}

const initialState: ModalState = {
  isOpen: false,
  content: null,
  modalProps: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        content: React.ReactNode;
        modalProps?: ModalState["modalProps"];
      }>
    ) => {
      state.isOpen = true;
      state.content = action.payload.content;
      state.modalProps = action.payload.modalProps || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
      state.modalProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
