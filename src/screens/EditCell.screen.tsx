import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  StyleSheet,
  TextInput as TextInputReactNative,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';

import { language } from '../languages';
import { RootStackParamList } from '../routes/types.route';
import Header from '../components/Header.component';
import { Cell, setCustomCellList } from '../redux/reducers/userReducer';
import Text, { Fonts } from '../components/Text.component';
import Footer from '../components/Footer.component';
import Button from '../components/Button.component';
import TextInput from '../components/TextInput.component';
import { isEmptyString } from '../utils/validator.utils';
import { useAppDispatch } from '../redux';
import { useColors } from '../hooks/useColors';

type EditCellNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditCell'
>;
type EditCellRouteProp = RouteProp<RootStackParamList, 'EditCell'>;
type EditCellProps = {
  navigation: EditCellNavigationProp;
  route: EditCellRouteProp;
};

export default function EditCellScreen({ navigation, route }: EditCellProps) {
  const { editCell } = language;
  const { cell, cellList } = route.params;

  const dispatch = useAppDispatch();
  const colors = useColors();

  const [order, setOrder] = useState(cell.order);
  const [name, setName] = useState(cell.name);
  const [tag, setTag] = useState(cell.tag);

  const nameRef = useRef<TextInputReactNative>(null);
  const tagRef = useRef<TextInputReactNative>(null);

  const [validData, setValidData] = useState(false);
  useEffect(() => {
    const valid =
      (order !== cell.order || name !== cell.name || tag !== cell.tag) &&
      !isEmptyString(order.toString()) &&
      !isEmptyString(name) &&
      !isEmptyString(tag);
    setValidData(valid);
  }, [order, name, tag]);

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

  const onPressSave = () => {
    const newCell: Cell = {
      order,
      name,
      tag,
    };
    const newCustomCellList = [...cellList];
    const indexToChange = cellList.findIndex(
      (item) => item.order === cell.order
    );
    newCustomCellList[indexToChange] = newCell;
    dispatch(setCustomCellList(newCustomCellList));
    goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen.background,
    },
    desc: {
      marginTop: 16,
      marginHorizontal: 16,
      fontFamily: Fonts.Inter_400Regular,
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'left',
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Header title={editCell.title} onPressBack={goBack} />
        <Text style={styles.desc}>{editCell.desc}</Text>
        <TextInput
          componentRef={nameRef}
          value={name}
          setValue={setName}
          returnKeyType="next"
          autoCapitalize="words"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            tagRef.current.focus();
          }}
        />
        <TextInput
          componentRef={tagRef}
          value={tag}
          setValue={setTag}
          autoCapitalize="words"
        />
      </View>
      <Footer>
        <Button
          title={editCell.save}
          onPress={onPressSave}
          icon="save"
          disabled={!validData}
        />
      </Footer>
    </>
  );
}
