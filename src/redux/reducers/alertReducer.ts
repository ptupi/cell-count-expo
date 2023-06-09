import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  visible: boolean;
  title: string;
  message: string;
}

const initialState: AlertState = {
  visible: false,
  title: '',
  message: '',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setAlertTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setAlertMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setAlertVisible, setAlertTitle, setAlertMessage } =
  alertSlice.actions;
export default alertSlice.reducer;
