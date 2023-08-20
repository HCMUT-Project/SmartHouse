import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import React from 'react';
import {COLOR} from '../../constants';
import {viewStyles} from '../../styles/viewStyles';
interface CardViewProps {
  style?: ViewStyle | Array<ViewStyle>;
  children: any;
  isBorder?: boolean;
  isShadow?: boolean;
  disable?: boolean;
  onPress?: Function;
  onLayout?: (e: LayoutChangeEvent) => void;
}
export const CardView = ({
  children,
  style,
  isBorder,
  isShadow,
  onPress,
  onLayout,
  disable,
}: CardViewProps) => {
  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : 0.5}
      onLayout={onLayout}
      style={[
        styles.container,
        isBorder ? styles.borderRadius : {},
        isShadow ? styles.shadow : {},
        style,
      ]}
      onPress={() => onPress && onPress()}
      disabled={!onPress ? true : false}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR._F3F3F3,
  },
  borderRadius: {
    borderRadius: viewStyles.borderRadiusCard,
  },
  shadow: {
    borderRadius: viewStyles.borderRadiusCard,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 0},
    elevation: Platform.OS === 'android' ? 5 : 1,
  },
});
