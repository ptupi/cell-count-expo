import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Cell = {
  id: number;
  name: string;
  tag: string;
};

interface UserState {
  welcome: boolean;
  cellList: Cell[];
}

const initialState: UserState = {
  welcome: true,
  cellList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserWelcome: (state, action: PayloadAction<boolean>) => {
      state.welcome = action.payload;
    },
    setCellList: (state, action: PayloadAction<Cell[]>) => {
      state.cellList = action.payload;
    },
  },
});

export const { setUserWelcome, setCellList } = userSlice.actions;
export default userSlice.reducer;
