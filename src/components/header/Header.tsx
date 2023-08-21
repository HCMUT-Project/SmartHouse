import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { SIZE } from '../../constants/Size';
import {COLOR, IMAGE} from '../../constants';
import { WIDTH_SCREEN } from '../../constants/Function';
import {textStyles} from '../../styles';

interface HeaderProps {
  label: string;
  style?: Object;
  onPressBack?: Function;
  rightBtn?: React.ReactNode;
  title: string;
  subTitle?: string;
}

export const Header = ({
  title,
  subTitle,
  onPressBack,
  rightBtn,
  style,
}: HeaderProps) => {
  return (
    <SafeAreaView style={[styles.header, style ? style : {}]}>
      {onPressBack ? (
        <TouchableOpacity
          style={styles.back_btn}
          onPress={() => {
            onPressBack();
          }}>
          <Image source={IMAGE.ic_back} style={styles.ic_back} />
        </TouchableOpacity>
      ) : (
        <View style={styles.btn_view} />
      )}
      <View style={styles.title_view}>
        <Text style={textStyles.medium}>{title}</Text>
        {subTitle !== undefined && (
          <Text style={textStyles.note}>{subTitle}</Text>
        )}
      </View>
      {rightBtn && rightBtn}
    </SafeAreaView>
  );
};

Header.defaultProps = {
  label: 'button',
};
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: COLOR.white,
    width: '100%',
    flexDirection: 'row',
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  btn_view: {
    width: SIZE[40],
  },
  btn: {
    justifyContent: 'center',
  },
  back_btn: {
    padding: SIZE[16],
  },
  ic_back: {
    width: SIZE[8],
    height: SIZE[16],
    resizeMode: 'cover',
  },
  title_view: {
    width: WIDTH_SCREEN - SIZE[40] * 2,
    alignItems: 'center',
    padding: SIZE[14],
  },
});
