import { SIZE } from '../constants/Size';
import {StyleSheet, TextStyle} from 'react-native';
import {COLOR, FONT} from '../constants';

interface TextStylesProps {
  verySmall: TextStyle;
  verySmallBold: TextStyle;

  small: TextStyle;
  smallBold: TextStyle;

  normal: TextStyle;
  normalBold: TextStyle;

  medium: TextStyle;
  mediumBold: TextStyle;
  normalMedium: TextStyle;
  note: TextStyle;
}

export const textStyles: TextStylesProps = StyleSheet.create({
  verySmall: {
    fontSize: SIZE[10],
    fontFamily: FONT.regular_400,
    color: COLOR.black,
    lineHeight: SIZE[22],
  },
  verySmallBold: {
    fontSize: SIZE[10],
    fontFamily: FONT.bold_700,
    color: COLOR.black,
    lineHeight: SIZE[22],
  },
  small: {
    fontSize: SIZE[12],
    fontFamily: FONT.regular_400,
    color: COLOR._262626,
    lineHeight: SIZE[22],
  },
  smallBold: {
    fontSize: SIZE[12],
    fontFamily: FONT.bold_700,
    color: COLOR._262626,
    lineHeight: SIZE[22],
  },
  normal: {
    fontSize: SIZE[14],
    fontFamily: FONT.regular_400,
    color: COLOR.black,
    lineHeight: SIZE[22],
  },
  normalMedium: {
    fontSize: SIZE[14],
    fontFamily: FONT.medium_500,
    color: COLOR.black,
    lineHeight: SIZE[22],
  },
  normalBold: {
    fontSize: SIZE[14],
    fontFamily: FONT.bold_700,
    color: COLOR.black,
    lineHeight: SIZE[22],
  },
  medium: {
    fontSize: SIZE[16],
    fontFamily: FONT.medium_500,
    color: COLOR.black,
    lineHeight: SIZE[24],
  },
  mediumBold: {
    fontSize: SIZE[16],
    fontFamily: FONT.bold_700,
    color: COLOR.black,
    lineHeight: SIZE[22],
  },
  note: {
    fontFamily: FONT.regular_400,
    color: COLOR._8C8C8C,
    fontSize: SIZE[12],
    lineHeight: SIZE[16],
  },
});
