import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DeliveryModule = () => {
  return (
    <View style={styles.container}>
      <Text>Giao hang</Text>
    </View>
  );
};

export default DeliveryModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
