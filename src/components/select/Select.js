import React, { createRef, useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, } from 'react-native-reanimated';
import { COLOR, SIZE, HEIGHT_SCREEN } from '../../constants';
import { BottomSheet } from '../bottomSheet';
import Skeleton from './Skeleton';
// CONSTANT
const FONT_FAMILY = 'System';
const COLOR_ERROR = COLOR.error;
const COLOR_BORDER = COLOR.bgGrey4;
const COLOR_BORDER_FOCUS = COLOR.title;
const COLOR_TEXT = COLOR.title;
const COLOR_LABEL = COLOR.typoSubtitle;
const COLOR_LABEL_FOCUS = COLOR.typoSecondary;
const COLOR_BG_BACKGROUND = COLOR.white;
const COLOR_SELECTED_ITEM_BACKGROUND = '#EEEEEE';
const COLOR_DISABLE = COLOR.bgDisable;
const ARROW_DOWN_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADbSURBVHgB7ZRtDYMwEIYLCiZhEpiD1Qk4mAOYgklgDjYHnYRJqIRK2F3y/miarp8/uSdpSqB3zxsKVUoQBOHoDLGbxpiJJh5Oa/1WHVCvGZeWen3C5+OfOkdjpfGiBrtql3Ptjl42tmZIFJ95osHzk9Ivql4+Q0zl2lYF6AlRKs8GQLMJIU4lITy5g/ybWj+qDGig0XAmwSMhX2vkRQEiIW4QxeRbjZzJbkEg8bdjI8m9R14dIBYCt5vkTQEQ4ooQPpdaOVP0DYTgRPP/hqVF3g2fE3gbgiAIQjM/kgtsVv6uX/sAAAAASUVORK5CYII=';
export const Select = (props) => {
    const { label, size, duration, items, value, containerStyle, searchBox, onSelectItem, multiple, selectView, error, isRequiredConfirm = false, } = props;
    const bottomSheet = createRef();
    const [isSelected, setIsSelected] = useState(false);
    const [selectedItem, setSelectedItem] = useState(value || []);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [isReload, setIsReload] = useState(false);
    // const [error, setError] = useState(props.error);
    // Animated Handle
    const _animatedLabelTop = useSharedValue(size);
    const _animatedLabelFontSize = useSharedValue(size);
    const _animatedLabelColor = useSharedValue('#BFBFBF');
    const _animatedLabelLineHeight = useSharedValue(size * 1.25);
    const animatedLabelStyles = useAnimatedStyle(() => {
        return {
            fontFamily: FONT_FAMILY,
            left: SIZE[16],
            right: SIZE[16],
            top: _animatedLabelTop.value,
            color: _animatedLabelColor.value,
            fontSize: _animatedLabelFontSize.value,
            lineHeight: _animatedLabelLineHeight.value,
        };
    });
    let borderColor = COLOR_BORDER;
    if (error) {
        borderColor = COLOR_ERROR;
    }
    else {
        if (isSelected) {
            borderColor = COLOR_BORDER_FOCUS;
        }
        else {
            borderColor = COLOR_BORDER;
        }
    }
    useEffect(() => {
        setSelectedItem(value || []);
        if (value && value.length > 0) {
            onAnimated(1);
        }
        else {
            onAnimated(0);
        }
    }, [value]);
    useEffect(() => {
        if (isSelected) {
            onAnimated(1);
        }
        if (!isSelected && selectedItem.length === 0) {
            onAnimated(0);
        }
    }, [isSelected]);
    const onAnimated = (_value) => {
        if (_value === 1) {
            _animatedLabelTop.value = withTiming(size * 0.4, {
                duration: duration,
            });
            _animatedLabelFontSize.value = withTiming(size * 0.75, {
                duration: duration,
            });
            _animatedLabelColor.value = withTiming(COLOR_LABEL_FOCUS, {
                duration: duration,
            });
            _animatedLabelLineHeight.value = withTiming(Platform.OS === 'ios' ? size : size, {
                duration: duration,
            });
        }
        else {
            _animatedLabelTop.value = withTiming(size, {
                duration: duration,
            });
            _animatedLabelFontSize.value = withTiming(size, {
                duration: duration,
            });
            _animatedLabelColor.value = withTiming(COLOR_LABEL, {
                duration: duration,
            });
            _animatedLabelLineHeight.value = withTiming(size * 1.25, {
                duration: duration,
            });
        }
    };
    // End Animated Handle
    const onSelect = () => {
        var _a;
        if (props.disable) {
            return;
        }
        else {
            setIsSelected(true);
            props.onFocus && props.onFocus();
            (_a = bottomSheet.current) === null || _a === void 0 ? void 0 : _a.open();
        }
    };
    const onClose = () => {
        setIsSelected(false);
    };
    const _onSelectItem = (_value) => {
        var _a;
        let tmp = selectedItem;
        if (!multiple) {
            tmp = [_value];
            if (!isRequiredConfirm) {
                (_a = bottomSheet.current) === null || _a === void 0 ? void 0 : _a.close();
            }
        }
        else {
            let checkExist = tmp.findIndex(_ => (_ === null || _ === void 0 ? void 0 : _.id) === (_value === null || _value === void 0 ? void 0 : _value.id));
            if (checkExist !== -1) {
                tmp.splice(checkExist, 1);
            }
            else {
                tmp.push(_value);
            }
        }
        setSelectedItem(tmp);
        setIsReload(!isReload);
        if (!isRequiredConfirm && onSelectItem) {
            if (!multiple) {
                if (tmp.length > 0) {
                    onSelectItem(tmp[0]);
                }
                else {
                    onSelectItem(undefined);
                }
            }
            else {
                onSelectItem(tmp);
            }
        }
    };
    useEffect(() => {
        let _label = '';
        let index = 0;
        if (selectedItem && selectedItem.length !== 0) {
            for (const ele of selectedItem) {
                if (index === 0) {
                    _label = ele === null || ele === void 0 ? void 0 : ele.label;
                }
                else {
                    _label = _label + ', ' + (ele === null || ele === void 0 ? void 0 : ele.label);
                }
                ++index;
            }
        }
        setSelectedLabel(_label);
    }, [selectedItem, isReload]);
    return (<View style={containerStyle}>
        {selectView ? (selectView({ selectedLabel, onSelect })) : (<TouchableOpacity onPress={onSelect} style={[
            styles.container,
            {
                borderColor: borderColor,
                minHeight: size * 3.5,
                backgroundColor: props.disable
                    ? COLOR_DISABLE
                    : COLOR_BG_BACKGROUND,
            },
        ]}>
            <View style={[
                styles.inputContainer,
                {
                    backgroundColor: props.disable
                        ? COLOR_DISABLE
                        : COLOR_BG_BACKGROUND,
                },
            ]}>
                <Animated.Text style={animatedLabelStyles}>{label}</Animated.Text>
                <Text numberOfLines={1} style={[
                    styles.selectedItemText,
                    {
                        lineHeight: size * 1.25,
                        fontSize: size,
                        paddingTop: size * 0.75,
                        color: COLOR_TEXT,
                    },
                ]}>
                    {selectedLabel}
                </Text>
            </View>

            <View style={styles.iconArrowDownContainer}>
                <Image source={{ uri: ARROW_DOWN_ICON }} style={{
                    width: size,
                    height: size,
                }} />
            </View>
        </TouchableOpacity>)}
        {error && error !== '' ? <Text style={styles.error}>{error}</Text> : null}
        <BottomSheet onChangeTextSearchBox={props.onChangeTextSearchBox} isShowHeaderRight={multiple || isRequiredConfirm} onPressRightView={() => {
            var _a;
            props.onConfirm && props.onConfirm(selectedItem);
            (_a = bottomSheet.current) === null || _a === void 0 ? void 0 : _a.close();
        }} {...props} ref={bottomSheet} searchBox={searchBox} onClose={onClose} label={label}>
            {props.loading && (<Skeleton direction="column" numberOfItems={5} style={styles.skeleton} />)}
            {!props.loading && (!items || items.length <= 0) && (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: HEIGHT_SCREEN * 0.3,
                }}>
                    <Text style={{ color: COLOR.typoSubtitle }}>
                        Không tìm thấy thông tin {label}
                    </Text>
                </View>)}
            <View style={{ flex: 1 }}>
                <SelectItem data={items} size={props.size} selectedItem={selectedItem} onSelectItem={(_value) => _onSelectItem(_value)} />
            </View>
        </BottomSheet>
    </View>);
};
const SelectItem = ({ data, size, onSelectItem, selectedItem, }) => {
    const [selectedList, setSelectedList] = useState(selectedItem);
    useEffect(() => {
        setSelectedList(selectedItem);
    }, [selectedItem]);
    const onPress = (ele) => {
        onSelectItem(ele);
    };
    if (data.length > 0) {
        return (<View>
            {data.map((ele, index) => {
                let isSelected = selectedList.find(_ => (_ === null || _ === void 0 ? void 0 : _.id) === (ele === null || ele === void 0 ? void 0 : ele.id));
                return (<TouchableOpacity key={index} style={[
                    styles.itemContainer,
                    isSelected && {
                        backgroundColor: COLOR_SELECTED_ITEM_BACKGROUND,
                    },
                ]} onPress={() => {
                    onPress(ele);
                }}>
                    <Text style={[
                        styles.itemLabel,
                        {
                            fontSize: size,
                            lineHeight: size * 1.5,
                        },
                    ]}>
                        {ele.label}
                    </Text>
                </TouchableOpacity>);
            })}
        </View>);
    }
    else {
        return null;
    }
};
Select.defaultProps = {
    label: 'Input',
    size: SIZE[16],
    focus: false,
    duration: 300,
    textInputProps: {},
    // onSetError: () => {
    //   console.log('setError');
    // },
    items: [
        {
            id: 1,
            label: 'Item 1',
        },
        {
            id: 2,
            label: 'Item 2',
        },
        {
            id: 3,
            label: 'Item 3',
        },
        {
            id: 4,
            label: 'Item 4',
        },
        {
            id: 5,
            label: 'Item 5',
        },
        {
            id: 6,
            label: 'Item 6',
        },
    ],
    containerStyle: {},
    onSelectItem: () => { },
    searchBox: false,
    multiple: false,
    selectView: null,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: SIZE[10],
        backgroundColor: COLOR_BG_BACKGROUND,
        flexDirection: 'row',
    },
    itemContainer: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: COLOR_BORDER,
    },
    selectedItemText: {
        paddingLeft: SIZE[16],
        paddingRight: SIZE[16],
        flex: 1,
        fontFamily: FONT_FAMILY,
    },
    itemLabel: {
        fontFamily: FONT_FAMILY,
        paddingHorizontal: SIZE[16],
        paddingVertical: SIZE[16],
        color: COLOR_TEXT,
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: SIZE[10],
        backgroundColor: COLOR_BG_BACKGROUND,
    },
    searchContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLOR_BORDER,
        alignItems: 'center',
        paddingHorizontal: SIZE[10],
        marginVertical: SIZE[16],
        marginHorizontal: 12,
        borderRadius: SIZE[10],
    },
    searchInput: {
        paddingLeft: SIZE[10],
        paddingVertical: SIZE[12],
        fontFamily: FONT_FAMILY,
        color: COLOR_TEXT,
        flex: 1,
    },
    iconArrowDownContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZE[16],
    },
    error: {
        paddingTop: 4,
        fontSize: SIZE[12],
        color: COLOR_ERROR,
    },
    skeleton: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: COLOR_BORDER,
        height: SIZE[50],
        backgroundColor: COLOR_SELECTED_ITEM_BACKGROUND,
        marginVertical: 1,
    },
});
