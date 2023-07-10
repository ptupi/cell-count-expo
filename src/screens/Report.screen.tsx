import React, { useState, useEffect } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
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
import Text, { Fonts } from '../components/Text.component';

type ReportNavigationProp = StackNavigationProp<RootStackParamList, 'Report'>;
type ReportRouteProp = RouteProp<RootStackParamList, 'Report'>;
type ReportProps = { navigation: ReportNavigationProp; route: ReportRouteProp };

export default function CountScreen({ navigation, route }: ReportProps) {
  const { report } = language;
  const { maxCount, leu, eritCount, globalCount, cellResultList } =
    route.params;

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
    headerSpace: {
      marginTop: 20,
    },
    rowContainer: {
      height: 36,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 4,
    },
    mainDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    mainData: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'left',
      fontFamily: Fonts.Inter_300Light,
    },
    dataContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    data: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'right',
      fontFamily: Fonts.Inter_300Light,
    },
    headerRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
    },
    leftHeaderText: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'left',
      fontFamily: Fonts.Inter_700Bold,
      color: colorsStyle.absolutes.black,
    },
    headerText: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      fontFamily: Fonts.Inter_700Bold,
      color: colorsStyle.absolutes.black,
    },
    cellNameContainer: {
      width: 172,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    cellRelativeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cellAbsoluteContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerSpace: {
      marginTop: 12,
    },
    footerRowContainer: {
      paddingTop: 16,
      borderTopColor: colorsStyle.absolutes.black,
      borderTopWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
    },
    footerData: {
      fontSize: 12,
      lineHeight: 16,
      textAlign: 'left',
      fontFamily: Fonts.Inter_700Bold,
      color: colorsStyle.greys[2],
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Header title={report.title} onPressBack={goBack} icon="share" />
        <ScrollView overScrollMode="never">
          <View style={styles.headerSpace} />
          <View style={styles.rowContainer}>
            <View style={styles.mainDataContainer}>
              <Text
                style={styles.mainData}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {report.leu}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.data}>
                {leu}
                {' (céls/µL)'}
              </Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.mainDataContainer}>
              <Text
                style={styles.mainData}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {report.erit}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.data}>{eritCount}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.mainDataContainer}>
              <Text
                style={styles.mainData}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {report.global}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.data}>{globalCount}</Text>
            </View>
          </View>
          <View style={styles.rowContainer} />
          <View style={styles.headerRowContainer}>
            <View style={styles.cellNameContainer}>
              <Text style={styles.leftHeaderText}>{report.diff}</Text>
            </View>
            <View style={styles.cellRelativeContainer}>
              <Text style={styles.headerText}>{report.relative}</Text>
            </View>
            <View style={styles.cellAbsoluteContainer}>
              <Text style={styles.headerText}>{report.absolute}</Text>
            </View>
          </View>
          {cellResultList.map((cell) => (
            <View key={cell.order} style={styles.rowContainer}>
              <View style={styles.cellNameContainer}>
                <Text
                  style={styles.mainData}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {cell.name}
                </Text>
              </View>
              <View style={styles.cellRelativeContainer}>
                <Text style={styles.data}>{cell.relative}</Text>
              </View>
              <View style={styles.cellAbsoluteContainer}>
                <Text style={styles.data}>{cell.absolute}</Text>
              </View>
            </View>
          ))}
          <View style={styles.footerSpace} />
          <View style={styles.footerRowContainer}>
            <View style={styles.cellNameContainer}>
              <Text style={styles.leftHeaderText}>{report.total}</Text>
            </View>
            <View style={styles.cellRelativeContainer}>
              <Text style={styles.headerText}>100</Text>
            </View>
            <View style={styles.cellAbsoluteContainer}>
              <Text style={styles.headerText}>{globalCount}</Text>
            </View>
          </View>
          <View style={styles.headerSpace} />
          <View style={styles.rowContainer}>
            <View style={styles.mainDataContainer}>
              <Text style={styles.footerData}>
                {report.count.replace('{{count}}', maxCount.value.toString())}
              </Text>
            </View>
          </View>
          <View style={styles.headerSpace} />
        </ScrollView>
      </View>
      <Footer>
        <Button title={report.end} onPress={onPressEndCount} />
      </Footer>
    </>
  );
}
