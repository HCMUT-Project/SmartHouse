import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Module1 = () => {
  return (
    <View style={styles.container}>
      <Text>Module1</Text>
    </View>
  );
};

export default Module1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
