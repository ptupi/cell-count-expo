import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colorsStyle from '../styles/colors.style';
import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';
import { LinearGradient } from 'expo-linear-gradient';

export type HeaderProps = {
  title: string;
  onPressBack: () => void;
};

const Header = (props: HeaderProps) => {
  const { title, onPressBack } = props;

  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      height: 85,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    iconContainer: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      lineHeight: 24,
      textAlign: 'center',
      fontFamily: Fonts.Inter_700Bold,
      color: colorsStyle.icons,
    },
    headerGradient: {
      height: 4,
      marginHorizontal: 16,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.iconContainer} onPress={onPressBack}>
          <MaterialIcons
            name="chevron-left"
            color={colorsStyle.icons}
            size={32}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.iconContainer} />
      </View>
      <LinearGradient
        colors={[colorsStyle.absolutes.white, colorsStyle.absolutes.red]}
        style={styles.headerGradient}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
      />
    </>
  );
};

export default Header;
