import React from 'react';
import {
  StyleSheet,
  TextInput as TextInputReactNative,
  TextInputProps,
  View,
  Keyboard,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Fonts } from './Text.component';
import Pressable from './Pressable.component';
import { isEmptyString } from '../utils/validator.utils';
import { useColors } from '../hooks/useColors';

interface CustomInputProps {
  componentRef?: React.Ref<TextInputReactNative>;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  close?: boolean;
}

const TextInput = (props: CustomInputProps & TextInputProps) => {
  const { componentRef, value, setValue, style, close } = props;

  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
      marginHorizontal: 16,
      height: 44,
      flexDirection: 'row',
    },
    input: {
      flex: 1,
      textAlign: 'left',
      borderBottomColor: colors.component.input.borderBottom,
      borderBottomWidth: 1,
      fontFamily: Fonts.Inter_300Light,
      fontSize: 16,
      lineHeight: 20,
      color: colors.component.input.text,
    },
    iconContainer: {
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 4,
      borderBottomColor: colors.component.input.borderBottom,
      borderBottomWidth: 1,
    },
  });

  return (
    <View style={styles.container}>
      <TextInputReactNative
        ref={componentRef}
        value={value}
        onChangeText={setValue}
        cursorColor={colors.component.input.cursor}
        selectionColor={colors.component.input.selection}
        underlineColorAndroid={colors.component.input.underline}
        placeholderTextColor={colors.component.input.placeholder}
        {...props}
        style={[styles.input, style]}
      />
      {close && !isEmptyString(value) && (
        <Pressable
          style={styles.iconContainer}
          onPress={() => {
            Keyboard.dismiss();
            if (!Keyboard.isVisible()) {
              setValue('');
            }
          }}
        >
          <MaterialIcons
            name="close"
            color={colors.component.input.icon}
            size={24}
          />
        </Pressable>
      )}
    </View>
  );
};

export default TextInput;
