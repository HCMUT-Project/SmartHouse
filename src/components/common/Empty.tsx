import * as React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {COLOR, IMAGE, STRING} from '../../constants';
import {textStyles} from '../../styles';

export interface EmptyProps {
  message?: string;
}

const Empty = ({message}: EmptyProps) => {
  return (
    <View style={styles.container}>
      <Image source={IMAGE.empty_box} style={styles.img} />
      {message ? (
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      ) : (
        <Text style={styles.message} numberOfLines={2}>
          {STRING.empty.default}
        </Text>
      )}
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  img: {
    width: '60%',
    height: 96,
    resizeMode: 'contain',
  },
  message: {
    ...textStyles.normal,
    width: '65%',
    textAlign: 'center',
    color: COLOR._595959,
  },
});
