import React, { useEffect, useState, useRef } from 'react';
import {
  BackHandler,
  StyleSheet,
  View,
  TextInput as TextInputReactNative,
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

type NewCellNavigationProp = StackNavigationProp<RootStackParamList, 'NewCell'>;
type NewCellRouteProp = RouteProp<RootStackParamList, 'NewCell'>;
type NewCellProps = {
  navigation: NewCellNavigationProp;
  route: NewCellRouteProp;
};

export default function NewCellScreen({ navigation, route }: NewCellProps) {
  const { newCell } = language;
  const { cellList } = route.params;

  const dispatch = useAppDispatch();
  const colors = useColors();

  const [order, setOrder] = useState(cellList.length + 1);
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');

  const nameRef = useRef<TextInputReactNative>(null);
  const tagRef = useRef<TextInputReactNative>(null);

  const [validData, setValidData] = useState(false);
  useEffect(() => {
    const valid =
      cellList.find((cell) => cell.order === order) == null &&
      cellList.find((cell) => cell.name === name) == null &&
      cellList.find((cell) => cell.tag === tag) == null &&
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
    newCustomCellList.push(newCell);
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
        <Header title={newCell.title} onPressBack={goBack} />
        <Text style={styles.desc}>{newCell.desc}</Text>
        <TextInput
          componentRef={nameRef}
          value={name}
          setValue={setName}
          placeholder={newCell.placeName}
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
          placeholder={newCell.placeTag}
          autoCapitalize="words"
        />
      </View>
      <Footer>
        <Button
          title={newCell.save}
          onPress={onPressSave}
          icon="save"
          disabled={!validData}
        />
      </Footer>
    </>
  );
}
