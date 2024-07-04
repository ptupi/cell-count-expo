import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';

import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';
import { useColors } from '../hooks/useColors';

interface ModalConfirmProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  handleConfirm: () => void;
}

function ModalConfirm(props: ModalConfirmProps) {
  const { visible, setVisible, title, message, handleConfirm } = props;

  const colors = useColors();

  const handleClose = () => {
    setVisible(false);
  };

  const localHandleConfirm = () => {
    setVisible(false);
    handleConfirm();
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
      backgroundColor: colors.screen.overlay,
    },
    center: {
      width: '90%',
      maxWidth: 340,
      minHeight: 216,
      backgroundColor: colors.screen.background,
      borderRadius: 8,
      padding: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      shadowColor: colors.screen.shadow,
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
    actionsContainer: {
      marginTop: 16,
      width: '100%',
      height: 56,
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      height: 56,
      backgroundColor: colors.component.button.primary.active,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginRight: 8,
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      fontFamily: Fonts.Inter_700Bold,
      color: colors.component.button.primary.text,
    },
    buttonConfirm: {
      flex: 1,
      height: 56,
      backgroundColor: colors.component.button.secondary.active,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.component.button.secondary.text,
      marginLeft: 8,
    },
    buttonConfirmText: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      fontFamily: Fonts.Inter_700Bold,
      color: colors.component.button.secondary.text,
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
          <View style={styles.actionsContainer}>
            <Pressable style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>Não</Text>
            </Pressable>
            <Pressable
              style={styles.buttonConfirm}
              onPress={localHandleConfirm}
            >
              <Text style={styles.buttonConfirmText}>Sim</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalConfirm;
