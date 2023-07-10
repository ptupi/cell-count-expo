import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Cell = {
  order: number;
  name: string;
  tag: string;
  type?: 'erit' | 'std';
};

export type CellResult = Cell & {
  relative: string | number;
  absolute: string | number;
};

interface UserState {
  welcome: boolean;
  stdCellList: Cell[];
  customCellList: Cell[];
}

const initialState: UserState = {
  welcome: true,
  stdCellList: [
    {
      order: 1,
      name: 'Blasto',
      tag: 'Bls',
    },
    {
      order: 2,
      name: 'Promielócitos',
      tag: 'Pro',
    },
    {
      order: 3,
      name: 'Mielócitos',
      tag: 'Mie',
    },
    {
      order: 4,
      name: 'Metamielócitos',
      tag: 'Meta',
    },
    {
      order: 5,
      name: 'Bastonetes',
      tag: 'Bst',
    },
    {
      order: 6,
      name: 'Segmentados',
      tag: 'Neut',
    },
    {
      order: 7,
      name: 'Eosinófilos',
      tag: 'Eos',
    },
    {
      order: 8,
      name: 'Linfócitos Típicos',
      tag: 'Linf',
    },
    {
      order: 9,
      name: 'Linfócitos Reativos',
      tag: 'LR',
    },
    {
      order: 10,
      name: 'Monócitos',
      tag: 'Mon',
    },
    {
      order: 11,
      name: 'Basófilos',
      tag: 'Bas',
    },
    {
      order: 12,
      name: 'Eritroblasto',
      tag: 'Erit',
      type: 'erit',
    },
  ],
  customCellList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserWelcome: (state, action: PayloadAction<boolean>) => {
      state.welcome = action.payload;
    },
    setCustomCellList: (state, action: PayloadAction<Cell[]>) => {
      state.customCellList = action.payload;
    },
  },
});

export const { setUserWelcome, setCustomCellList } = userSlice.actions;
export default userSlice.reducer;
