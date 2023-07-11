import React, { useRef } from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  View,
  Share,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';

import { language } from '../languages';
import { RootStackParamList } from '../routes/types.route';
import colorsStyle from '../styles/colors.style';
import Header from '../components/Header.component';
import { useAppDispatch, useAppSelector } from '../redux';
import Footer from '../components/Footer.component';
import Button from '../components/Button.component';
import {
  setConfirmHandleConfirm,
  setConfirmMessage,
  setConfirmTitle,
  setConfirmVisible,
} from '../redux/reducers/confirmReducer';
import Text, { Fonts } from '../components/Text.component';
import {
  setShareOptionsHandleApp,
  setShareOptionsHandleImage,
  setShareOptionsVisible,
} from '../redux/reducers/shareOptionsReducer';
import constantsUtils from '../utils/constants.utils';
import { setUserReviewed } from '../redux/reducers/userReducer';

type ReportNavigationProp = StackNavigationProp<RootStackParamList, 'Report'>;
type ReportRouteProp = RouteProp<RootStackParamList, 'Report'>;
type ReportProps = { navigation: ReportNavigationProp; route: ReportRouteProp };

export default function CountScreen({ navigation, route }: ReportProps) {
  const { report } = language;
  const { maxCount, leu, eritCount, globalCount, cellResultList } =
    route.params;

  const dispatch = useAppDispatch();
  const { reviewed } = useAppSelector((state) => state.user);

  const printRef = useRef(null);

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

  const shareApp = () => {
    Share.share({
      message: report.shareMsg,
    });
  };

  const shareImage = () => {
    printRef.current.capture().then(async (uri: string) => {
      const available = await Sharing.isAvailableAsync();
      if (available) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/jpeg',
          dialogTitle: report.shareMsg,
        });
      }
    });
  };

  const onPressShare = () => {
    dispatch(setShareOptionsHandleApp(shareApp));
    dispatch(setShareOptionsHandleImage(shareImage));
    dispatch(setShareOptionsVisible(true));
  };

  const onConfirmEnd = () => {
    navigation.navigate('Main');
  };

  const onConfirmReview = () => {
    dispatch(setUserReviewed(true));
    if (Platform.OS === 'android') {
      Linking.openURL(
        `market://details?id=${constantsUtils.packageName}&showAllReviews=true`
      );
    } else {
      Linking.openURL(
        `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${constantsUtils.itunesItemId}?action=write-review`
      );
    }
  };

  const onPressEndCount = () => {
    if (reviewed) {
      dispatch(setConfirmTitle(report.endTitle));
      dispatch(setConfirmMessage(report.endMsg));
      dispatch(setConfirmHandleConfirm(onConfirmEnd));
      dispatch(setConfirmVisible(true));
    } else {
      dispatch(setConfirmTitle(report.reviewTitle));
      dispatch(setConfirmMessage(report.reviewMsg));
      dispatch(setConfirmHandleConfirm(onConfirmReview));
      dispatch(setConfirmVisible(true));
      navigation.navigate('Main');
    }
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
    },
    headerText: {
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      fontFamily: Fonts.Inter_700Bold,
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
    printView: {
      backgroundColor: colorsStyle.absolutes.white,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Header
          title={report.title}
          onPressBack={goBack}
          icon="share"
          onPressIcon={onPressShare}
        />
        <ScrollView overScrollMode="never">
          <ViewShot style={styles.printView} ref={printRef}>
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
          </ViewShot>
        </ScrollView>
      </View>
      <Footer>
        <Button title={report.end} onPress={onPressEndCount} />
      </Footer>
    </>
  );
}
