import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';
import { useColors } from '../hooks/useColors';

export type ButtonProps = {
  title: string;
  onPress: () => void;
  icon?: any;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { title, onPress, icon, disabled } = props;

  const colors = useColors();

  const styles = StyleSheet.create({
    pressable: {
      width: '100%',
      height: 56,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: disabled
        ? colors.component.button.primary.disabled
        : colors.component.button.primary.active,
      borderRadius: 8,
    },
    pressableText: {
      marginLeft: icon != null ? 8 : 0,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      fontFamily: Fonts.Inter_700Bold,
      color: disabled
        ? colors.component.button.primary.disabledText
        : colors.component.button.primary.text,
    },
  });

  return (
    <Pressable style={styles.pressable} onPress={onPress} disabled={disabled}>
      {icon != null && (
        <MaterialIcons
          name={icon}
          color={
            disabled
              ? colors.component.button.primary.disabledText
              : colors.component.button.primary.text
          }
          size={24}
        />
      )}
      <Text style={styles.pressableText}>{title}</Text>
    </Pressable>
  );
};

export default Button;
