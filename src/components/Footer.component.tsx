import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

import colorsStyle from '../styles/colors.style';

const Footer = (props: ViewProps) => {
  const { children } = props;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colorsStyle.absolutes.white,
      padding: 16,
      paddingBottom: 32,
      borderTopWidth: 1,
      borderTopColor: colorsStyle.opacity.black5,
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default Footer;
