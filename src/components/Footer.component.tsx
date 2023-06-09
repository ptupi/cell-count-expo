import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

import colorsStyle from '../styles/colors.style';

export type FooterProps = {
  title: string;
  onPressBack: () => void;
};

const Footer = (props: ViewProps) => {
  const { children } = props;

  const styles = StyleSheet.create({
    container: {
      paddingBottom: 16,
      paddingHorizontal: 16,
      borderTopWidth: 1,
      borderTopColor: colorsStyle.opacity.black5,
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default Footer;
