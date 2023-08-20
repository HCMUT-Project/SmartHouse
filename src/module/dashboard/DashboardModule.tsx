import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DashboardModule = () => {
  return (
    <View style={styles.container}>
      <Text>Thong Ke</Text>
    </View>
  );
};

export default DashboardModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
