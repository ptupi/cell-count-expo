import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserReducer from './userReducer';
import AlertReducer from './alertReducer';

// Each persistReducer should have its own config declaration
const persistUserConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['welcome'],
};

const rootReducer = combineReducers({
  user: persistReducer(persistUserConfig, UserReducer),
  alert: AlertReducer,
});

export { rootReducer };
