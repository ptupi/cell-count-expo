import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text, { Fonts } from './Text.component';
import { useColors } from '../hooks/useColors';

export type CellBadgeProps = {
  label: string;
};

const CellBadge = (props: CellBadgeProps) => {
  const { label } = props;

  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      minWidth: 32,
      height: 24,
      borderRadius: 12,
      borderColor: colors.component.cellBadge.border,
      backgroundColor: colors.component.cellBadge.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      paddingHorizontal: 8,
    },
    text: {
      fontFamily: Fonts.Inter_700Bold,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      color: colors.component.cellBadge.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default CellBadge;
