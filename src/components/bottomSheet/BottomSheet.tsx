import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Image
} from 'react-native';
import {COLOR, IMAGE} from '../../constants';
import { SIZE } from '../../constants/Size';
import { HEIGHT_WINDOW, WIDTH_SCREEN } from '../../constants/Function';
import {textStyles, iconStyle, viewStyles} from '../../styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {stringIsEmpty} from '../../constants/Function';

export interface BottomSheetRef {
  open: (callback?: Function) => void;
  close: (callback?: Function) => void;
}
export interface BottomSheetProps {
  onCancel?: Function;
  onClose?: Function;
  children?: ReactNode;
  title?: string;
  contentStyle?: ViewStyle;
  subTitle?: {
    label: string;
    value: string;
  };
}
const duration = 500;
export const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    const animatedHeight = useSharedValue(1000);
    const [childrenHeight, setChildrenHeight] = useState(0);
    const {onClose, children, title, subTitle, contentStyle} = props;
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    // const [keyboardHeight, setKeyboardHeight] = useState(0);

    useImperativeHandle(ref, () => ({
      open: () => {
        _open();
      },
      close: () => {
        _close();
      },
    }));
    const _open = () => {
      setVisible(true);
      animatedHeight.value = withTiming(0, {
        duration: duration,
      });
      setTimeout(() => {}, duration);
    };
    const _close = () => {
      animatedHeight.value = withTiming(1000, {
        duration: duration,
      });
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose && onClose();
        }, duration + 200);
      }, duration / 2);
    };
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          // setKeyboardHeight(e?.endCoordinates?.height);
          setKeyboardVisible(true);
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);
        },
      );
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: animatedHeight.value}],
      };
    });
    const getChildrenHeight = (_height: number) => {
      if (_height > childrenHeight) {
        setChildrenHeight(_height);
      }
    };
    return (
      <Modal
        visible={visible}
        transparent
        animationType={'fade'}
        statusBarTranslucent>
        <View style={styles.container}>
          <GestureHandlerRootView style={styles.animatedContainer}>
            <Animated.View style={[styles.animatedView, animatedStyle]}>
              <TouchableWithoutFeedback onPress={() => _close()}>
                <View style={viewStyles.flex1} />
              </TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                contentContainerStyle={styles.keyboardContainer}>
                <View style={styles.barContainer}>
                  <View style={styles.header}>
                    <View style={styles.title_view}>
                      <TouchableOpacity
                        style={styles.btn_close}
                        onPress={() => _close()}>
                        <Image
                          style={iconStyle.icon14px}
                          source={IMAGE.ic_mul}
                        />
                      </TouchableOpacity>
                      {!stringIsEmpty(title) && (
                        <Text style={styles.title}>{title}</Text>
                      )}
                    </View>
                    {subTitle && (
                      <View style={styles.subtitle_view}>
                        <Image
                          source={IMAGE.ic_i_light}
                          style={styles.ic_subTitle}
                        />
                        <Text
                          style={{...textStyles.normal, color: COLOR._8C8C8C}}>
                          {subTitle.label}
                        </Text>
                        <Text style={{...textStyles.normalBold}}>
                          {subTitle.value}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={[
                      styles.contentContainer,
                      contentStyle && contentStyle,
                      Platform.OS === 'android' && {
                        height: HEIGHT_WINDOW * 0.7,
                      },
                    ]}
                    onLayout={_event =>
                      getChildrenHeight(_event.nativeEvent.layout.height)
                    }>
                    {children}
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Animated.View>
          </GestureHandlerRootView>
        </View>
      </Modal>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000036',
  },
  contentContainer: {
    width: WIDTH_SCREEN,
    backgroundColor: COLOR.white,
    height: HEIGHT_WINDOW * 0.45,
    justifyContent: 'center',
  },
  animatedContainer: {
    flex: 1,
    width: '100%',
  },
  animatedView: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboardContainer: {flex: 1},
  bar: {
    width: SIZE[46],
    height: SIZE[6],
    backgroundColor: COLOR._E5E5E5,
    borderRadius: SIZE[10],
  },
  barContainer: {
    alignItems: 'center',
  },
  btn_close: {
    padding: SIZE[16],
    left: 0,
    position: 'absolute',
  },
  header: {
    backgroundColor: COLOR.white,
    width: '100%',
    paddingTop: SIZE[8],
    alignItems: 'center',
    borderTopLeftRadius: SIZE[16],
    borderTopRightRadius: SIZE[16],
    borderBottomColor: COLOR._F5F5F5,
    borderBottomWidth: 1,
  },
  title_view: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: SIZE[12],
  },
  title: {
    ...textStyles.medium,
    alignSelf: 'center',
  },
  subtitle_view: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SIZE[10],
  },
  ic_subTitle: {
    ...iconStyle.icon14px,
    marginHorizontal: SIZE[10],
  },
});
