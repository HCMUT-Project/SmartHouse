import * as React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {COLOR, IMAGE, STRING} from '../../constants';
import {textStyles} from '../../styles';

export interface PermissionProps {
  message?: string;
}

const NoPermission = ({message}: PermissionProps) => {
  return (
    <View style={styles.container}>
      <Image source={IMAGE.ic_no} style={styles.img} />
      {message ? (
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      ) : (
        <Text style={styles.message} numberOfLines={2}>
          {STRING.permission.default}
        </Text>
      )}
    </View>
  );
};

export default NoPermission;

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
