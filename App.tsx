import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
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

import colorsStyle from './src/styles/colors.style';
import Navigation from './src/routes';

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
      backgroundColor: colorsStyle.secondaries[0],
    },
    splashContainer: {
      flex: 1,
      backgroundColor: colorsStyle.secondaries[0],
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colorsStyle.greys[0]} />
      {appReady ? (
        <View style={styles.container}>
          <Navigation />
        </View>
      ) : (
        <View style={styles.splashContainer} />
      )}
    </SafeAreaProvider>
  );
}
