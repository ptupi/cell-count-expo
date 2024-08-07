import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  ViewProps,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';
import { useColors } from '../hooks/useColors';

export type PickerOption = {
  id: string | number;
  label: string;
  value: string | number;
  sublabel?: string;
};

export type PickerProps = {
  visible: boolean;
  setVisible: (
    visible: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  placeholder: string;
  options: PickerOption[];
  selected: PickerOption;
  setSelected: (
    pickerOption: PickerOption
  ) => void | React.Dispatch<React.SetStateAction<PickerOption>>;
  title: string;
  disabled?: boolean;
  loading?: boolean;
};

const Picker = (props: PickerProps & ViewProps) => {
  const {
    visible,
    setVisible,
    placeholder,
    options,
    selected,
    setSelected,
    title,
    disabled,
    loading,
    children,
  } = props;

  const colors = useColors();

  const handleOpenPicker = () => {
    setVisible(true);
  };

  const handleSelectItem = (value: PickerOption) => {
    setSelected(value);
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      marginTop: 16,
      alignItems: 'flex-start',
    },
    placeholder: {
      fontSize: 14,
      lineHeight: 18,
      fontFamily: Fonts.Inter_300Light,
      textAlign: 'left',
    },
    container: {
      paddingVertical: 12,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 8,
      shadowColor: colors.screen.shadow,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      overflow: 'hidden',
      backgroundColor: colors.component.picker.background,
      marginHorizontal: 16,
      paddingHorizontal: 4,
    },
    nameContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: 12,
    },
    name: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: Fonts.Inter_300Light,
      textAlign: 'left',
    },
    iconContainer: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 4,
    },
    modal: {
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
      maxHeight: '50%',
      backgroundColor: colors.screen.background,
      borderRadius: 8,
      shadowColor: colors.screen.shadow,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      overflow: 'hidden',
    },
    pickerHeader: {
      width: '100%',
      height: 62,
      paddingHorizontal: 8,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      lineHeight: 22,
      textAlign: 'center',
      fontFamily: Fonts.Inter_700Bold,
    },
    headerGradient: {
      width: '100%',
      height: 4,
    },
    pickerItem: {
      marginTop: 4,
      paddingHorizontal: 16,
      width: '100%',
      height: 48,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    selectedPickerItem: {
      backgroundColor: colors.component.picker.selected,
    },
    pickerItemLabel: {
      fontSize: 18,
      lineHeight: 22,
      textAlign: 'left',
      fontFamily: Fonts.Inter_300Light,
    },
    selectedPickerItemLabel: {
      fontFamily: Fonts.Inter_700Bold,
    },
  });

  return (
    <>
      <Pressable style={styles.mainContainer} onPress={handleOpenPicker}>
        {/* <Text style={styles.placeholder}>{selected != null ? placeholder : null}</Text> */}
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {selected != null ? selected.label : placeholder}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="keyboard-arrow-down"
              color={colors.screen.text}
              size={24}
            />
          </View>
        </View>
      </Pressable>
      <Modal
        visible={visible}
        onRequestClose={handleClose}
        onDismiss={handleClose}
        animationType="fade"
        transparent
        statusBarTranslucent
      >
        <View style={styles.modal}>
          <Pressable style={styles.overlay} onPress={handleClose} />
          <View style={styles.center}>
            <View style={styles.pickerHeader}>
              <View style={styles.iconContainer} />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <Pressable style={styles.iconContainer} onPress={handleClose}>
                <MaterialIcons
                  name="close"
                  color={colors.screen.text}
                  size={24}
                />
              </Pressable>
            </View>
            <LinearGradient
              colors={[
                colors.component.gradient.gradientStart,
                colors.component.gradient.gradientEnd,
              ]}
              style={styles.headerGradient}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
            />
            <ScrollView
              overScrollMode="never"
              showsVerticalScrollIndicator={false}
            >
              {options.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleSelectItem(item)}
                  style={[
                    styles.pickerItem,
                    selected?.id === item.id && styles.selectedPickerItem,
                  ]}
                  activeOpacity={0.4}
                >
                  <Text
                    style={[
                      styles.pickerItemLabel,
                      selected?.id === item.id &&
                        styles.selectedPickerItemLabel,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Picker;
