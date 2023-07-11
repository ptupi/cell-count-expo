import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShareOptionsState {
  visible: boolean;
  handleApp: (item?: any) => void;
  handleImage: (item?: any) => void;
}

const initialState: ShareOptionsState = {
  visible: false,
  handleApp: () => {},
  handleImage: () => {},
};

export const shareOptionsSlice = createSlice({
  name: 'shareOptions',
  initialState,
  reducers: {
    setShareOptionsVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setShareOptionsHandleImage: (
      state,
      action: PayloadAction<(item?: any) => void>
    ) => {
      state.handleImage = action.payload;
    },
    setShareOptionsHandleApp: (
      state,
      action: PayloadAction<(item?: any) => void>
    ) => {
      state.handleApp = action.payload;
    },
  },
});

export const {
  setShareOptionsVisible,
  setShareOptionsHandleImage,
  setShareOptionsHandleApp,
} = shareOptionsSlice.actions;
export default shareOptionsSlice.reducer;
