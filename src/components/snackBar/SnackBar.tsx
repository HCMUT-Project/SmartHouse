import {BaseImage} from '@ddc-fis-hcm/react-native-sdk';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FONT} from '../../constants';
import {useAppSelector} from '../../hooks';

export enum SnackBarType {
  success,
  info,
  warning,
  error,
}
export interface SnackBarProps {
  duration: number;
  message: string;
  type: keyof typeof SnackBarType;
}

const FONT_FAMILY = FONT.regular_400;
const COLOR_BACKGROUND = '#ffffff';
const COLOR_SUCCESS = '#00BC3C';
const COLOR_INFO = '#2F6BFF';
const COLOR_WARNING = '#FF821E';
const COLOR_ERROR = '#E60A32';
const ICON_INFO =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAlCAYAAAAqXEs9AAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGZSURBVHgB7ZiBbYMwEEU/UQdgBHeCphMk3YANwgjdoN0g6QTQDbpB0w3IBLBB2OB6Fq4KrimcMaiVeNIJOfaZn8M+HwAr/4wIQogo5suWLWHbsSm22HTXbAXbhe0cRdEb5kILYXtiu9J4SuOjEBKeMBEKcQlLEQKe6EjhOGIKPEFG4cngA4WNjI0sUuyQ0vwkrntHDjGKL+9otvNYanONhT63nBrq9o8bx8CDh5h7Y7XAT4t/HBxFzRaVUE7w1amkE9WNJUY/V4Xl+Mr6cApi9liezuK2Bd1heXbthi1oi+VR7YYtSLJtQ9G/qP8CtiBJHglF5543VmcF+TpS9H02Kcgp8IugD/gt7OGM28+l3bAfmW/JmbO9wo9zbw81Zaq0Msxa/jnJKG0NnQiZk/cFy/Ejqq7yQ+cFrVySk3Iz10HgU7E9cBCqwZHUFPVzk0ICO5xoPk7wgeSLdAw5pkBhI+UXGYcoXfSX5I9OJQlCwhPqI+JZKOxqfEbvWPHHBiNO/9s9moJOHzXtjw0VmiNIZ/3CfqtYWZmbT4F05bza874eAAAAAElFTkSuQmCC';
const ICON_SUCCESS =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIkSURBVHgB7ZmLcYJAEIaXVGA6IBXEDkIqkRJMBZAKNBVoB9qBpoIkFUAHsYPNrpwzxtzBAnuHE/lmdpjhcff/dwv3AGBk5LaJQAlETOgwpXgyx4kJ5kBRmvii2EdRtIehIdETioziG9tTUKwoYgiNEb5APVbBjFBFM+zW4k0UFCn4BHVb3cUCtMEqZXYYjg3XCVqYAkOzAw0wTNq46JdOVECKwzOr0xjViI/pwN0Yw7DwIPhAA9/BdvGu5sEchhfP8MucuS5ae8C0fgHXxb2tF1w9kEM4SuF9c5CC1ajoGx7NE1NfIrlfKl5SWF9Y/PSiXgnJpV5bCiXgF87jZ8rnz9MJEpYJn5023kGFbdEftpbPWjy/lRj4QD/0Fc80fxlRPlUuKHKUvfAa4o/lSAxIic39Mdab0BJ/RN1AgwlV8VID0hTid2VSY0JdPApTqGhRoMuED/HH+iQG2n5GbSZ8iGdEn9E5tueXCU/imVxioOtU4o8J1BXPJCABu2+bsInYk3j59B6rAaorbL5AfVY2ra4FDaeCbPoaDl5WlpcnrQsas/J5g+thbRPP1C3quRc47/Q2mLpRQjX9Lm0XnYt60wsvMDyvLvEiqCeWOBxL0ADD7oue2IAWWG3uhtwf3aHm5u6ZkRDppJM2NSZS9DNQ8QCYQgiwmnGuUQ/u2fCf6zMjBbaHWzzvK1z7NyvHI1Sbwhznv1k5eC/onY9X8Zt1ZOQf8APMQRSFkh8/OgAAAABJRU5ErkJggg==';
const ICON_ERROR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIESURBVHgB7ZiBdYIwEIZ/OoEbFDfoBsUN3KBuYDcQJ3AE3KAjaCewG0An0A2uyQOfgZZwgYPkvfK9lydgIHfJcX84YGZmRhQiWqi2U+1EDy6qbRA6yshYtZza0f/FCBGG8eE6UYUNx3jTiQUEeIIMW9Vih/667ztCoAqdPlyDCCVlxJH68wGfDJh9kwS+oDK/D+UEH6iBNyRHgp5E6IkaNIdb5rFRRFG0RA96pVEqtwUx5NDvUoopIL7iajLiZymdVkXErcuBA9OgzLiH60QKR5xCiErh4Srot3FcgMeWHMXN9R1IMS46hA4uN7AdqGbmDeOzJoe06rICU8r+jtuR5QCVafMF05FwV4G7AuwZESTjdOp0gORFiwtL3KwOVC+uj9m/s+0St64VcP3SkkYbb9WdVgccRWtMrOJmW4EUw3g2jmP0xypuf26nK49zDOdYjSEhgCu15T43L7Y5cMG0eZ/DWTmwal78FUIeRIsLT9zIrUBlQ2+hdcErpmGVC5O8y/iE5IiN5y5IjsS0uRlCG8hxM44lv7TW5knTgWfIob/cdPho4yXV/NU8qWUhkq00jEWtgtFcgRvCp2Zj04FPhM+XedIMoUT9+Cn18VmqECruJ7UVqKR6j3DZm8a3olYipfBI4QI9FPRK/tBjZ2TZQrCKu+oBem80ftmvTsEKl5mZf84PiAd6f0mHPIsAAAAASUVORK5CYII=';

