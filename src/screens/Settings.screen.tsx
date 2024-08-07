import React from 'react';
import {
  BackHandler,
  FlatList,
  Platform,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { language } from '../languages';
import { RootStackParamList } from '../routes/types.route';
import Header from '../components/Header.component';
import SettingsOption, {
  SettingsOptionProps,
} from '../components/SettingsOption.component';
import constantsUtils from '../utils/constants.utils';
import { useAppDispatch, useAppSelector } from '../redux';
import {
  setAlertMessage,
  setAlertTitle,
  setAlertVisible,
} from '../redux/reducers/alertReducer';
import { setUserReviewed } from '../redux/reducers/userReducer';
import { useColors } from '../hooks/useColors';

type SettingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;
type SettingsProps = { navigation: SettingsNavigationProp };

export default function SettingsScreen({ navigation }: SettingsProps) {
  const { settings } = language;

  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const colors = useColors();

  const onPressEditCells = async () => {
    navigation.navigate('EditCells');
  };

  const onPressContact = async () => {
    const supported = await Linking.canOpenURL(constantsUtils.contactPage);
    if (supported) {
      await Linking.openURL(constantsUtils.contactPage);
    } else {
      dispatch(setAlertTitle(settings.alertTitle));
      dispatch(setAlertMessage(settings.linkError));
      dispatch(setAlertVisible(true));
    }
  };

  const onPressReview = async () => {
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

  const OPTIONS: SettingsOptionProps[] = [
    {
      name: settings.edit,
      icon: 'edit',
      onPress: onPressEditCells,
    },
    {
      name: settings.contact,
      icon: 'chat-bubble-outline',
      onPress: onPressContact,
    },
    {
      name: settings.rate,
      icon: 'star-outline',
      onPress: onPressReview,
    },
  ];

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen.background,
    },
  });

  return (
    <View style={styles.container}>
      <Header
        title={settings.title}
        onPressBack={goBack}
        icon={colorScheme === 'dark' ? 'mode-night' : 'light-mode'}
      />
      <FlatList
        data={OPTIONS}
        renderItem={({ item, index }) => (
          <SettingsOption
            name={item.name}
            icon={item.icon}
            onPress={item.onPress}
          />
        )}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={<View style={{ marginTop: 16 }} />}
        ListFooterComponent={<View style={{ marginTop: 16 }} />}
        overScrollMode="never"
      />
    </View>
  );
}
