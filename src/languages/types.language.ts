type MainType = {
  title: string;
  subtitle: string;
  data: string;
  cellCount: string;
  quiz: string;
};

type SettingsType = {
  title: string;
  edit: string;
  contact: string;
  rate: string;
  alertTitle: string;
  linkError: string;
};

type EditCellsType = {
  title: string;
  deleteTitle: string;
  deleteMessage: string;
  standard: string;
  standardTitle: string;
  standardMessage: string;
};

type EditCellType = {
  title: string;
  desc: string;
  save: string;
};

type NewCellType = {
  title: string;
  desc: string;
  save: string;
  placeName: string;
  placeTag: string;
};

export type LanguageType = {
  main: MainType;
  settings: SettingsType;
  editCells: EditCellsType;
  editCell: EditCellType;
  newCell: NewCellType;
};
