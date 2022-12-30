import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  open: boolean
}

const initialState: ModalState = {
  open: false
}

const modalSlice = createSlice({
  name: 'openModal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
  }
})
export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;