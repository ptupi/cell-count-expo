import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

import { useColors } from '../hooks/useColors';

const Footer = (props: ViewProps) => {
  const { children } = props;

  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.screen.background,
      padding: 16,
      paddingBottom: 32,
      borderTopWidth: 1,
      borderTopColor: colors.component.footer.borderTop,
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default Footer;
