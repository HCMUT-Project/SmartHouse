import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProfileModule = () => {
  return (
    <View style={styles.container}>
      <Text>Ca nhan</Text>
    </View>
  );
};

export default ProfileModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
