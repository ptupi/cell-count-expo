import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colorsStyle from '../styles/colors.style';
import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';

export type SettingsOptionProps = {
  name: string;
  icon: any;
  onPress: () => void;
};

const SettingsOption = (props: SettingsOptionProps) => {
  const { name, icon, onPress } = props;

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: 4,
    },
    name: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: Fonts.Inter_300Light,
    },
  });

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} color={colorsStyle.icons} size={18} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default SettingsOption;
