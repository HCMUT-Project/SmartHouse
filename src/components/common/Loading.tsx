import * as React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export const Loading = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <ActivityIndicator size="large" color={'#FE9E23'} />
      {/* <Image source={require('./loading.gif')} style={styles.img} /> */}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  img: {
    width: '60%',
    height: 300,
    resizeMode: 'contain',
  },
});
