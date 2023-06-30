import React, { useState, useEffect } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';

import { language } from '../languages';
import { RootStackParamList } from '../routes/types.route';
import colorsStyle from '../styles/colors.style';
import Header from '../components/Header.component';
import { useAppDispatch, useAppSelector } from '../redux';
import Footer from '../components/Footer.component';
import Button from '../components/Button.component';
import { Cell } from '../redux/reducers/userReducer';
import {
  setConfirmHandleConfirm,
  setConfirmMessage,
  setConfirmTitle,
  setConfirmVisible,
} from '../redux/reducers/confirmReducer';

type ReportNavigationProp = StackNavigationProp<RootStackParamList, 'Report'>;
type ReportRouteProp = RouteProp<RootStackParamList, 'Report'>;
type ReportProps = { navigation: ReportNavigationProp; route: ReportRouteProp };

export default function CountScreen({ navigation, route }: ReportProps) {
  const { report } = language;
  const { maxCount, leu, currentCount } = route.params;

  const dispatch = useAppDispatch();
  const { stdCellList, customCellList } = useAppSelector((state) => state.user);

  const [cellList, setCellList] = useState([] as Cell[]);

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

  const onConfirmEnd = () => {
    navigation.navigate('Main');
  };

  const onPressEndCount = () => {
    dispatch(setConfirmTitle(report.endTitle));
    dispatch(setConfirmMessage(report.endMsg));
    dispatch(setConfirmHandleConfirm(onConfirmEnd));
    dispatch(setConfirmVisible(true));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorsStyle.absolutes.white,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Header title={report.title} onPressBack={goBack} icon="share" />
      </View>
      <Footer>
        <Button title={report.end} onPress={onPressEndCount} />
      </Footer>
    </>
  );
}
