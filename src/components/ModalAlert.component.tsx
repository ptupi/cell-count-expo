import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';

import colorsStyle from '../styles/colors.style';
import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';

interface ModalAlertProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
}

function ModalAlert(props: ModalAlertProps) {
  const { visible, setVisible, title, message } = props;

  const handleClose = () => {
    setVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: colorsStyle.opacity.black50,
    },
    center: {
      width: '90%',
      maxWidth: 340,
      minHeight: 216,
      backgroundColor: colorsStyle.absolutes.white,
      borderRadius: 8,
      padding: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      shadowColor: colorsStyle.absolutes.black,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      lineHeight: 22,
      textAlign: 'left',
      fontFamily: Fonts.Inter_700Bold,
    },
    messageContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 16,
    },
    message: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'left',
      fontFamily: Fonts.Inter_400Regular,
    },
    button: {
      width: '100%',
      height: 56,
      backgroundColor: colorsStyle.buttons,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 16,
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      fontFamily: Fonts.Inter_700Bold,
      color: colorsStyle.absolutes.white,
    },
  });

  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      onDismiss={handleClose}
      animationType="fade"
      transparent
      statusBarTranslucent
    >
      <View style={styles.container}>
        <Pressable style={styles.overlay} onPress={handleClose} />
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <Pressable style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Ok</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default ModalAlert;
