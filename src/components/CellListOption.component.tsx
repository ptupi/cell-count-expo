import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import Pressable from './Pressable.component';
import Text, { Fonts } from './Text.component';
import { Cell } from '../redux/reducers/userReducer';
import { useColors } from '../hooks/useColors';

export type CellListOptionProps = {
  cell: Cell;
  open: boolean;
  onPress: (cell: Cell) => void;
  onPressEdit: (cell: Cell) => void;
  onPressDelete: (cell: Cell) => void;
};

const CellListOption = (props: CellListOptionProps) => {
  const { cell, open, onPress, onPressEdit, onPressDelete } = props;

  const colors = useColors();

  const dotsRotation = useSharedValue(0);
  const animatedDotsRotation = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${dotsRotation.value}deg` }],
  }));
  const buttonPosition = useSharedValue(0);
  const animatedButtonPosition = useAnimatedStyle(() => ({
    transform: [{ translateX: buttonPosition.value }],
  }));

  useEffect(() => {
    dotsRotation.value = withTiming(open ? 90 : 0, {
      duration: 300,
    });
    buttonPosition.value = withTiming(open ? -112 : 0, {
      duration: 300,
    });
  }, [open]);

  const styles = StyleSheet.create({
    mainContainer: {
      justifyContent: 'center',
      marginTop: 16,
    },
    container: {
      paddingVertical: 12,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 16,
      shadowColor: colors.screen.shadow,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      overflow: 'hidden',
      backgroundColor: colors.component.cellListOption.background,
      marginHorizontal: 16,
    },
    orderContainer: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    order: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: Fonts.Inter_700Bold,
      textAlign: 'left',
    },
    nameContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: 4,
    },
    name: {
      fontSize: 14,
      lineHeight: 18,
      fontFamily: Fonts.Inter_300Light,
      textAlign: 'left',
    },
    tag: {
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
    button: {
      position: 'absolute',
      right: 24,
      height: 36,
      width: 36,
      backgroundColor: colors.component.cellListOption.iconContainer,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonEdit: {
      position: 'absolute',
      right: 72,
      height: 36,
      width: 36,
      backgroundColor: colors.component.cellListOption.iconContainer,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.mainContainer}>
      <Pressable style={styles.buttonEdit} onPress={() => onPressEdit(cell)}>
        <MaterialIcons
          name="edit"
          color={colors.component.cellListOption.icon}
          size={24}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={() => onPressDelete(cell)}>
        <MaterialIcons
          name="delete-outline"
          color={colors.component.cellListOption.icon}
          size={24}
        />
      </Pressable>
      <Animated.View style={animatedButtonPosition}>
        <Pressable
          style={styles.container}
          onPress={() => onPress(cell)}
          disabled={cell.type === 'erit'}
        >
          <View style={styles.orderContainer}>
            <Text style={styles.order}>{cell.order}.</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{cell.name}</Text>
            <Text style={styles.tag}>{cell.tag}</Text>
          </View>
          {cell.type !== 'erit' && (
            <Animated.View style={[styles.iconContainer, animatedDotsRotation]}>
              <MaterialIcons
                name="more-vert"
                color={colors.component.cellListOption.iconDot}
                size={24}
              />
            </Animated.View>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default CellListOption;
