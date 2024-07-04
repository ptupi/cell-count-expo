import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  StyleSheet,
  StatusBar as StatusBarReactNative,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Navigation from './src/routes';
import { store, persistor } from './src/redux';
import { useColors } from './src/hooks/useColors';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  const colors = useColors();

  let [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      if (fontsLoaded) {
        setAppReady(true);
      }
    };
    loadResources();
  }, [fontsLoaded]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen.background,
      marginTop: StatusBarReactNative.currentHeight,
    },
    splashContainer: {
      flex: 1,
      backgroundColor: colors.screen.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaProvider>
          <StatusBar style="auto" backgroundColor={colors.screen.background} />
          {appReady ? (
            <View style={styles.container}>
              <Navigation />
            </View>
          ) : (
            <View style={styles.splashContainer} />
          )}
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
