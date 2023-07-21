import React, { useState, useEffect, useRef } from 'react';
import {
  BackHandler,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { language } from '../languages';
import { RootStackParamList } from '../routes/types.route';
import colorsStyle from '../styles/colors.style';
import Header from '../components/Header.component';
import { useAppDispatch, useAppSelector } from '../redux';
import Text, { Fonts } from '../components/Text.component';
import Footer from '../components/Footer.component';
import Button from '../components/Button.component';
import { Cell, CellResult } from '../redux/reducers/userReducer';
import {
  setConfirmHandleConfirm,
  setConfirmMessage,
  setConfirmTitle,
  setConfirmVisible,
} from '../redux/reducers/confirmReducer';
import CellCount from '../components/CellCount.component';

type CountNavigationProp = StackNavigationProp<RootStackParamList, 'Count'>;
type CountRouteProp = RouteProp<RootStackParamList, 'Count'>;
type CountProps = { navigation: CountNavigationProp; route: CountRouteProp };

export default function CountScreen({ navigation, route }: CountProps) {
  const { count } = language;
  const { maxCount, leu } = route.params;

  const dispatch = useAppDispatch();
  const { stdCellList, customCellList } = useAppSelector((state) => state.user);

  const [cellList, setCellList] = useState([] as Cell[]);
  const [currentCount, setCurrentCount] = useState([] as Cell[]);
  const [cellCount, setCellCount] = useState(0);
  const [eritCount, setEritCount] = useState(0);

  const flatRef = useRef<FlatList>(null);

  const [validData, setValidData] = useState(false);
  useEffect(() => {
    const currentValidCount = currentCount.filter(
      (cell) => cell.type !== 'erit'
    );
    setCellCount(currentValidCount.length);
    setEritCount(currentCount.length - currentValidCount.length);
    const valid = currentValidCount.length === maxCount.value;
    setValidData(valid);
  }, [currentCount]);

  useEffect(() => {
    if (customCellList != null && customCellList.length > 0) {
      const sortedCustomList = [...customCellList].sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else if (a.order < b.order) {
          return -1;
        }
        return 0;
      });
      setCellList(sortedCustomList);
    } else {
      const sortedStdList = [...stdCellList].sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else if (a.order < b.order) {
          return -1;
        }
        return 0;
      });
      setCellList(sortedStdList);
    }
  }, [customCellList]);

  const goBack = () => {
    navigation.goBack();
  };

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

  const onCountCell = (cell: Cell) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newCurrentCount = [...currentCount];
    newCurrentCount.push(cell);
    setCurrentCount(newCurrentCount);
  };

  const onConfirmEnd = () => {
    // Calculate report
    const eritCount = currentCount.filter(
      (cell) => cell.type === 'erit'
    ).length;
    const normalCount = currentCount.length - eritCount;
    const globalCount = (Number(leu) * normalCount) / (normalCount + eritCount);
    const cellResultList: CellResult[] = [];
    cellList
      .filter((cell) => cell.type !== 'erit')
      .forEach((element) => {
        const cellCount = currentCount.filter(
          (cell) => cell.name === element.name && cell.tag === element.tag
        ).length;
        cellResultList.push({
          ...element,
          relative: ((cellCount / Number(maxCount.value)) * 100)
            .toFixed(2)
            .replace('.00', ''),
          absolute: (globalCount * (cellCount / Number(maxCount.value)))
            .toFixed(2)
            .replace('.00', ''),
        });
      });
    navigation.navigate('Report', {
      maxCount,
      leu,
      eritCount,
      globalCount: globalCount.toFixed(2).replace('.00', ''),
      cellResultList: cellResultList.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else if (a.order < b.order) {
          return -1;
        }
        return 0;
      }),
    });
  };

  const onPressEndCount = () => {
    dispatch(setConfirmTitle(count.endTitle));
    dispatch(setConfirmMessage(count.endMsg));
    dispatch(setConfirmHandleConfirm(onConfirmEnd));
    dispatch(setConfirmVisible(true));
  };

  const onConfirmReset = () => {
    setCurrentCount([]);
  };

  const onPressReset = () => {
    dispatch(setConfirmTitle(count.resetTitle));
    dispatch(setConfirmMessage(count.resetMsg));
    dispatch(setConfirmHandleConfirm(onConfirmReset));
    dispatch(setConfirmVisible(true));
  };

  const onPressUndo = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newCurrentCount = [...currentCount];
    newCurrentCount.splice(currentCount.length - 1, 1);
    setCurrentCount(newCurrentCount);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorsStyle.absolutes.white,
    },
    desc: {
      marginTop: 16,
      marginHorizontal: 16,
      fontFamily: Fonts.Inter_400Regular,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'left',
    },
    flatList: {
      marginTop: 16,
    },
    flatListContent: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actions: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    action: {
      marginHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginBottom: 8,
      width: 44,
      height: 44,
      borderRadius: 29,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorsStyle.absolutes.white,
      shadowColor: colorsStyle.absolutes.black,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    iconDisabled: {
      backgroundColor: colorsStyle.greys[3],
    },
    iconText: {
      fontFamily: Fonts.Inter_300Light,
      fontSize: 12,
      lineHeight: 16,
      textAlign: 'center',
      color: colorsStyle.absolutes.black,
    },
    textDisabled: {
      opacity: 0.4,
    },
    descErit: {
      marginTop: 16,
      marginHorizontal: 16,
      fontFamily: Fonts.Inter_300Light,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'left',
      color: colorsStyle.absolutes.black,
    },
    descCell: {
      marginTop: 4,
      marginHorizontal: 16,
      fontFamily: Fonts.Inter_300Light,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'left',
      color: colorsStyle.absolutes.black,
    },
    valueCell: {
      fontFamily: Fonts.Inter_700Bold,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'left',
      color: colorsStyle.absolutes.black,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Header title={count.title} onPressBack={goBack} />
        <Text style={styles.desc}>{count.desc}</Text>
        <Text style={styles.descErit}>
          {count.descErit}
          <Text style={styles.valueCell}>{eritCount}</Text>
        </Text>
        <Text style={styles.descCell}>
          {count.descCell}
          <Text style={styles.valueCell}>
            {cellCount
              .toString()
              .padStart(maxCount.value.toString().length, '0')}
          </Text>
          /{maxCount.value}
        </Text>
        <FlatList
          ref={flatRef}
          data={cellList}
          renderItem={({ item }: { item: Cell }) => (
            <CellCount
              cell={item}
              onPress={onCountCell}
              currentCount={currentCount}
              disabled={validData}
            />
          )}
          keyExtractor={(item) => item.order.toString()}
          overScrollMode="never"
          numColumns={4}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          ListFooterComponent={
            <>
              <View style={{ marginTop: 24 }} />
              <View style={styles.actions}>
                <Pressable
                  style={styles.action}
                  onPress={onPressReset}
                  disabled={currentCount.length === 0}
                >
                  <View
                    style={[
                      styles.icon,
                      currentCount.length === 0 && styles.iconDisabled,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="restore"
                      color={
                        currentCount.length === 0
                          ? colorsStyle.greys[2]
                          : colorsStyle.absolutes.black
                      }
                      size={24}
                    />
                  </View>
                  <Text
                    style={[
                      styles.iconText,
                      currentCount.length === 0 && styles.textDisabled,
                    ]}
                  >
                    {count.reset}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.action}
                  onPress={onPressUndo}
                  disabled={currentCount.length === 0}
                >
                  <View
                    style={[
                      styles.icon,
                      currentCount.length === 0 && styles.iconDisabled,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="undo"
                      color={
                        currentCount.length === 0
                          ? colorsStyle.greys[2]
                          : colorsStyle.absolutes.black
                      }
                      size={24}
                    />
                  </View>
                  <Text
                    style={[
                      styles.iconText,
                      currentCount.length === 0 && styles.textDisabled,
                    ]}
                  >
                    {count.undo}
                  </Text>
                </Pressable>
              </View>
              <View style={{ marginTop: 16 }} />
            </>
          }
        />
      </View>
      <Footer>
        <Button
          title={count.end}
          onPress={onPressEndCount}
          disabled={!validData}
        />
      </Footer>
    </>
  );
}
