import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../routes/types.route';
import { language } from '../languages';
import colorsStyle from '../styles/colors.style';
import Text from '../components/Text.component';
import Pressable from '../components/Pressable.component';
import metricsStyle from '../styles/metrics.style';

type AlertNavigationProp = StackNavigationProp<RootStackParamList, 'Alert'>;
type AlertRouteProp = RouteProp<RootStackParamList, 'Alert'>;
type AlertProps = { navigation: AlertNavigationProp; route: AlertRouteProp };

export default function AlertScreen({ navigation, route }: AlertProps) {
  const { alert } = language;
  const { title, message } = route.params;

  const closeScreen = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorsStyle.opacity.black50,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
    pressableContainer: {
      position: 'absolute',
      width: metricsStyle.width,
      height: metricsStyle.height,
      top: 0,
      left: 0,
    },
    dialogContainer: {
      width: metricsStyle.width - 70,
      maxWidth: 360,
      maxHeight: 256,
      backgroundColor: colorsStyle.secondaries[0],
      justifyContent: 'flex-start',
      padding: 15,
      borderRadius: 20,
      shadowColor: colorsStyle.absolutes.black,
      shadowOpacity: 0.15,
      shadowRadius: 10,
      shadowOffset: {
        height: 0,
        width: 2,
      },
      elevation: 3,
    },
    title: {
      fontSize: 16,
      fontFamily: 'Raleway_700Bold',
      color: colorsStyle.greys[0],
      textAlign: 'center',
    },
    messageContainer: {
      marginTop: 15,
      marginBottom: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    message: {
      fontSize: 14,
      color: colorsStyle.greys[0],
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      height: 40,
      width: '45%',
      marginHorizontal: 5,
      backgroundColor: colorsStyle.secondaries[2],
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    buttonSecondary: {
      backgroundColor: colorsStyle.absolutes.transparent,
      borderWidth: 1,
      borderColor: colorsStyle.secondaries[2],
    },
    buttonText: {
      fontSize: 14,
      color: colorsStyle.secondaryText,
    },
    buttonTextSecondary: {
      color: colorsStyle.secondaries[2],
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressableContainer}
        android_ripple={undefined}
        onPress={closeScreen}
      />
      <View style={styles.dialogContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={closeScreen}
            android_ripple={undefined}
          >
            <Text style={styles.buttonText}>{alert.done}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
