import React from 'react';
import { StyleSheet, View } from 'react-native';

import colorsStyle from '../styles/colors.style';
import Text from './Text.component';

const LoadingOverlay = () => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: colorsStyle.opacity.black50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerContainer: {
      //
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text>LOADING</Text>
      </View>
    </View>
  );
};

export default LoadingOverlay;
