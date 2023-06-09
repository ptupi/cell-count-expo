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

export type LanguageType = {
  main: MainType;
  settings: SettingsType;
};
