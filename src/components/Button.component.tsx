import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colorsStyle from '../styles/colors.style';
import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';

export type ButtonProps = {
  title: string;
  onPress: () => void;
  icon: any;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { title, onPress, icon, disabled } = props;

  const styles = StyleSheet.create({
    pressable: {
      width: '100%',
      height: 56,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: disabled ? colorsStyle.greys[2] : colorsStyle.buttons,
      borderRadius: 8,
    },
    pressableText: {
      marginLeft: icon != null ? 8 : 0,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      fontFamily: Fonts.Inter_700Bold,
      color: colorsStyle.absolutes.white,
    },
  });

  return (
    <Pressable style={styles.pressable} onPress={onPress} disabled={disabled}>
      {icon != null && (
        <MaterialIcons
          name={icon}
          color={colorsStyle.absolutes.white}
          size={24}
        />
      )}
      <Text style={styles.pressableText}>{title}</Text>
    </Pressable>
  );
};

export default Button;
