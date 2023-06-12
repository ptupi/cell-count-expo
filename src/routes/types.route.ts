import { Cell } from '../redux/reducers/userReducer';

export type RootStackParamList = {
  Main: undefined;
  Settings: undefined;
  EditCells: undefined;
  EditCell: { cell: Cell };
};
