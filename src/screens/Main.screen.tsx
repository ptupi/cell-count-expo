import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { RootStackParamList } from '../routes/types.route';
import { language } from '../languages';
import colorsStyle from '../styles/colors.style';
import Text from '../components/Text.component';

type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
type MainProps = { navigation: MainNavigationProp };

export default function MainScreen({ navigation }: MainProps) {
  const { main } = language;

  const handleBackButton = () => {
    return true; // OVERRIDE BACK BUTTON EVENTO PADRAO
  };

  useFocusEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton
    );
    return () => {
      subscription.remove();
    };
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorsStyle.primaries[7],
    },
  });

  return (
    <View style={styles.container}>
      <Text>{main.title}</Text>
    </View>
  );
}
