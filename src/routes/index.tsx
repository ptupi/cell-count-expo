import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { useAppDispatch, useAppSelector } from '../redux';
import { setAlertVisible } from '../redux/reducers/alertReducer';
import { setConfirmVisible } from '../redux/reducers/confirmReducer';
import ModalAlert from '../components/ModalAlert.component';
import ModalConfirm from '../components/ModalConfirm.component';
import { RootStackParamList } from './types.route';
import MainScreen from '../screens/Main.screen';
import SettingsScreen from '../screens/Settings.screen';
import EditCellsScreen from '../screens/EditCells.screen';
import EditCellScreen from '../screens/EditCell.screen';
import NewCellScreen from '../screens/NewCell.screen';
import CountSetupScreen from '../screens/CountSetup.screen';
import CountScreen from '../screens/Count.screen';
import ReportScreen from '../screens/Report.screen';

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
      <Stack.Screen
        name="EditCells"
        component={EditCellsScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="EditCell"
        component={EditCellScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialParams={{
          cell: {
            order: 1,
            name: 'Blasto',
            tag: 'Bls',
          },
          cellList: [
            {
              order: 1,
              name: 'Blasto',
              tag: 'Bls',
            },
          ],
        }}
      />
      <Stack.Screen
        name="CountSetup"
        component={CountSetupScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="NewCell"
        component={NewCellScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialParams={{
          cellList: [
            {
              order: 1,
              name: 'Blasto',
              tag: 'Bls',
            },
          ],
        }}
      />
      <Stack.Screen
        name="Count"
        component={CountScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialParams={{
          leu: 100,
          maxCount: {
            id: 1,
            label: '100 células',
            value: 100,
          },
        }}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialParams={{
          leu: 100,
          maxCount: {
            id: 1,
            label: '100 células',
            value: 100,
          },
          currentCount: [
            {
              order: 1,
              name: 'Blasto',
              tag: 'Bls',
            },
            {
              order: 1,
              name: 'Blasto',
              tag: 'Bls',
            },
            {
              order: 1,
              name: 'Blasto',
              tag: 'Bls',
            },
          ],
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const { visible, title, message } = useAppSelector((state) => state.alert);
  const {
    visible: confirmVisible,
    title: confirmTitle,
    message: confirmMessage,
    handleConfirm,
  } = useAppSelector((state) => state.confirm);

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
      <ModalConfirm
        visible={confirmVisible}
        setVisible={(status: React.SetStateAction<boolean>) => {
          dispatch(setConfirmVisible(Boolean(status)));
        }}
        title={confirmTitle}
        message={confirmMessage}
        handleConfirm={handleConfirm}
      />
    </>
  );
}
