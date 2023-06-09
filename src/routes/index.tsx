import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { useAppDispatch, useAppSelector } from '../redux';
import { setAlertVisible } from '../redux/reducers/alertReducer';
import ModalAlert from '../components/ModalAlert.component';
import { RootStackParamList } from './types.route';
import MainScreen from '../screens/Main.screen';
import SettingsScreen from '../screens/Settings.screen';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const { visible, title, message } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <ModalAlert
        visible={visible}
        setVisible={(status: React.SetStateAction<boolean>) => {
          dispatch(setAlertVisible(Boolean(status)));
        }}
        title={title}
        message={message}
      />
    </>
  );
}
