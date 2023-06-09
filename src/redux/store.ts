import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
