import { FlatList } from 'react-native';

import { Cell } from '../redux/reducers/userReducer';
import { PickerOption } from '../components/Picker.component';

export type RootStackParamList = {
  Main: undefined;
  Settings: undefined;
  EditCells: undefined;
  EditCell: {
    cell: Cell;
    cellList: Cell[];
  };
  NewCell: { cellList: Cell[] };
  CountSetup: undefined;
  Count: { maxCount: PickerOption; leu: number };
};
