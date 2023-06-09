import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  StyleSheet,
  Platform,
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
// import { Asset } from 'expo-asset';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import colorsStyle from './src/styles/colors.style';
import Navigation from './src/routes';
import { store, persistor } from './src/redux';

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

  let [appReady, setAppReady] = useState(false);

  let cacheResources = () => {
    // const images = [require('./src/assets/png/houseMarker.asset.png')];
    // const cacheImages = images.map((image) => {
    //   return Asset.fromModule(image).downloadAsync();
    // });
    // return Promise.all(cacheImages);
  };

  useEffect(() => {
    const loadResources = async () => {
      // await cacheResources();
      if (fontsLoaded) {
        setAppReady(true);
      }
    };
    loadResources();
  }, [fontsLoaded]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorsStyle.absolutes.white,
    },
    containerIos: {
      height: 44,
      width: '100%',
      backgroundColor: colorsStyle.absolutes.white,
    },
    containerAndroid: {
      marginTop: StatusBarReactNative.currentHeight,
    },
    splashContainer: {
      flex: 1,
      backgroundColor: colorsStyle.absolutes.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaProvider>
          <StatusBar
            style="dark"
            backgroundColor={colorsStyle.absolutes.white}
          />
          {appReady ? (
            <View
              style={[
                styles.container,
                Platform.OS === 'ios'
                  ? styles.containerIos
                  : styles.containerAndroid,
              ]}
            >
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
