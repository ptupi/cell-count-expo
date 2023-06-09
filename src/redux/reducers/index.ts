import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserReducer from './userReducer';
import AlertReducer from './alertReducer';
import ConfirmReducer from './confirmReducer';

// Each persistReducer should have its own config declaration
const persistUserConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['welcome', 'customCellList'],
};

const rootReducer = combineReducers({
  user: persistReducer(persistUserConfig, UserReducer),
  alert: AlertReducer,
  confirm: ConfirmReducer,
});

export { rootReducer };
