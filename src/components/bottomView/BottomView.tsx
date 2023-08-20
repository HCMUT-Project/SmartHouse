import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {COLOR} from '../../constants';
import {BaseImage, SIZE} from '@ddc-fis-hcm/react-native-sdk';
import {textStyles} from '../../styles';

interface BottomViewProps {
  style?: Object;
  buttons: ButtonProps[];
}

export interface ButtonProps {
  label: string;
  style?: ViewStyle;
  type?: undefined | 'light';
  onPress: Function;
  icon?: any;
}

export const BottomView = ({style, buttons}: BottomViewProps) => {
  return (
    <View
      style={
        style !== undefined ? [styles.bottom_view, style] : styles.bottom_view
      }>
      {buttons.length > 0 &&
        buttons.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              item.onPress();
            }}
            style={
              item.type === 'light'
                ? [styles.btn, styles.btn_light]
                : styles.btn
            }>
            {item.icon && (
              <BaseImage source={item.icon} style={styles.btn_icon} />
            )}
            <Text
              style={
                item.type === 'light'
                  ? [styles.btn_label, styles.btn_label_light]
                  : styles.btn_label
              }>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

BottomView.defaultProps = {
  label: 'button',
};
const styles = StyleSheet.create({
  bottom_view: {
    backgroundColor: COLOR.white,
    bottom: 0,
    width: '100%',
    paddingVertical: SIZE[14],
    paddingHorizontal: SIZE[12],
    paddingBottom: SIZE[24],
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    marginHorizontal: SIZE[4],
    borderRadius: 10,
    backgroundColor: COLOR.light_red,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_light: {
    backgroundColor: COLOR._F3F3F3,
  },
  btn_icon: {
    width: SIZE[16],
    height: SIZE[16],
    resizeMode: 'contain',
  },
  btn_label: {
    ...textStyles.normalMedium,
    color: COLOR.white,
    paddingHorizontal: SIZE[6],
    paddingVertical: SIZE[12],
  },
  btn_label_light: {
    color: COLOR._262626,
  },
});
