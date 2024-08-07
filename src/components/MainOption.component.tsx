import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';
import { useColors } from '../hooks/useColors';

export type MainOptionProps = {
  name: string;
  imageUrl: string;
  onPress: () => void;
  active?: boolean;
};

const MainOption = (props: MainOptionProps) => {
  const { name, imageUrl, onPress } = props;

  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      width: 160,
      height: 130,
      backgroundColor: colors.component.mainOption.background,
      borderRadius: 8,
      shadowColor: colors.screen.shadow,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
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
