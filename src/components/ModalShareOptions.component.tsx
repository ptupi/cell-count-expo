import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';
import { language } from '../languages';
import colorsStyle from '../styles/colors.style';

interface ModalShareOptionsProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleApp: () => void;
  handleImage: () => void;
  handlePdf: () => void;
  handleExcel: () => void;
}

function ModalShareOptions(props: ModalShareOptionsProps) {
  const { shareOptions } = language;

  const {
    visible,
    setVisible,
    handleApp,
    handleImage,
    handlePdf,
    handleExcel,
  } = props;

  const handleClose = () => {
    setVisible(false);
  };

  const onPressOption = (type: 'app' | 'img' | 'pdf' | 'exc') => {
    handleClose();
    switch (type) {
      case 'app':
        handleApp();
        break;
      case 'img':
        handleImage();
        break;
      case 'pdf':
        handlePdf();
        break;
      case 'exc':
        handleExcel();
        break;
      default:
        break;
    }
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
      backgroundColor: colorsStyle.absolutes.white,
      borderRadius: 8,
      padding: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      shadowColor: colorsStyle.absolutes.black,
      shadowOpacity: 0.15,
      shadowRadius: 10,
      shadowOffset: {
        height: 0,
        width: 2,
      },
      elevation: 3,
    },
    optionContainer: {
      width: '100%',
      height: 44,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    optionTextContainer: {
      marginLeft: 8,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    optionText: {
      fontSize: 18,
      lineHeight: 22,
      textAlign: 'left',
      fontFamily: Fonts.Inter_300Light,
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
          <Pressable
            style={styles.optionContainer}
            onPress={() => onPressOption('app')}
          >
            <MaterialCommunityIcons
              name="share"
              size={24}
              color={colorsStyle.icons}
            />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>{shareOptions.app}</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.optionContainer}
            onPress={() => onPressOption('img')}
          >
            <MaterialCommunityIcons
              name="image-outline"
              size={24}
              color={colorsStyle.icons}
            />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>{shareOptions.image}</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.optionContainer}
            onPress={() => onPressOption('pdf')}
          >
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={24}
              color={colorsStyle.icons}
            />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>{shareOptions.pdf}</Text>
            </View>
          </Pressable>
          {/* <Pressable
            style={styles.optionContainer}
            onPress={() => onPressOption('exc')}
          >
            <MaterialCommunityIcons
              name="file-excel-box"
              size={24}
              color={colorsStyle.icons}
            />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>{shareOptions.excel}</Text>
            </View>
          </Pressable> */}
        </View>
      </View>
    </Modal>
  );
}

export default ModalShareOptions;
