import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';

import { language } from '../languages';
import { RootStackParamList } from '../routes/types.route';
import colorsStyle from '../styles/colors.style';
import Header from '../components/Header.component';
import CellListOption from '../components/CellListOption.component';
import { Cell } from '../redux/reducers/userReducer';
import Pressable from '../components/Pressable.component';
import Text, { Fonts } from '../components/Text.component';
import Footer from '../components/Footer.component';
import Button from '../components/Button.component';

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
  const { cell } = route.params;

  const [order, setOrder] = useState(cell.order);
  const [name, setName] = useState(cell.name);
  const [tag, setTag] = useState(cell.tag);

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

  const onPressSave = () => {};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorsStyle.absolutes.white,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Header title={editCell.title} onPressBack={goBack} />
      </View>
      <Footer>
        <Button title="Salvar alterações" onPress={onPressSave} icon="save" />
      </Footer>
    </>
  );
}
