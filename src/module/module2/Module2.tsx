import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Module2 = () => {
  return (
    <View style={styles.container}>
      <Text>Module2</Text>
    </View>
  );
};

export default Module2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
