import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShareOptionsState {
  visible: boolean;
  handleApp: (item?: any) => void;
  handleImage: (item?: any) => void;
  handlePdf: (item?: any) => void;
  handleExcel: (item?: any) => void;
}

const initialState: ShareOptionsState = {
  visible: false,
  handleApp: () => {},
  handleImage: () => {},
  handlePdf: () => {},
  handleExcel: () => {},
};

export const shareOptionsSlice = createSlice({
  name: 'shareOptions',
  initialState,
  reducers: {
    setShareOptionsVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setShareOptionsHandleApp: (
      state,
      action: PayloadAction<(item?: any) => void>
    ) => {
      state.handleApp = action.payload;
    },
    setShareOptionsHandleImage: (
      state,
      action: PayloadAction<(item?: any) => void>
    ) => {
      state.handleImage = action.payload;
    },
    setShareOptionsHandlePdf: (
      state,
      action: PayloadAction<(item?: any) => void>
    ) => {
      state.handlePdf = action.payload;
    },
    setShareOptionsHandleExcel: (
      state,
      action: PayloadAction<(item?: any) => void>
    ) => {
      state.handleExcel = action.payload;
    },
  },
});

export const {
  setShareOptionsVisible,
  setShareOptionsHandleApp,
  setShareOptionsHandleImage,
  setShareOptionsHandlePdf,
  setShareOptionsHandleExcel,
} = shareOptionsSlice.actions;
export default shareOptionsSlice.reducer;
