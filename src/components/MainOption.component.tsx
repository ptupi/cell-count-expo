import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import colorsStyle from '../styles/colors.style';
import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';

export type MainOptionProps = {
  name: string;
  imageUrl: string;
  onPress: () => void;
};

const MainOption = (props: MainOptionProps) => {
  const { name, imageUrl, onPress } = props;

  const styles = StyleSheet.create({
    container: {
      width: 160,
      height: 130,
      backgroundColor: colorsStyle.absolutes.white,
      borderRadius: 8,
      shadowColor: colorsStyle.absolutes.black,
      shadowOpacity: 0.15,
      shadowRadius: 10,
      shadowOffset: {
        height: 0,
        width: 2,
      },
      elevation: 3,
      overflow: 'hidden',
      margin: 12,
    },
    image: {
      flex: 1,
    },
    footer: {
      width: '100%',
      height: 42,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: Fonts.Inter_300Light,
    },
  });

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: imageUrl }}
      />
      <View style={styles.footer}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default MainOption;
