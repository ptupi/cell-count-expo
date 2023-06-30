import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Text, { Fonts } from './Text.component';
import CellBadge from './CellBadge.component';
import colorsStyle from '../styles/colors.style';
import { Cell } from '../redux/reducers/userReducer';

export type CellCountProps = {
  cell: Cell;
  onPress: (cell: Cell) => void;
  currentCount: Cell[];
  disabled?: boolean;
};

const CellCount = (props: CellCountProps) => {
  const { cell, onPress, disabled, currentCount } = props;

  const cellCount = currentCount.filter(
    (item) => item.name === cell.name && item.tag === cell.tag
  ).length;

  const styles = StyleSheet.create({
    cell: {
      margin: 8,
      width: 58,
      height: 58,
      borderRadius: 29,
      backgroundColor: colorsStyle.absolutes.black,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cellDisabled: {
      backgroundColor: colorsStyle.greys[3],
    },
    erit: {
      backgroundColor: colorsStyle.buttons,
    },
    tag: {
      fontFamily: Fonts.Inter_700Bold,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      color: colorsStyle.absolutes.white,
    },
    tagDisabled: {
      color: colorsStyle.greys[2],
    },
  });

  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress(cell)}
        disabled={disabled}
        style={[
          styles.cell,
          cell.type === 'erit' && styles.erit,
          disabled && styles.cellDisabled,
        ]}
        activeOpacity={0.4}
      >
        <Text style={[styles.tag, disabled && styles.tagDisabled]}>
          {cell.tag}
        </Text>
      </TouchableOpacity>
      {cellCount > 0 && <CellBadge label={cellCount.toString()} />}
    </View>
  );
};

export default CellCount;
