import React from 'react';
import { StyleSheet, Text as TextReactNative, TextProps } from 'react-native';

import { useColors } from '../hooks/useColors';

export enum Fonts {
  Inter_100Thin = 'Inter_100Thin',
  Inter_200ExtraLight = 'Inter_200ExtraLight',
  Inter_300Light = 'Inter_300Light',
  Inter_400Regular = 'Inter_400Regular',
  Inter_500Medium = 'Inter_500Medium',
  Inter_600SemiBold = 'Inter_600SemiBold',
  Inter_700Bold = 'Inter_700Bold',
  Inter_800ExtraBold = 'Inter_800ExtraBold',
  Inter_900Black = 'Inter_900Black',
}

const Text = (props: TextProps) => {
  const colors = useColors();

  const styles = StyleSheet.create({
    text: {
      fontSize: 12,
      color: colors.screen.text,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
    },
  });

  return (
    <TextReactNative
      style={[styles.text, props.style]}
      allowFontScaling={false}
    >
      {props.children}
    </TextReactNative>
  );
};

export default Text;
