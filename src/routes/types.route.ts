import { Cell, CellResult } from '../redux/reducers/userReducer';
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
  Report: {
    maxCount: PickerOption;
    leu: number;
    eritCount: number;
    globalCount: string | number;
    cellResultList: CellResult[];
  };
};
