import React from 'react';
import {
  Pressable as PressableReactNative,
  PressableProps,
} from 'react-native';

import colorsStyle from '../styles/colors.style';

const Pressable = (props: PressableProps) => {
  return (
    <PressableReactNative
      // android_ripple={{
      //   color: colorsStyle.absolutes.white,
      //   borderless: false,
      //   radius: 18,
      // }}
      android_ripple={undefined}
      {...props}
    >
      {props.children}
    </PressableReactNative>
  );
};

export default Pressable;
