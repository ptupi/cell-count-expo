import React, { useState, useEffect, useRef } from 'react';
import {
  BackHandler,
  StyleSheet,
  View,
  TextInput as TextInputReactNative,
  Keyboard,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { language } from '../languages';
import { RootStackParamList } from '../routes/types.route';
import colorsStyle from '../styles/colors.style';
import Header from '../components/Header.component';
import { useAppDispatch } from '../redux';
import Text, { Fonts } from '../components/Text.component';
import Picker, { PickerOption } from '../components/Picker.component';
import Footer from '../components/Footer.component';
import Button from '../components/Button.component';
import TextInput from '../components/TextInput.component';
import { maskOnlyNumbers } from '../utils/masks.utils';

type CountSetupNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CountSetup'
>;
type CountSetupProps = { navigation: CountSetupNavigationProp };

export default function CountSetupScreen({ navigation }: CountSetupProps) {
  const MAX_COUNT: PickerOption[] = [
    // {
    //   id: 999,
    //   label: '10 células',
    //   value: 10,
    // },
    {
      id: 0,
      label: '100 células',
      value: 100,
    },
    {
      id: 1,
      label: '200 células',
      value: 200,
    },
    {
      id: 2,
      label: '300 células',
      value: 300,
    },
    {
      id: 3,
      label: '400 células',
      value: 400,
    },
    {
      id: 4,
      label: '500 células',
      value: 500,
    },
    {
      id: 5,
      label: '600 células',
      value: 600,
    },
    {
      id: 6,
      label: '700 células',
      value: 700,
    },
    {
      id: 7,
      label: '800 células',
      value: 800,
    },
    {
      id: 8,
      label: '900 células',
      value: 900,
    },
    {
      id: 9,
      label: '1000 células',
      value: 1000,
    },
  ];

  const { countSetup } = language;

  const dispatch = useAppDispatch();

  const [maxCountVisible, setMaxCountVisible] = useState(false);
  const [maxCount, setMaxCount] = useState(null as PickerOption);
  const [leu, setLeu] = useState(null as string);

  const leuRef = useRef<TextInputReactNative>(null);

  const [validData, setValidData] = useState(false);
  useEffect(() => {
    const valid = maxCount != null && Number(leu) >= 100;
    setValidData(valid);
  }, [maxCount, leu]);

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

  const onPressStartCount = () => {
    navigation.navigate('Count', { maxCount, leu: Number(leu) });
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
  });

  return (
    <>
      <View style={styles.container}>
        <Header title={countSetup.title} onPressBack={goBack} />
        <Text style={styles.desc}>{countSetup.desc}</Text>
        <Picker
          visible={maxCountVisible}
          setVisible={setMaxCountVisible}
          placeholder={countSetup.maxCount}
          options={MAX_COUNT}
          selected={maxCount}
          setSelected={setMaxCount}
          title={countSetup.maxCountTitle}
        />
        <TextInput
          componentRef={leuRef}
          placeholder={countSetup.totalLeu}
          value={leu}
          setValue={(value: string) => {
            setLeu(maskOnlyNumbers(value));
          }}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={8}
          blurOnSubmit
          onEndEditing={() => {
            Keyboard.dismiss();
          }}
          close
        />
      </View>
      <Footer>
        <Button
          title={countSetup.start}
          onPress={onPressStartCount}
          disabled={!validData}
        />
      </Footer>
    </>
  );
}
