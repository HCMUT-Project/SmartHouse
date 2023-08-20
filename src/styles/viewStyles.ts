import {SIZE} from '@ddc-fis-hcm/react-native-sdk';
import {ImageStyle, Platform, ViewStyle} from 'react-native';

interface ViewStylesProps {
  flex1: ViewStyle;
  paddingHorizontalView: number;
  paddingVerticalView: number;
  paddingHorizontalItem: number;
  paddingVerticalItem: number;

  borderRadiusView: number;
  borderRadiusCard: number;
  borderRadiusForm: number;

  iconSize: number;
  iconMiniSize: number;
  iconNormalSize: number;

  shadow: ViewStyle;
  sizeTagExists: number;
  paddingBottomScrollView: number;
}
interface IconStylesProps {
  icon14px: ImageStyle;
}
export const viewStyles: ViewStylesProps = {
  paddingHorizontalView: SIZE[20], // Khoảng cách chiều ngang giữa view cha và view con
  paddingVerticalView: SIZE[16], // Khoảng cách chiều dọc giữa view cha và view con
  paddingVerticalItem: SIZE[16], // Khoảng cách chiều dọc giữa các view ngang cấp
  paddingHorizontalItem: SIZE[16], // Khoảng các chiều ngang giữa các view ngang cấp
  borderRadiusView: SIZE[20],
  borderRadiusCard: SIZE[14],
  borderRadiusForm: SIZE[4],
  iconSize: SIZE[28],
  iconMiniSize: SIZE[14],
  iconNormalSize: SIZE[24],
  shadow: {
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 0},
    elevation: Platform.OS === 'android' ? 5 : 1,
  },
  paddingBottomScrollView: SIZE[34] * 2,
  sizeTagExists: SIZE[10],
  flex1: {flex: 1},
};
export const iconStyle: IconStylesProps = {
  icon14px: {width: SIZE[14], height: SIZE[14], resizeMode: 'contain'},
};
