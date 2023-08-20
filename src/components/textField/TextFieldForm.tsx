import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextInput,
  KeyboardTypeOptions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {textStyles, viewStyles} from '../../styles';
import {COLOR, IMAGE, STRING} from '../../constants';
import {BaseImage, SIZE} from '@ddc-fis-hcm/react-native-sdk';
import {stringIsEmpty} from '../../constants/Function';
import {ICON_CLOSE} from '@ddc-fis-hcm/react-native-sdk/react-native-sdk-source/styles';

interface TextFieldFormProps {
  caption?: string;
  value?: any;
  display?: string;
  readOnly?: boolean;
  textInputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  placeholder?: string;
  isRequire?: boolean;
  error?: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  textType?: string;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
}
export const TextFieldForm = ({
  caption,
  readOnly,
  textInputStyle,
  isRequire,
  containerStyle,
  error,
  disabled,
  value,
  keyboardType,
  textType,
  multiline,
  placeholder,
  onChangeText,
}: TextFieldFormProps) => {
  const [text, setText] = useState<string>(value);
  const [isShowPwd, setShowPwd] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (textType === 'password') {
      setShowPwd(true);
    }
  }, [textType]);
  useEffect(() => {
    setText(value);
  }, [value]);
  const _onChangeText = (val: string) => {
    if (textType === 'decimal' && val.length > 0) {
      val = val.split('.').join('');
      val = new Intl.NumberFormat('vi-VN').format(
        Number(val.split('.').join('')),
      );
    }
    setText(val);
    onChangeText && onChangeText(val);
  };
  const _onFocus = () => {
    setIsFocused(true);
  };
  const _onBlur = () => {
    setIsFocused(false);
  };
  const _onPressClear = () => {
    _onChangeText('');
  };

  if (readOnly) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.contentView]}>
          <Text style={styles.caption}>{caption}</Text>
          <Text style={styles.read_only}>{text}</Text>
        </View>
      </View>
    );
  }
  let borderColor = COLOR._F3F3F3;
  if (error) {
    borderColor = COLOR.red;
  } else {
    if (isFocused) {
      borderColor = '#FDAF17';
    } else {
      borderColor = COLOR._F3F3F3;
    }
  }
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.caption}>
        {caption}
        <Text style={styles.require}>{isRequire ? '*' : ''}</Text>
      </Text>
      <View
        style={[
          styles.content,
          {
            borderColor: borderColor,
            height: multiline ? SIZE[16] * 7.75 : SIZE[16] * 3.5,
            backgroundColor: !disabled ? COLOR.white : COLOR._F3F3F3,
          },
          containerStyle,
        ]}>
        <View style={styles.wrap_text_input}>
          <TextInput
            editable={!disabled}
            placeholder={
              placeholder !== undefined ? placeholder : STRING.form.plhTextInput
            }
            placeholderTextColor={COLOR._BFBFBF}
            multiline={multiline}
            secureTextEntry={isShowPwd}
            scrollEnabled={false}
            returnKeyType={multiline ? 'done' : 'default'}
            autoCapitalize="sentences"
            blurOnSubmit={true}
            textContentType="oneTimeCode"
            style={[
              textInputStyle,
              multiline ? styles.input_multiline : styles.input,
            ]}
            keyboardType={
              !stringIsEmpty(keyboardType) ? keyboardType : 'default'
            }
            value={text}
            onChangeText={txt => _onChangeText(txt)}
            onFocus={_onFocus}
            onBlur={_onBlur}
          />
          {textType !== 'password' &&
            !multiline &&
            value !== '' &&
            !disabled && (
              <TouchableOpacity style={styles.ic_btn} onPress={_onPressClear}>
                <BaseImage source={{uri: ICON_CLOSE}} style={styles.icon} />
              </TouchableOpacity>
            )}
          {textType === 'password' && (
            <TouchableOpacity
              style={styles.ic_btn}
              onPress={() => setShowPwd(!isShowPwd)}>
              <BaseImage
                source={isShowPwd ? IMAGE.ic_close_eye : IMAGE.ic_eye}
                style={styles.iconEye}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {typeof error === 'string' && error.length > 0 && (
        <Text style={[textStyles.note, styles.error]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: viewStyles.paddingHorizontalItem,
    borderRadius: SIZE[8],
    borderWidth: 1,
  },
  contentView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZE[6],
  },
  caption: {
    ...textStyles.normal,
    fontWeight: '500',
    paddingVertical: SIZE[8],
  },
  input: {
    ...textStyles.normal,
    lineHeight: undefined,
    flex: 1,
    top: Platform.OS === 'ios' ? 0 : SIZE[16] * 0.25,
    color: 'black',
  },
  wrap_text_input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input_multiline: {
    ...textStyles.normal,
    flex: 1,
    top: Platform.OS === 'ios' ? 0 : SIZE[16] * 0.25,
    marginVertical: SIZE[16] * 0.5,
    marginBottom: SIZE[16] * 0.5,
    lineHeight: SIZE[16] * 1.25,
    color: 'black',
  },
  require: {},
  error: {
    color: COLOR.red,
    marginTop: SIZE[4],
    marginBottom: SIZE[8],
  },
  disabled: {
    backgroundColor: 'rgba(219, 217, 215, 0.5)',
  },
  ic_btn: {
    alignSelf: 'center',
    padding: 10,
  },
  icon: {
    width: SIZE[22],
    height: SIZE[22],
    resizeMode: 'contain',
  },
  iconEye: {
    width: SIZE[16],
    height: SIZE[16],
    resizeMode: 'contain',
  },
  read_only: {
    ...textStyles.normal,
    paddingLeft: SIZE[10],
    textAlign: 'right',
    flex: 1,
  },
});