export const SnackBar = (props: SnackBarProps) => {
  const animatedHeight = useSharedValue(-500);
  const message = useAppSelector(state => state.snackBarReducer.message);
  const type = useAppSelector(state => state.snackBarReducer.type);
  const [color, setColor] = useState<string>('');
  const [icon, setIcon] = useState<string>('');

  const showSnackBar = useCallback(() => {
    animatedHeight.value = withTiming(0, {
      duration: props.duration,
    });
    setTimeout(() => {
      animatedHeight.value = withTiming(-500, {
        duration: props.duration,
      });
    }, 3000);
  }, [animatedHeight, props.duration]);

  useEffect(() => {
    switch (type) {
      case 'info':
        setColor(COLOR_INFO);
        setIcon(ICON_INFO);
        break;
      case 'error':
        setColor(COLOR_ERROR);
        setIcon(ICON_ERROR);
        break;
      case 'success':
        setColor(COLOR_SUCCESS);
        setIcon(ICON_SUCCESS);
        break;
      case 'warning':
        setColor(COLOR_WARNING);
        setIcon(ICON_INFO);
        break;
      default:
        // setColor(COLOR_INFO);
        // setIcon(ICON_INFO);
        break;
    }
    if (message && message !== '') {
      showSnackBar();
    }
    if (type === undefined) {
      setIcon('');
    }
  }, [message, type, showSnackBar]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: animatedHeight.value}],
    };
  });

  return (
    <Animated.View
      style={[animatedStyle, styles.container, {backgroundColor: color}]}>
      <SafeAreaView style={styles.contentView}>
        {icon !== '' && <BaseImage source={{uri: icon}} style={styles.icon} />}
        <Text style={styles.message}>{message}</Text>
      </SafeAreaView>
    </Animated.View>
  );
};

SnackBar.defaultProps = {
  duration: 1000,
  message: 'Message',
};

const styles = StyleSheet.create({
  message: {
    color: COLOR_BACKGROUND,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONT_FAMILY,
    paddingLeft: 12,
    flex: 1,
  },
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: StatusBar.currentHeight,
  },
  contentView: {
    flexDirection: 'row',
    zIndex: 999,
    alignItems: 'center',
  },
  icon: {width: 20, height: 20},
});
