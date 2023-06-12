import React from 'react';
import {
  StyleSheet,
  TextInput as TextInputReactNative,
  TextInputProps,
  View,
} from 'react-native';

import colorsStyle from '../styles/colors.style';
import { Fonts } from './Text.component';

interface CustomInputProps {
  componentRef?: React.Ref<TextInputReactNative>;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput = (props: CustomInputProps & TextInputProps) => {
  const { componentRef, value, setValue, style } = props;

  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
      marginHorizontal: 16,
      height: 44,
    },
    input: {
      flex: 1,
      textAlign: 'left',
      borderBottomColor: colorsStyle.greys[5],
      borderBottomWidth: 1,
      fontFamily: Fonts.Inter_300Light,
      fontSize: 16,
      lineHeight: 20,
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
    </View>
  );
};

export default TextInput;
