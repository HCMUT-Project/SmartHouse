import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLOR} from '../../constants';

interface NormalButtonProps {
  label: string;
  style: Object;
  onPress: Function;
}

export const NormalButton = ({label, style, onPress}: NormalButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress()}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

NormalButton.defaultProps = {
  label: 'button',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLOR.white,
    paddingVertical: 20,
  },
});
