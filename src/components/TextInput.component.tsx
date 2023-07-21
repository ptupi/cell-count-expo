import React from 'react';
import {
  StyleSheet,
  TextInput as TextInputReactNative,
  TextInputProps,
  View,
  Keyboard,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colorsStyle from '../styles/colors.style';
import { Fonts } from './Text.component';
import Pressable from './Pressable.component';
import { isEmptyString } from '../utils/validator.utils';

interface CustomInputProps {
  componentRef?: React.Ref<TextInputReactNative>;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  close?: boolean;
}

const TextInput = (props: CustomInputProps & TextInputProps) => {
  const { componentRef, value, setValue, style, close } = props;

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
      borderBottomColor: colorsStyle.greys[3],
      borderBottomWidth: 1,
      fontFamily: Fonts.Inter_300Light,
      fontSize: 16,
      lineHeight: 20,
    },
    iconContainer: {
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 4,
      borderBottomColor: colorsStyle.greys[3],
      borderBottomWidth: 1,
    },
  });

  return (
    <View style={styles.container}>
      <TextInputReactNative
        ref={componentRef}
        value={value}
        onChangeText={setValue}
        cursorColor={colorsStyle.opacity.black50}
        selectionColor={colorsStyle.opacity.black50}
        underlineColorAndroid={colorsStyle.absolutes.transparent}
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
          <MaterialIcons name="close" color={colorsStyle.icons} size={24} />
        </Pressable>
      )}
    </View>
  );
};

export default TextInput;
