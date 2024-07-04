import { useColorScheme } from 'react-native';

import colorsStyle from '../styles/colors.style';

export const useColors = () => {
  const colorScheme = useColorScheme();

  return colorsStyle[colorScheme];
};
