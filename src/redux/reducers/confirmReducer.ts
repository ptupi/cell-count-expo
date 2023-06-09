import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfirmState {
  visible: boolean;
  title: string;
  message: string;
  handleConfirm: (item?: any) => void;
}

const initialState: ConfirmState = {
  visible: false,
  title: '',
  message: '',
  handleConfirm: () => {},
};

export const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    setConfirmVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setConfirmTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setConfirmMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setConfirmHandleConfirm: (
      state,
      action: PayloadAction<(item?: any) => void>
    ) => {
      state.handleConfirm = action.payload;
    },
  },
});

export const {
  setConfirmVisible,
  setConfirmTitle,
  setConfirmMessage,
  setConfirmHandleConfirm,
} = confirmSlice.actions;
export default confirmSlice.reducer;
