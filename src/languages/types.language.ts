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

type CountSetupType = {
  title: string;
  desc: string;
  maxCount: string;
  maxCountTitle: string;
  totalLeu: string;
  start: string;
};

type CountType = {
  title: string;
  desc: string;
  end: string;
  undo: string;
  reset: string;
  resetTitle: string;
  resetMsg: string;
  descErit: string;
  descCell: string;
  endTitle: string;
  endMsg: string;
};

type ReportType = {
  title: string;
  end: string;
  endTitle: string;
  endMsg: string;
  leu: string;
  erit: string;
  global: string;
  diff: string;
  relative: string;
  absolute: string;
  total: string;
  count: string;
};

export type LanguageType = {
  main: MainType;
  settings: SettingsType;
  editCells: EditCellsType;
  editCell: EditCellType;
  newCell: NewCellType;
  countSetup: CountSetupType;
  count: CountType;
  report: ReportType;
};
