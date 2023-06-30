import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text, { Fonts } from './Text.component';
import colorsStyle from '../styles/colors.style';

export type CellBadgeProps = {
  label: string;
};

const CellBadge = (props: CellBadgeProps) => {
  const { label } = props;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      minWidth: 32,
      height: 24,
      borderRadius: 12,
      borderColor: colorsStyle.absolutes.red,
      backgroundColor: colorsStyle.absolutes.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      paddingHorizontal: 8,
    },
    text: {
      fontFamily: Fonts.Inter_300Light,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      color: colorsStyle.absolutes.red,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default CellBadge;
