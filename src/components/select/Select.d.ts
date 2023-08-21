/// <reference types="react" />
import { ViewStyle } from 'react-native';
import { BottomSheetProps } from '../type';
export interface SelectItemProps {
    id: number | string;
    label: string;
    data?: any;
    onPress?: Function | undefined;
}
export interface SelectItemViewProps {
    data: Array<SelectItemProps>;
    size: number;
    onSelectItem: Function;
    selectedItem: Array<SelectItemProps>;
}
export interface SelectProps extends Omit<BottomSheetProps, 'duration'> {
    duration?: number;
    label?: string;
    size: number;
    value?: Array<SelectItemProps>;
    items: Array<SelectItemProps>;
    containerStyle?: ViewStyle;
    searchBox?: boolean;
    onSelectItem?: (value?: Array<SelectItemProps> | SelectItemProps) => void;
    multiple?: Boolean;
    selectView?: Function;
    onChangeTextSearchBox?: Function;
    onFocus?: Function;
    error?: string;
    disable?: boolean;
    isRequiredConfirm?: boolean;
    onConfirm?: (item: Array<SelectItemProps>) => void;
}
export declare const Select: {
    (props: SelectProps): JSX.Element;
    defaultProps: {
        label: string;
        size: number;
        focus: boolean;
        duration: number;
        textInputProps: {};
        items: {
            id: number;
            label: string;
        }[];
        containerStyle: {};
        onSelectItem: () => void;
        searchBox: boolean;
        multiple: boolean;
        selectView: null;
    };
};
