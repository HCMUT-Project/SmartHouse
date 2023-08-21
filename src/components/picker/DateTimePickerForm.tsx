import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { BottomSheet } from '../bottomSheet';
import { SIZE } from '../../constants/Size';
import DatePicker from 'react-native-date-picker';
import { convertDateTime } from '../../constants/Function';
import {stringIsEmpty} from '../../constants/Function';
import {textStyles, viewStyles} from '../../styles';
import {COLOR, IMAGE} from '../../constants';

interface DateTimePickerFormProps {
  caption?: string;
  isRequire?: boolean;
  editable?: boolean;
  disabled?: boolean;
  error?: string;
  placeHolder?: string;
  onDateChange?: (value: any) => void;
  pDateString?: string;
  dateValue?: Date;
  minimumDate?: Date;
  maximumDate?: Date;
  dateType?:
    | 'dd-MM-yyyy'
    | 'dd-MM'
    | 'dd-MM-yyyy hh:mm:ss'
    | 'dd-mm-yyyy hh:mm'
    | 'hh:mm:ss'
    | 'hh:mm'
    | 'hh:mm dd-mm-yyyy'
    | 'hh:mm dd/mm/yyyy';
  mode: 'date' | 'time' | 'datetime';
}

export const DateTimePicker = ({
  caption,
  placeHolder,
  isRequire,
  editable,
  disabled,
  error,
  onDateChange,
  dateValue,
  mode,
  dateType,
  minimumDate,
  maximumDate,
  pDateString,
}: DateTimePickerFormProps) => {
  const bottomSheet = useRef<any>();
  const [date, setDate] = useState<Date>(new Date());
  const [dateString, setDateString] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (dateValue) {
      let value = new Date(dateValue);
      let data = convertDateString(value, mode, dateType);
      if (data.dateString !== dateString) {
        setDate(data.date);
        setDateString(
          data === undefined || data === null || data === undefined
            ? ''
            : data.dateString,
        );
      }
    }
    if (dateValue === undefined) {
      setDateString('');
    }
  }, [dateValue, mode, dateType, dateString]);
  useEffect(() => {
    if (pDateString === '') {
      setDateString(pDateString);
    }
  }, [pDateString]);

  const _onSelect = () => {
    bottomSheet?.current.open();
  };
  const _resetData = () => {
    setDateString('');
    setDate(new Date());
    onDateChange &&
      onDateChange({
        dateString: undefined,
        value: undefined,
      });
  };

  return (
    <View style={styles.container}>
      <View>
        {caption && (
          <Text style={[textStyles.normalMedium, styles.caption]}>
            {caption}
            <Text>
              {isRequire && editable !== false && disabled !== true ? '*' : ''}
            </Text>
          </Text>
        )}

        <TouchableOpacity
          onPress={_onSelect}
          style={[
            styles.content,
            disabled ? styles.disabled : {},
            !stringIsEmpty(error) && {borderColor: COLOR.red},
          ]}>
          <View style={styles.select}>
            <Text
              style={[
                textStyles.normal,
                styles.text,
                stringIsEmpty(dateString) && {
                  color: COLOR._8C8C8C,
                },
              ]}>
              {!stringIsEmpty(dateString)
                ? dateString
                : editable !== false && disabled !== true
                ? placeHolder
                  ? placeHolder
                  : 'dd-mm-yyyy'
                : ''}
            </Text>
            <Image source={IMAGE.ic_calendar} style={styles.img} />
          </View>
        </TouchableOpacity>
      </View>
      {!stringIsEmpty(error) && (
        <Text style={[textStyles.note, {color: COLOR.red}]}>{error}</Text>
      )}
      <BottomSheet
        enableScrollToClose={false}
        ref={bottomSheet}
        onPressRightView={() => {
          if (dateString === '') {
            if (date) {
              let value = new Date(date);
              if (
                maximumDate &&
                new Date().setHours(0, 0, 0, 0) >
                  maximumDate.setHours(0, 0, 0, 0)
              ) {
                if (minimumDate) {
                  value = minimumDate;
                }
                if (maximumDate) {
                  value = maximumDate;
                }
              }
              if (
                minimumDate &&
                new Date().setHours(0, 0, 0, 0) <
                  minimumDate.setHours(0, 0, 0, 0)
              ) {
                if (maximumDate) {
                  value = maximumDate;
                }
                if (minimumDate) {
                  value = minimumDate;
                }
              }
              setDate(value);
              let data = convertDateString(value, mode, dateType);
              setDateString(
                data === null || data === undefined ? '' : data.dateString,
              );
              onDateChange &&
                onDateChange({
                  value: data === null || data === undefined ? '' : data.date,
                  dateString:
                    data === null || data === undefined ? '' : data.dateString,
                });
            }
          }
          bottomSheet?.current.close();
        }}
        label={caption}
        onPressLeftView={_resetData}>
        <View style={styles.datePickerContainer}>
          <DatePicker
            androidVariant="iosClone"
            date={date}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            mode={mode}
            timeZoneOffsetInMinutes={420}
            locale={'vi'}
            onDateChange={value => {
              setDate(value);
              let data = convertDateString(value, mode, dateType);
              setDateString(
                data === null || data === undefined ? '' : data.dateString,
              );
              onDateChange &&
                onDateChange({
                  value: data === null || data === undefined ? '' : data.date,
                  dateString:
                    data === null || data === undefined ? '' : data.dateString,
                });
            }}
            textColor={COLOR.title}
            confirmText="Chọn"
            cancelText="Hủy"
            theme="light"
          />
        </View>
      </BottomSheet>
    </View>
  );
};
export const convertDateString = (value: any, mode: string, dateType: any) => {
  let convertWithTZ = new Date(value);
  let _dateString = '';
  if (!dateType) {
    if (mode === 'date') {
      _dateString = convertDateTime(convertWithTZ, 'dd-MM-yyyy', true);
    }
    if (mode === 'datetime') {
      _dateString = convertDateTime(convertWithTZ, 'dd-mm-yyyy hh:mm', true);
    }
    if (mode === 'time') {
      _dateString = convertDateTime(convertWithTZ, 'hh:mm:ss', true);
    }
  } else {
    _dateString = convertDateTime(convertWithTZ, dateType, true);
  }
  return {
    date: convertWithTZ,
    dateString: _dateString,
  };
};
DateTimePicker.defaultProps = {
  label: 'Ngày',
  size: 16,
  focus: false,
  textInputProps: {},
  onSetError: () => {},
  containerStyle: {},
  onSelectItem: () => {},
  mode: 'date',
  canGoBack: false,
  date: new Date(),
  dateString: '',
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: viewStyles.paddingHorizontalItem,
    paddingVertical: viewStyles.paddingVerticalItem,
    borderRadius: SIZE[8],
    borderWidth: 1,
    borderColor: COLOR._F3F3F3,
    backgroundColor: COLOR.white,
  },
  caption: {
    paddingVertical: SIZE[8],
  },
  select: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'right',
  },
  img: {
    width: viewStyles.iconSize / 2,
    height: viewStyles.iconSize / 2,
    paddingVertical: SIZE[10],
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
  datePickerContainer: {
    alignItems: 'center',
  },
});
