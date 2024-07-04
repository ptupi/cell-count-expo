import React, { useEffect, useState, useRef } from 'react';
import { BackHandler, FlatList, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { language } from '../languages';
import { RootStackParamList } from '../routes/types.route';
import Header from '../components/Header.component';
import { useAppDispatch, useAppSelector } from '../redux';
import CellListOption from '../components/CellListOption.component';
import { Cell, setCustomCellList } from '../redux/reducers/userReducer';
import {
  setConfirmHandleConfirm,
  setConfirmMessage,
  setConfirmTitle,
  setConfirmVisible,
} from '../redux/reducers/confirmReducer';
import Pressable from '../components/Pressable.component';
import Text, { Fonts } from '../components/Text.component';
import { useColors } from '../hooks/useColors';

type EditCellsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditCells'
>;
type EditCellsProps = { navigation: EditCellsNavigationProp };

export default function EditCellsScreen({ navigation }: EditCellsProps) {
  const { editCells } = language;

  const dispatch = useAppDispatch();
  const { stdCellList, customCellList } = useAppSelector((state) => state.user);
  const colors = useColors();

  const [cellList, setCellList] = useState([] as Cell[]);
  const [selectedCell, setSelectedCell] = useState({} as Cell);

  const flatRef = useRef<FlatList>(null);

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
    goBack();
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

  const onPressCell = (item: Cell) => {
    if (item.order === selectedCell.order) {
      setSelectedCell({} as Cell);
    } else {
      setSelectedCell(item);
    }
  };

  const onConfirmDelete = (item: Cell) => {
    const newCustomCellList = [...cellList];
    const indexToSplice = cellList.findIndex(
      (cell) => cell.order === item.order
    );
    newCustomCellList.splice(indexToSplice, 1);
    const translatedCustomCellList = [...newCustomCellList];
    newCustomCellList.forEach((cell, index) => {
      translatedCustomCellList[index] = {
        ...translatedCustomCellList[index],
        order: index + 1,
      };
    });
    dispatch(setCustomCellList(translatedCustomCellList));
  };

  const onPressDelete = (item: Cell) => {
    setSelectedCell({} as Cell);
    dispatch(setConfirmTitle(editCells.deleteTitle));
    dispatch(
      setConfirmMessage(editCells.deleteMessage.replace('{{name}}', item.name))
    );
    dispatch(setConfirmHandleConfirm(() => onConfirmDelete(item)));
    dispatch(setConfirmVisible(true));
  };

  const onConfirmStandard = () => {
    dispatch(setCustomCellList([]));
  };

  const onPressStandard = () => {
    setSelectedCell({} as Cell);
    dispatch(setConfirmTitle(editCells.standardTitle));
    dispatch(setConfirmMessage(editCells.standardMessage));
    dispatch(setConfirmHandleConfirm(onConfirmStandard));
    dispatch(setConfirmVisible(true));
  };

  const onPressEdit = (item: Cell) => {
    setSelectedCell({} as Cell);
    navigation.navigate('EditCell', { cell: item, cellList });
  };

  const onPressAdd = () => {
    setSelectedCell({} as Cell);
    navigation.navigate('NewCell', { cellList });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen.background,
    },
    pressable: {
      height: 36,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    pressableText: {
      marginLeft: 4,
      fontSize: 14,
      lineHeight: 18,
      textAlign: 'center',
      fontFamily: Fonts.Inter_300Light,
      color: colors.screen.text,
      textDecorationLine: 'underline',
    },
  });

  return (
    <View style={styles.container}>
      <Header
        title={editCells.title}
        onPressBack={goBack}
        icon="add"
        onPressIcon={onPressAdd}
      />
      <FlatList
        ref={flatRef}
        data={cellList}
        renderItem={({ item }) => (
          <CellListOption
            cell={item}
            open={selectedCell.order === item.order}
            onPress={onPressCell}
            onPressEdit={onPressEdit}
            onPressDelete={onPressDelete}
          />
        )}
        keyExtractor={(item) => item.order.toString()}
        ListFooterComponent={
          <>
            <View style={{ marginTop: 16 }} />
            <Pressable style={styles.pressable} onPress={onPressStandard}>
              <MaterialCommunityIcons
                name="restore"
                color={colors.screen.editCells.icon}
                size={18}
              />
              <Text style={styles.pressableText}>{editCells.standard}</Text>
            </Pressable>
          </>
        }
        overScrollMode="never"
      />
    </View>
  );
}
