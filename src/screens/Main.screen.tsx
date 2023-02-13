import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { language } from '../languages';
import { RootStackParamList } from '../routes/types.route';
import colorsStyle from '../styles/colors.style';
import Text, { Fonts } from '../components/Text.component';
import Pressable from '../components/Pressable.component';

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
      backgroundColor: colorsStyle.absolutes.white,
    },
    headerContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerTextContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    headerMainText: {
      fontSize: 40,
      lineHeight: 44,
      textAlign: 'left',
      fontFamily: Fonts.Inter_700Bold,
    },
    headerText: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'left',
    },
    headerIconContainer: {
      height: '100%',
      width: 32,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    iconContainer: {
      height: 36,
      width: 36,
      borderRadius: 18,
      backgroundColor: colorsStyle.opacity.red25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerGradient: {
      height: 4,
      marginHorizontal: 16,
    },
    pageContainer: {
      marginTop: 32,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingHorizontal: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerMainText}>{main.title}</Text>
          <Text style={styles.headerText}>{main.subtitle}</Text>
        </View>
        <View style={styles.headerIconContainer}>
          <Pressable style={styles.iconContainer} onPress={() => {}}>
            <MaterialIcons
              name="settings"
              color={colorsStyle.absolutes.black}
              size={24}
            />
          </Pressable>
        </View>
      </View>
      <LinearGradient
        colors={[colorsStyle.absolutes.white, colorsStyle.absolutes.red]}
        style={styles.headerGradient}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
      />
      <View style={styles.pageContainer}>
        <Text style={styles.headerText}>{main.data}</Text>
      </View>
    </View>
  );
}
