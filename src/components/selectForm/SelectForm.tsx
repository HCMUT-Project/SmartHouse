import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {textStyles, viewStyles} from '../../styles';
import {COLOR, IMAGE, STRING} from '../../constants';
import { Select } from '../select/Select';
import { SIZE } from '../../constants/Size';
import {stringIsEmpty} from '../../constants/Function';

export interface SelectItemProps {
  id: number | string;
  label: string;
  data?: any;
  onPress?: Function | undefined;
}


interface SelectFormProps {
  caption: string;
  isRequire?: boolean;
  items: Array<SelectItemProps>;
  editable?: boolean;
  disabled?: boolean;
  error?: string;
  multiple?: boolean;
  defaultValue?: SelectItemProps | Array<SelectItemProps>;
  onChangeValue?: (value: Array<SelectItemProps>) => void;
  onPress?: Function;
  onChangeTextSearchBox?: (text: string) => void;
  searchBox?: boolean;
}
export const SelectForm = ({
  caption,
  isRequire,
  items,
  editable,
  disabled,
  defaultValue,
  error,
  multiple,
  onChangeValue,
  searchBox,
  onChangeTextSearchBox,
  onPress,
}: SelectFormProps) => {
  const [select, setSelect] = useState<Array<SelectItemProps> | undefined>(
    undefined,
  );
  const [selectText, setSelecText] = useState('');
  useEffect(() => {
    if (!Array.isArray(defaultValue) && defaultValue) {
      setSelect(defaultValue ? [defaultValue] : undefined);
      defaultValue?.label && setSelecText(defaultValue?.label);
    } else if (defaultValue !== undefined) {
      setSelect(defaultValue);
      setSelectedLabel(defaultValue);
    } else {
      setSelect(defaultValue);
      setSelecText('');
    }
  }, [defaultValue]);
  const setSelectedLabel = (value: Array<SelectItemProps>) => {
    let result = '';
    for (let i = 0; i < value.length; i++) {
      result += value[i].label;
      if (i !== value.length - 1) {
        result += ',\n';
      }
    }
    setSelecText(result);
  };
  return (
    <View style={styles.container}>
      <Text style={[textStyles.normalMedium, styles.caption]}>
        {caption}
        <Text>
          {isRequire && editable !== false && disabled !== true ? '*' : ''}
        </Text>
      </Text>
      <View
        style={[
          styles.content,
          disabled ? styles.disabled : {},
          !stringIsEmpty(error) && {borderColor: COLOR.red},
        ]}>
        <View style={styles.select}>
          <Select
            disable={disabled === true || editable === false ? true : false}
            value={select}
            label={''}
            items={Array.isArray(items) ? items : []}
            searchBox={searchBox}
            multiple={multiple}
            onChangeTextSearchBox={onChangeTextSearchBox}
            onSelectItem={value => {
              if (!Array.isArray(value) && value) {
                setSelect([value]);
                setSelectedLabel([value]);
                onChangeValue !== undefined && onChangeValue([value]);
              } else if (value) {
                setSelect(value);
                setSelectedLabel(value);
                onChangeValue !== undefined && onChangeValue(value);
              }
            }}
            selectView={({_, onSelect}: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onSelect && onSelect();
                    onPress && onPress();
                  }}
                  style={styles.touch}>
                  <Text
                    style={[
                      textStyles.normal,
                      styles.text,
                      select?.[0]?.label
                        ? {}
                        : {
                            color: COLOR._8C8C8C,
                          },
                    ]}
                    numberOfLines={
                      select !== undefined && select.length > 1
                        ? select?.length
                        : 1
                    }>
                    {!stringIsEmpty(selectText)
                      ? selectText
                      : editable !== false && disabled !== true
                      ? STRING.btn.touchMe
                      : ''}
                  </Text>
                  <Image source={IMAGE.ic_d_arrow} style={styles.img} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      {!stringIsEmpty(error) && <Text style={styles.require}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: SIZE[8],
    borderWidth: 1,
    borderColor: COLOR._F3F3F3,
    backgroundColor: 'white',
  },
  caption: {
    paddingVertical: SIZE[8],
  },
  select: {
    width: '100%',
    paddingVertical: viewStyles.paddingVerticalItem,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'baseline',
  },
  text: {
    flex: 1,
    marginHorizontal: viewStyles.paddingHorizontalItem,
  },
  img: {
    width: viewStyles.iconSize / 2,
    height: viewStyles.iconSize / 2,
    paddingVertical: SIZE[10],
    marginRight: SIZE[16],
  },
  require: {
    color: COLOR.red,
  },
  error: {
    color: COLOR.red,
    marginTop: SIZE[4],
    marginBottom: SIZE[8],
  },
  disabled: {
    backgroundColor: 'rgba(219, 217, 215, 0.5)',
  },
});
